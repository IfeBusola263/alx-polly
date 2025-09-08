import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for merging Tailwind CSS classes and handling dynamic class names.
 * 
 * This function combines the functionality of clsx (for conditional class merging) 
 * and tailwind-merge (for deduplicating Tailwind classes) to provide a robust
 * class name handling solution.
 * 
 * Why it's needed:
 * - Helps manage complex conditional class combinations in React components
 * - Prevents Tailwind class conflicts and duplications
 * - Provides type-safe class name merging
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-2', 'py-1', 'bg-blue-500')
 * 
 * // With conditionals
 * cn('base-class', isActive && 'active-class', {'error-class': hasError})
 * 
 * // Handles Tailwind conflicts
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * ```
 * 
 * Assumptions:
 * - All inputs are valid ClassValue types (string, object, array, undefined, null)
 * - Tailwind classes follow standard naming conventions
 * 
 * Edge Cases:
 * - Handles falsy values gracefully
 * - Properly merges conflicting Tailwind utilities
 * - Maintains order-specific classes (like ring-offset)
 * 
 * @param inputs - Array of class values to be merged
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
