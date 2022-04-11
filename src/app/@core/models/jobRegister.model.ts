import {Job} from "./job";
import {User} from "./user";
import {statusJobRegisterModel} from "./statusJobRegister.model";

export interface jobRegisterModel {
  id: number;
  job: Job;
  user: User;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: string;
  addressInterview: string;
  statusJobRegister: statusJobRegisterModel
  cv: string;
  mediaType: string;
  reason: string;
  isDelete: number;
}
