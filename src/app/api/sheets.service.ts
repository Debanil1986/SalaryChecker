import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Schedule,Datum, ResponseData, BodySendRoutine, ProgressResponseData, ProgressSchedule } from 'src/models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  url:string="";

  constructor(private http:HttpClient) {
    this.url ="https://script.google.com/macros/s/AKfycbwk9Y9QYTFe-kp-cBQDD3p0X6Wex2xykucdFyJNtZabp71Q3y97Ns0JV1m_iGRjkJIK"

  }

  getRoutine(){
    return this.http.get<Schedule>(`${this.url}/exec`).pipe(
      map((response:any) => ({
        data: response.data.map((day:ResponseData) => ({
          days: (day['Days'] as unknown as any),
          thehalfHours: day['0.5 hours'] || [],   // Convert "0.5 hours" to "halfHour"
          the2Hour: day['2 hour'] || [],      // Convert "2 hour" to "twoHour"
          the1Hour: day['1 hour'] || [],      // Convert "1 hour" to "oneHour"
        }))
      }))
    );
  }


  getProgress(){
    return this.http.get<ProgressSchedule>(`${this.url}/exec?sheet=sheet2`).pipe(
      map((response:any) => ({
        data: response.data.map((progress:ProgressResponseData) => [new Date(progress[0]),progress[1],progress[2]])
      }))
    );
  }



  addRoutine(body: BodySendRoutine): Promise<string> {
    const url = `${this.url}/exec`;

    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      method: 'POST',
      mode: 'no-cors', // This bypasses CORS, but you'll not be able to read the response
      headers: headers,
      body: JSON.stringify(body),
    })
    .then(response => {
      console.log('Request sent successfully, but no response available.');
      return "okay data added";  // You will not have any meaningful data to return in no-cors mode.
    })
    .catch(error => {
      console.error('Error in fetch request:', error);
      throw JSON.stringify(error);  // Propagate the error for handling in calling code
    });
  }

}
