import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function classNameMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyLeadMagnet(title: string) {
  return slugify(title, {
    replacement: "-",
    strict: false,
    lower: true,
    trim: false, // no trim to allow users to type space at the end
  });
}
