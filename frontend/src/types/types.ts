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
  area: Area,
  email: boolean,
  emails: { value: string }[],
  description: string
}

export type Issue = {
  id: string,
  title: string,
  severityLevel: string,
  description: string,
  images: string[],
}