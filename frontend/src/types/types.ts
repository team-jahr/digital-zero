export type Location = {
  id: number;
  name: string;
};
export type Area = {
  id: number;
  name: string;
};
export type Inputs = {
  date: string;
  location: Location[];
  area: Area;
  email: boolean;
  emails: { value: string }[];
  description: string;
};

export type Issue = {
  id: number;
  title: string;
  severity: string;
  description: string;
  images: string[];
};

export type AppUser = {
  id: number;
  email: string;
};

export type Inspection = {
  id: number;
  description: string;
  isSubmitted: boolean;
  date: string;
  area: Area;
  location: Location;
  email: string;
<<<<<<< Updated upstream
=======
  user: AppUser;
  issueKeys: InspectionIssueKeys[];
  isSelected?: boolean;
>>>>>>> Stashed changes
};

export type InspectionDisplay = {
  id: number;
  description: string;
  isSubmitted: boolean;
  date: string;
  locationName: string;
  areaName: string;
  userEmail: string;
  submitEmail: string;
  issues: Issue[];
  isSelected: boolean;
};

export type InspectionIssueKeys = {
  inspectionId: number;
  issueId: number;
};

export type IssueDTO = {
  issues: Issue[];
};
