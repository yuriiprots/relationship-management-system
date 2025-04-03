import { Timestamp } from "firebase/firestore";

export interface Interaction {
  id?: string;
  userId: string;
  createdAt: Date | Timestamp;
  date: string;
  emotion: string;
  mood: string;
  person: string;
  summary: string;
}
