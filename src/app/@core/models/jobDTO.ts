export interface JobDTO{
  id: number;
  name: string;
  jobPositionId: number;
  numberExperience: number;
  workingFormId: number;
  addressWork: string;
  academicLevelId: number;
  rankId: number;
  qtyPerson: number;
  startRecruitmentDate: Date;
  dueDate: Date;
  skills: string;
  description: string;
  benefits: string;
  jobRequirement: string;
  salaryMax: number;
  salaryMin: number;
  contactId: number;
  creatorId: number;
  createDate: Date ;
  updateUserId: number;
  updateDate: Date ;
  statusJobId: number;
  views: number;
}
