import { useState, useEffect, useRef, RefObject } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Use for detecting if an element is in the viewport
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

// Use for determining if we're on a mobile device
export function useMobileDetection(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}

// GitHub repository fetching hook
export function useGitHubRepos() {
  return useQuery({
    queryKey: ["/api/github/repos"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Blog posts fetching hook
export function useBlogPosts() {
  return useQuery({
    queryKey: ["/api/blog/posts"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Send contact form data hook
export async function sendContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return apiRequest("POST", "/api/contact", data);
}

// Generate AI content hook
export async function generateAIContent(prompt: string) {
  return apiRequest("POST", "/api/ai/generate", { prompt });
}
