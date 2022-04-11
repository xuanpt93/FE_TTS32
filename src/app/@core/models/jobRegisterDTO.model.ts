export class jobRegisterDTOModel{
  job_id: number;
  user_id: number;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: string;
  addressInterview: string;
  statusJobRegister_id: Number
  cv: string;
  mediaType: string;
  reason: string;
  isDelete: number;
}
