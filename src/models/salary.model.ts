export interface Salary {
  date:        Date;
  from:        string;
  to:          string;
  total_hours: string;
  price:       number;
  week_number: number;
  status?: string | "";
}

export interface Aggregation{

    month: string;
    totalPrice: number;
    totalHours: number;

}
export interface General{
  [x:string]:any
}

export interface Schedule {
  data: Datum[];
}
export interface ProgressSchedule {
  data: ProgressResponseData[];
}

export interface Datum {
  days:       string;
  thehalfHours: string[];
  the2Hour:   string[];
  the1Hour:   string[];
}

export interface ResponseData {
  Days:        string;
  "0.5 hours": string[];
  "2 hour":    string[];
  "1 hour":    string[];
}
export type ProgressResponseData = [Date,number,string]

export enum Hour {
  AIDataSc = "AI_DATA_SC",
  Ethic = "ETHIC",
  GermanA2B2 = "GERMAN A2 - B2",
  Perception = "MCP",
  Cognition = "MCP1",
  Mathematical_Modelling_and_Simulation= "MMS",
  Seminar = "SEMINAR",
}
export enum SubjectAbbr {
  AI_DATA_SC = "AIDataSc",
  ETHIC = "Ethic",
  "GERMAN A2 - B2" = "GermanA2 to B2",
  MCP = "Perception",
  MCP1 = "Cognition",
  MMS = "Mathematical_Modelling_and_Simulation",
  SEMINAR = "Seminar",
}


export type routinetimeSlots= ("thehalfHours" | "the2Hour" | "the1Hour") ;

export interface BodySendRoutine {
  timeTaken:       number;
  subjectSelected: string;
}

