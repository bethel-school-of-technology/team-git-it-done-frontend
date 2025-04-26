import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // add HttpHeaders
import { Bill } from '../models/bill';
import { Observable } from 'rxjs';
import { BillLink } from '../models/bill-link';

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

  //Do not add anything because it gets the userID from the token in the backend
  //So this is not really getAllBills, but getAllBillsByUserID
  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseURL}/user`, { headers: this.getAuthHeaders() });
  }

  //Do not send a full bill because some properties can only be calculated by the backend, so we only send the properties that are needed to create a bill, IE name, description and price
  //Also, the backend will get the userID from the token, so we don't need to send it
  createBill(newBill: Bill): Observable<any> {
    const createBillDto = {
      name: newBill.name,
      description: newBill.description,
      price: newBill.price
    };
    return this.http.post(this.baseURL, createBillDto, { headers: this.getAuthHeaders() });
  }
  
  //We only send the billId to get the full bill back, including the links to other users (BillLinks) and the shared prices
  getBillByID(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  //In a bill you can only edit the name, description and price, so we only send those properties to the backend
  //The shared price is calculated by the backend, and BillLinks are removed separately
  editBill(bill: Bill): Observable<any> {
    const updateBillDto = {
      name: bill.name,
      description: bill.description,
      price: bill.price
    };
    return this.http.put(`${this.baseURL}/${bill.billId}`, updateBillDto, { headers: this.getAuthHeaders() });
  }
  
  //This deletes the whole Bill and also deletes all the BillLinks associated with it. So be very careful with this method
  deleteBill(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  //This method is used to add someone to a bill and then the backend will automatically split the bill into equal parts
  createBillLink(billLink: BillLink): Observable<any> {
    return this.http.post(`${this.baseURL}/link`, billLink, { headers: this.getAuthHeaders() });
  }
  
  //This method is used to add the amount someone has paid to the bill, so that, that person's part can be updated
  settleBill(billLinkId: number, amount: number): Observable<any> {
    return this.http.put(`${this.baseURL}/settle/${billLinkId}?amount=${amount}`, {}, { headers: this.getAuthHeaders() });
  }
  
  //This method only removes someone from the bill, but does not delete the bill itself.
  deleteBillLink(billLinkId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/link/${billLinkId}`, { headers: this.getAuthHeaders() });
  }
}
