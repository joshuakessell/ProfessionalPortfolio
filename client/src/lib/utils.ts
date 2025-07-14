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
    console.warn(`Element with id '${elementId}' not found`);
    return;
  }

  // Account for fixed header
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerOffset;
  
  // Method 1: Modern smooth scrolling
  try {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  } catch (error) {
    console.warn('ScrollTo with behavior failed:', error);
  }
  
  // Method 2: Element scrollIntoView
  try {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    // Adjust for header after scrollIntoView
    setTimeout(() => {
      window.scrollBy(0, -headerOffset);
    }, 100);
    return;
  } catch (error) {
    console.warn('ScrollIntoView failed:', error);
  }
  
  // Method 3: Fallback - instant scroll
  window.scrollTo(0, offsetPosition);
}
