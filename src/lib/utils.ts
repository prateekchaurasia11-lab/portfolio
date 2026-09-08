import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateRange(startDate: string, endDate?: string) {
  if (!endDate) return `${startDate} - Present`
  return startDate === endDate ? startDate : `${startDate} - ${endDate}`
}
