export interface jobRegisterModel {
  id: number;
  job_id: number;
  user_id: number;
  userName: String;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: String;
  addressInterview: String;
  statusJobRegister_id: Number;
  cv: String;
  mediaType: String;
  reason: String;
  jobPosition: String;
  jobName: String;
  statusJob: String;

  qtyPerson: number;
  minSalary: number;
  maxSalary: number;
  rankName: String;
  statusJobName: String;
}
