export interface jobRegisterModel {
  id: number;
  job_id: number;
  user_id: number;
  userName: string;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: string;
  addressInterview: string;
  statusJobRegister_id: number;
  cv: string;
  mediaType: string;
  reason: string;
  // jobPosition: string;
  jobName: string;
  statusJob: string;

  qtyPerson: number;
  minSalary: number;
  maxSalary: number;
  rankName: string;
  statusJobName: string;
  statusJobRegisterName: string;
}
