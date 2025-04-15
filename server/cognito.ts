import { 
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
  AttributeType,
  AdminConfirmSignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { storage } from "./storage";

// Check for required environment variables
if (!process.env.AWS_REGION || !process.env.AWS_USER_POOL_ID || !process.env.AWS_CLIENT_ID) {
  throw new Error("AWS Cognito environment variables not set");
}

// Initialize the Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

const USER_POOL_ID = process.env.AWS_USER_POOL_ID;
const CLIENT_ID = process.env.AWS_CLIENT_ID;

// Initialize default roles if needed
export async function initializeRoles() {
  if (storage.initRoles) {
    await storage.initRoles();
  }
}

// Sign up a new user
export async function signUp(
  username: string,
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  try {
    // First create the user in Cognito
    const userAttributes: AttributeType[] = [
      { Name: "email", Value: email },
      { Name: "email_verified", Value: "true" }
    ];

    if (firstName) {
      userAttributes.push({ Name: "given_name", Value: firstName });
    }

    if (lastName) {
      userAttributes.push({ Name: "family_name", Value: lastName });
    }

    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      UserAttributes: userAttributes,
      TemporaryPassword: password,
      MessageAction: "SUPPRESS" // Don't send welcome email
    });

    const createUserResponse = await cognitoClient.send(createUserCommand);
    const cognitoId = createUserResponse.User?.Username;

    if (!cognitoId) {
      throw new Error("Failed to create user in Cognito");
    }

    // Set the password permanently
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      Password: password,
      Permanent: true
    });

    await cognitoClient.send(setPasswordCommand);

    // Confirm the user
    const confirmSignUpCommand = new AdminConfirmSignUpCommand({
      UserPoolId: USER_POOL_ID,
      Username: username
    });

    await cognitoClient.send(confirmSignUpCommand);

    // Get default user role
    let roleId = 2; // Regular user role
    if (storage.getRoles) {
      const roles = await storage.getRoles();
      const userRole = roles.find(role => role.name === "user");
      if (userRole) {
        roleId = userRole.id;
      }
    }

    // Create the user in the database
    const user = await storage.createUser({
      cognitoId,
      email,
      username,
      firstName: firstName || null,
      lastName: lastName || null,
      roleId,
      socialProviders: []
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error in signUp:", error);
    return { success: false, error: error.message };
  }
}

// Sign in a user
export async function signIn(username: string, password: string) {
  try {
    // Authenticate with Cognito
    const authCommand = new AdminInitiateAuthCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    });

    const authResponse = await cognitoClient.send(authCommand);
    
    if (!authResponse.AuthenticationResult?.IdToken) {
      throw new Error("Authentication failed");
    }

    // Get the user from Cognito
    const getUserCommand = new AdminGetUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username
    });

    const getUserResponse = await cognitoClient.send(getUserCommand);
    const cognitoId = getUserResponse.Username;

    // Find or create the user in the database
    let user = cognitoId ? await storage.getUserByCognitoId?.(cognitoId) : undefined;

    // If user doesn't exist in our DB but exists in Cognito, create a local record
    if (!user && cognitoId) {
      const email = getUserResponse.UserAttributes?.find(attr => attr.Name === "email")?.Value || "";
      const firstName = getUserResponse.UserAttributes?.find(attr => attr.Name === "given_name")?.Value || null;
      const lastName = getUserResponse.UserAttributes?.find(attr => attr.Name === "family_name")?.Value || null;
      
      // Get default user role
      let roleId = 2; // Regular user role
      if (storage.getRoles) {
        const roles = await storage.getRoles();
        const userRole = roles.find(role => role.name === "user");
        if (userRole) {
          roleId = userRole.id;
        }
      }

      user = await storage.createUser({
        cognitoId,
        email,
        username,
        firstName,
        lastName,
        roleId,
        socialProviders: []
      });
    }

    // Update the user's last login time
    if (user && storage.updateUser) {
      user = await storage.updateUser(user.id, { lastLogin: new Date() });
    }

    return {
      success: true,
      user,
      token: authResponse.AuthenticationResult.IdToken,
      refreshToken: authResponse.AuthenticationResult.RefreshToken
    };
  } catch (error) {
    console.error("Error in signIn:", error);
    return { success: false, error: error.message };
  }
}

// Get user profile
export async function getProfile(cognitoId: string) {
  try {
    // Get the user from the database
    if (storage.getUserByCognitoId) {
      const user = await storage.getUserByCognitoId(cognitoId);
      if (!user) {
        throw new Error("User not found");
      }
      
      return { success: true, user };
    } else {
      throw new Error("getUserByCognitoId method not available");
    }
  } catch (error) {
    console.error("Error in getProfile:", error);
    return { success: false, error: error.message };
  }
}

// Update user profile
export async function updateProfile(
  cognitoId: string,
  updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }
) {
  try {
    // Find the user in the database
    if (!storage.getUserByCognitoId || !storage.updateUser) {
      throw new Error("Required storage methods not available");
    }

    const user = await storage.getUserByCognitoId(cognitoId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user attributes in Cognito if email is being changed
    if (updates.email) {
      const attributes: AttributeType[] = [
        { Name: "email", Value: updates.email },
        { Name: "email_verified", Value: "true" }
      ];

      const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: USER_POOL_ID,
        Username: cognitoId,
        UserAttributes: attributes
      });

      await cognitoClient.send(updateAttributesCommand);
    }

    // Also update name attributes if provided
    if (updates.firstName || updates.lastName) {
      const attributes: AttributeType[] = [];
      
      if (updates.firstName) {
        attributes.push({ Name: "given_name", Value: updates.firstName });
      }
      
      if (updates.lastName) {
        attributes.push({ Name: "family_name", Value: updates.lastName });
      }

      if (attributes.length > 0) {
        const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
          UserPoolId: USER_POOL_ID,
          Username: cognitoId,
          UserAttributes: attributes
        });

        await cognitoClient.send(updateAttributesCommand);
      }
    }

    // Update the user in the database
    const updatedUser = await storage.updateUser(user.id, {
      firstName: updates.firstName !== undefined ? updates.firstName : user.firstName,
      lastName: updates.lastName !== undefined ? updates.lastName : user.lastName,
      email: updates.email || user.email,
      updatedAt: new Date()
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return { success: false, error: error.message };
  }
}