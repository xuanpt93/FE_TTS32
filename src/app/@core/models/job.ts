import { AcademicLevel } from './AcademicLevel';
import { JobPosition } from './jobPosition';
import { Rank } from './Rank';
import { WorkingForm } from './WorkingForm';
import { StatusJob } from './StatusJob';
import { User } from './User';

export interface Job {
  id: number ;
  name: string;
  jobPosition: JobPosition ;
  numberExperience: number ;
  workingForm: WorkingForm ;
  addressWork: string ;
  academicLevel: AcademicLevel ;
  rank: Rank;
  qtyPerson: number;
  createDate: Date;
  updateDate: Date;
  dueDate: Date;
  skills: string ;
  startRecruitmentDate: Date;
  description: string ;
  interrest: string ;
  salaryMax: number;
  salaryMin: number;
  jobRequirement: string;
  contact: User;
  statusJob: StatusJob;
  views: number;
  creater: User;
  updateUser: User;
  isDelete: number;
  reason: string;

}
