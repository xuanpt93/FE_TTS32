import { Role } from './Role';


export interface User{
  id: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  homeTown: string;
  gender: string;
  birthday: Date;
  isDelete: number;
  role: Role;
  active: number;
  avatarName: string;
}



