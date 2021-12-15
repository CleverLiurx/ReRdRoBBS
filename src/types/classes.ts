import { UserMini } from "./topic";

export interface Classes {
  _id: string;
  classname: string;
  topicCount: number;
  master: UserMini;
  canAnon: boolean;
  description: string;
  icon: string;
}
