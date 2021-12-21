import { ClassMini } from "./classes";
import { UserMini } from "./user";

interface Img {
  _id: string;
  name: string;
  url: string;
}

export interface Reply {
  _id: string;
  createBy: UserMini;
  content: string;
  hadParise: boolean;
  hasChild: boolean;
  reply: Reply[];
}

export interface Topic {
  _id: string;
  createBy: UserMini;
  classFrom: ClassMini;
  title: string;
  content: string;
  richContent: string;
  topicImage: Img[];

  hitsCount: number;
  praiseCount: number;
  starCount: number;
  replyCount: number;

  reply: Reply[];

  hadStar: boolean;
  hadParise: boolean;

  status: boolean;
  createTime: string;
}
