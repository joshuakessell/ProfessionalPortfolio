import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "default_key" 
});

// Function to generate content based on prompt
export async function generateContent(prompt: string): Promise<string> {
  try {
    // Validate that OpenAI API key exists
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "default_key") {
      throw new Error("OpenAI API key is required to generate content");
    }
    
    // Add context to prompt for web development focused responses
    const enhancedPrompt = `You are an expert web developer assistant. The user is asking for content related to web development. Please provide a professional, detailed response to this prompt: ${prompt}`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using the latest model
      messages: [{ role: "user", content: enhancedPrompt }],
      max_tokens: 800,
      temperature: 0.7,
    });
    
    // Return generated content
    return response.choices[0].message.content || "No content could be generated.";
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
}

// Function to enhance project descriptions
export async function enhanceProjectDescription(
  title: string, 
  description: string, 
  techStack: string[]
): Promise<string> {
  try {
    // Validate that OpenAI API key exists
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "default_key") {
      return description; // Return original description if no API key
    }
    
    const prompt = `Enhance the following project description to sound more professional and engaging. 
    Project Title: ${title}
    Original Description: ${description}
    Technologies Used: ${techStack.join(", ")}
    
    Please provide an enhanced description in 2-3 sentences that highlights the key features and technologies while maintaining factual accuracy.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using the latest model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });
    
    // Return enhanced description or fallback to original
    return response.choices[0].message.content || description;
  } catch (error) {
    console.error("Error enhancing project description:", error);
    return description; // Return original description on error
  }
}

// Function to suggest blog topics
export async function suggestBlogTopics(category: string, count: number = 5): Promise<string[]> {
  try {
    // Validate that OpenAI API key exists
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "default_key") {
      throw new Error("OpenAI API key is required to suggest blog topics");
    }
    
    const prompt = `Suggest ${count} engaging and relevant blog post topics related to ${category} that would be valuable for web developers and tech professionals. Format the response as a JSON array of strings.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using the latest model
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 500,
      temperature: 0.8,
    });
    
    // Parse JSON response
    try {
      const content = response.choices[0].message.content || "{}";
      const parsed = JSON.parse(content);
      return Array.isArray(parsed.topics) ? parsed.topics : [];
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error suggesting blog topics:", error);
    return [];
  }
}
