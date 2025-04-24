import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BillService {


baseURL: string = "http://localhost:5072/api/Bill";

tokenKey: string = "myBillToken";

constructor(private http: HttpClient) { }


// getAllBills(id: number): Observable<Bill[]> {
//   return this.http.get<Bill[]>(this.baseURL+ "/" + id);
// } 

getAllBills(): Observable<Bill[]> {
  return this.http.get<Bill[]>(this.baseURL);
}


createBill(newBill: Bill) {
  let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  }
  return this.http.post(this.baseURL, newBill, { headers: reqHeaders });
}




getBillByID(id: number): Observable<Bill> {
return this.http.get<Bill>(this.baseURL + "/" + id);
}


editBill(bill: any, updateBill: Bill): Observable<any> {
  return this.http.put(`/api/bill/${bill.id}`, bill, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}


deleteBill(id: number): Observable<any> {
  return this.http.delete(`/api/bill/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}
}