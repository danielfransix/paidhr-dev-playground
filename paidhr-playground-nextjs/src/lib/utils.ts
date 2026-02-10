import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const triggerCellAction = (event: React.MouseEvent<HTMLElement>, selector: string) => {
  const target = event.target as HTMLElement;
  if (target.closest(selector) || target.closest('label')) {
    return;
  }
  const action = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(selector);
  action?.click();
};
