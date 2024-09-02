import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salary } from 'src/models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http:HttpClient) {

  }

  getSheets(){
    return this.http.get<Salary[]>(`https://script.google.com/macros/s/AKfycbzibu3ADJ5hZ0mN3lscyJg24_xDf8k_YEPYcabhKbzuoHRXujA8nbeOX1HWDKsDwNy-rw/exec`);
  }
}
