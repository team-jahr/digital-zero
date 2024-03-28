export type Location = {
  id: string;
  name: string;
  area: Area[];
};
export type Area = {
  id: string;
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

export type AppArea = {
  id: string;
  name: string;
};

export type AppLocation = {
  id: string;
  name: string;
  area: AppArea[];
};
