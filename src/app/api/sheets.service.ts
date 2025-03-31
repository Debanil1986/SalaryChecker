import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Schedule,Datum, ResponseData } from 'src/models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http:HttpClient) {

  }

  getRoutine(){
    return this.http.get<Schedule>(`https://script.google.com/macros/s/AKfycbwk9Y9QYTFe-kp-cBQDD3p0X6Wex2xykucdFyJNtZabp71Q3y97Ns0JV1m_iGRjkJIK/exec`).pipe(
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



  // putSheets(body: PaymentPayload): Promise<string> {
  //   const url = '';

  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };

  //   return fetch(url, {
  //     method: 'POST',
  //     mode: 'no-cors', // This bypasses CORS, but you'll not be able to read the response
  //     headers: headers,
  //     body: JSON.stringify(body),
  //   })
  //   .then(response => {
  //     // Since mode 'no-cors' is used, the response won't be readable.
  //     // We can't check status or parse the body due to no-cors limitations.
  //     console.log('Request sent successfully, but no response available.');
  //     return "okay";  // You will not have any meaningful data to return in no-cors mode.
  //   })
  //   .catch(error => {
  //     console.error('Error in fetch request:', error);
  //     throw JSON.stringify(error);  // Propagate the error for handling in calling code
  //   });
  // }

}
