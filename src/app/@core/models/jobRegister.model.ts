export interface jobRegisterModel {
  id: number;
  job_id: number;
  user_id: number;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: String;
  addressInterview: String;
  statusJobRegister_id: Number;
  cv: String;
  mediaType: String;
  reason: String;
}
