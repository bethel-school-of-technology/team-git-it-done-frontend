import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // add HttpHeaders
import { Bill } from '../models/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  baseURL: string = "http://localhost:5072/api/Bill";
  tokenKey: string = "myBillToken";

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseURL, { headers: this.getAuthHeaders() });
  }

  createBill(newBill: Bill): Observable<any> {
    return this.http.post(this.baseURL, newBill, { headers: this.getAuthHeaders() });
  }

  getBillByID(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  editBill(bill: Bill): Observable<any> {
    return this.http.put(`${this.baseURL}/${bill.billId}`, bill, { headers: this.getAuthHeaders() });
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }
}
