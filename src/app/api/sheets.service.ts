import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentPayload, Salary } from 'src/models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http:HttpClient) {

  }

  getSheets(){
    return this.http.get<Salary[]>(`https://script.google.com/macros/s/AKfycbzM8wnz17kIPd3yHHO0fgzuVaueOUKYAINQUktDbBgi69AJ20aKAwtKhID5N4Ej7HtJ8A/exec`);
  }



  putSheets(body: PaymentPayload): Promise<string> {
    const url = 'https://script.google.com/macros/s/AKfycbzM8wnz17kIPd3yHHO0fgzuVaueOUKYAINQUktDbBgi69AJ20aKAwtKhID5N4Ej7HtJ8A/exec';

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
      // Since mode 'no-cors' is used, the response won't be readable.
      // We can't check status or parse the body due to no-cors limitations.
      console.log('Request sent successfully, but no response available.');
      return "okay";  // You will not have any meaningful data to return in no-cors mode.
    })
    .catch(error => {
      console.error('Error in fetch request:', error);
      throw JSON.stringify(error);  // Propagate the error for handling in calling code
    });
  }

}
