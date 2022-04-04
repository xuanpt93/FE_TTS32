// import { Role } from "./role";
import { Role } from './Role';


// export interface User{
//   id: number;
//   name: string;
//   email: string;
//   userName: string;

//   password: string;
//   phoneNumber: string;
//   homeTown: string;
//   gender: string;

//   birthDay: string;
//   isActive: string;
//   isDelete: string;
//   role: string;
//  };

export class User {
  id: string;
  name: string;
  email: string;
  userName: string;
  birthDay: Date;
  delete: boolean;
  phoneNumber: string;
  role: Role;
  activate: boolean;
  avatarName: string;
}




