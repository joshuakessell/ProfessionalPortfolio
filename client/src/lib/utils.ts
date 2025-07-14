import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}

export function smoothScrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // Account for fixed header
  const headerOffset = 80;
  
  // Use element.scrollIntoView with offset for header
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  
  // Try multiple methods to ensure scrolling works
  try {
    // Method 1: Native scrollTo with smooth behavior
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
    
    // Fallback: If the above doesn't work, try scrollIntoView
    setTimeout(() => {
      const currentScroll = window.pageYOffset;
      const targetScroll = elementTop;
      
      // Check if we're close to the target (within 50px)
      if (Math.abs(currentScroll - targetScroll) > 50) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Adjust for header after scrollIntoView
        setTimeout(() => {
          window.scrollBy({
            top: -headerOffset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 100);
  } catch (error) {
    console.error('Scroll error:', error);
    // Final fallback: instant scroll
    window.scrollTo(0, elementTop);
  }
}
