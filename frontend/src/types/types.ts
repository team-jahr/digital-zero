export type Location = {
  id: number;
  name: string;
};
export type Area = {
  id: number;
  name: string;
};
export type InspectionFormInputs = {
  date: string;
  location: Location;
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

export type Inspection = {
  id: number;
  title: string;
  description: string;
  isSubmitted: boolean;
  date: string;
  area: Area;
  location: Location;
  inspectionIssueKeys: InspectionIssueKeys[];
  reportedTo: string[];
  user: User;
};

export type User = {
  id: number;
  email: string;
};

export type InspectionDisplay = {
  id: number;
  userEmail: string;
  date: string;
  isSubmitted: boolean;
  description: string;
  location: Location;
  area: Area;
  reportedToEmails: string[] | null;
  issues: number;
};

export type InspectionIssueKeys = {
  inspectionId: number;
  issueId: number;
};

export type IssueDTO = {
  issues: Issue[];
};

export type InspectionDTO = {
  inspectionDTOs: Inspection[];
};

export type IssueFormInputs = {
  title: string;
  severity: string;
  description: string;
};

export type FilterInspectionsFormInputs = {
  location: number;
  date: string;
  submitted: string;
};
