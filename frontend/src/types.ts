export type Hello = {
  id: number;
  msg: string;
};

export type Location = {
  id: string;
  name: string,
  area: Area[]
}
export type Area = {
  id: string;
  name: string,
}
export type Inputs = {
  date: string,
  location: Location[],
  area: Area
}