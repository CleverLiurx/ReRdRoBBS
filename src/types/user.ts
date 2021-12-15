export interface UserRecord {
  topicCount: number;
  commentCount: number;
  beCommentCount: number;
  praiseCount: number;
  bePraiseCount: number;
  starCount: number;
  beStarCount: number;
  pointCount: number;
}

export interface User {
  _id: string;
  phone: string;
  username: string;
  email: string;
  birthday: string;
  sex: number;
  avator?: string;
  record: UserRecord;
  studentId?: string;
  isSectioner: number;
  status: boolean;
  delFlag: boolean;
}

export interface UserMini {
  _id: string;
  username: string;
  sex: number;
  avator: string;
  email: string;
  record: UserRecord;
}
