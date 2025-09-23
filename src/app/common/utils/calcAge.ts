// utils/calcAge.ts
import { differenceInYears } from "date-fns";

export function calcAge(birthDateString: string): number {
  const birthDate = new Date(birthDateString);
  return differenceInYears(new Date(), birthDate);
}
