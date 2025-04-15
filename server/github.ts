import { GitHubRepo } from "@/lib/types";

// Function to fetch public repositories from GitHub API
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    // GitHub username
    const username = "joshuakessell";
    
    // GitHub API endpoint for user repositories
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    
    // Set Authorization header if GitHub token is available in environment
    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    // Fetch repositories
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
    }
    
    // Parse response
    const repos: GitHubRepo[] = await response.json();
    
    // Filter and transform repos
    return repos
      .filter(repo => !repo.fork && !repo.private) // Only include non-forks and public repos
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "",
        html_url: repo.html_url,
        homepage: repo.homepage || "",
        stargazers_count: repo.stargazers_count,
        language: repo.language || "Unknown",
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at
      }))
      .slice(0, 6); // Limit to 6 most recently updated repos
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
}
