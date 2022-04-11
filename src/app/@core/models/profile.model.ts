import {User} from "./user";
import {AcademicLevel} from "./academicLevel";

export class ProfileModel{
  id: number;
  user: User;
  Skill: string;
  numberYearsExperience: number;
  academicLevel: AcademicLevel;
  desiredWorkingForm: string;
  desiredSalary: string;
  desiredWorkingAddress: string;
}
