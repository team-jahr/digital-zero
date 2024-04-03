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
  isSelected?: boolean;
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
  locationName: string;
  areaName: string;
  reportedToEmails: string[] | null;
  issues: Issue[];
  isSelected?: boolean;
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
