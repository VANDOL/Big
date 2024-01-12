// 사용자 변수 지정
export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
}
// 회원가입 변수 지정
export interface Icreate {
  username: string;
  email: string;
  password: number;
  password_check: number;
}