interface Img {
  _id: string;
  name: string;
  url: string;
}

interface UserMini {
  _id: string;
  username: string;
  sex: number;
  avator: string;
}
interface ClassMini {
  _id: string;
  classname: string;
}
export interface Reply {
  _id: string;
  createBy: UserMini;
  content: string;
  hadParise: boolean;
  reply: Reply[];
}

export interface Topic {
  _id: string;
  createBy: UserMini;
  title: string;
  content: string;
  topicImage: Img[];
  hitsCount: number;
  praiseCount: number;
  starCount: number;
  replyCount: number;
  hadStar: boolean;
  hadParise: boolean;
  status: boolean;
  classFrom: ClassMini;
  createTime: string;
}
