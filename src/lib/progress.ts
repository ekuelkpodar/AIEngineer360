import { ProgressStatus } from "@prisma/client";

export function nextStatus(current: ProgressStatus): ProgressStatus {
  switch (current) {
    case "not_started":
      return "in_progress";
    case "in_progress":
      return "mastered";
    case "mastered":
    default:
      return "mastered";
  }
}
