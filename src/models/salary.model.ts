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


export interface PaymentPayload {
  row:    number;
  status: string;
}

export type Refresh = "refresh" | "leave";
