// export class SearchJob{
//   name: string;
//   salaryMax: number;
//   salaryMin: number;
//   statusId: number;
// }


export interface SearchJob{
  name: string;
  salaryMax: number;
  salaryMin: number;
  statusId: number;
}

export class JobSearch implements SearchJob{
  name: string;
  salaryMax: number;
  salaryMin: number;
  statusId: number;
}
