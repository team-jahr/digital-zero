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
  issueKeys: InspectionIssueKeys[];
  email: string;
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

export type IssueFormInputs = {
  title: string;
  severity: string;
  description: string;
};
