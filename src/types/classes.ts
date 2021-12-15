import { UserMini } from "./user";

export interface ClassMini {
  _id: string;
  classname: string;
}

export interface Classes {
  _id: string;
  classname: string;
  topicCount: number;
  master: UserMini;
  canAnon: boolean;
  description: string;
  icon: string;
}
