import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = environment.apiUrl;
  selectedTenant: any;
  private baseUrl = environment.apiUrl;
  private fileToBase64(file: File): Observable<string> {
    const reader = new FileReader();
    const fileReaderObservable = new Observable<string>((observer) => {
      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
    });

    reader.readAsDataURL(file);
    return fileReaderObservable.pipe(map(result => result.split(',')[1])); // Remove the base64 header
  }
  constructor(private http: HttpClient,
    private httpClient: HttpClient
  ) { }

  getAllInvoices() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/invoices`, httpOptions);
  }
  getInvoiceById(invoiceId: number): Observable<any> {
    const url = `${this.apiUrl}/${invoiceId}`;
    return this.http.get<any>(url);
  }
  fetchInvoicesForTenant(tenantId: string): Observable<any> {
    return this.http.get<any>(`/api/tenants/${tenantId}`);
  }
 

  sendInvoiceViaSMS(invoiceNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/send/sms?invoiceNumber=${invoiceNumber}`);
  }
  sendInvoiceViaEmail(invoiceNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/send/email?invoiceNumber=${invoiceNumber}`);
  }
  uploadFile(file: File): Observable<any> {
    const url = `${this.apiUrl}/bulk-payments/upload`;
    const formData: FormData = new FormData()
    formData.append("file",file)
    
        return this.http.post<any>(url, formData);  
  }
  uploadwaterFile(file: File): Observable<any> {
    const url = `${this.apiUrl}/bulk-payments/upload`;
    const formData: FormData = new FormData()
    formData.append("file",file)
    
        return this.http.post<any>(url, formData);  
  }
  submitBillingData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/water`, data, httpOptions);
  }
  getAllRents() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/invoices`, httpOptions);
  }

 

  getAllRevenues(month: number) {
    return this.http.get(`${this.apiUrl}/api/property/revenue/revenues/${month}`, httpOptions);
  }


  onSubmit(expensesData: any): Observable<any> {

    const url = `${this.apiUrl}/api/v1/expenses/add`;
    return this.http.post<any>(url, expensesData);
  }

  getExpenses() {
    return this.http.get(`${this.apiUrl}/api/expenses/all_expenses`, httpOptions);

  }



  getTotalExpenses(month: number){
    return this.http.get(`${this.apiUrl}/api/property/revenue/expenses/${month}`, httpOptions);
  }
  
  deleteExpense(expenseName:string){}

  submitPayment(amountPaid: any,invoice: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/request-payment/${invoice}`
    return this.http.put<any>(url, amountPaid);
  }
  verifyPayment(invoiceNumber: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/approve-payment/${invoiceNumber}`
    return this.http.put<any>(url, invoiceNumber);
  }
 

  addExpense(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/expenses/add_expense`;

    return this.http.post<any>(addTenantUrl, tenantData);
  }
  downloadInvoice(memberNo: string): Observable<any> {
    const generateInvoiceUrl = `${this.apiUrl}/api/water/generateInvoice?memberNo=${memberNo}`;
    return this.http.get<any>(generateInvoiceUrl);
  }
  memberStatement(fromDate: string, memberNo: string, toDate: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.baseUrl}/api/expenses/generateMemberReport?memberNo=${memberNo}&fromDate=${fromDate}&toDate=${toDate}`;
    
   
    return this.http.post(url, null, { headers, responseType: 'blob' });
  }
  paymentStatement(fromDate: string, toDate: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    const url = `${this.baseUrl}/api/expenses/generatePaymentReport?fromDate=${fromDate}&toDate=${toDate}`;
    
   
    return this.http.post(url, null, { headers, responseType: 'blob' });
  }
  meterReportReading(fromDate: string, toDate: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    const url = `${this.baseUrl}/api/expenses/generateMeterReadingsReport?fromDate=${fromDate}&toDate=${toDate}`;
    
   
    return this.http.post(url, null, { headers, responseType: 'blob' });
  }
  unpaidStatement(fromDate: string, toDate: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    const url = `${this.baseUrl}/api/expenses/generateUnpaidInvoicesReport?fromDate=${fromDate}&toDate=${toDate}`;
    
   
    return this.http.post(url, null, { headers, responseType: 'blob' });
  }
  revenuesStatement(fromMonthYear: string, toMonthYear: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    const url = `${this.baseUrl}/api/expenses/generateRevenueReport?fromMonthYear=${fromMonthYear}&toMonthYear=${toMonthYear}`;
    
   
    return this.http.post(url, null, { headers, responseType: 'blob' });
  }
  editExpense(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/expenses?id=${tenantData}`;

    return this.http.put<any>(addTenantUrl, tenantData);
  
  }

  getInvoices(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/water/all-invoices`;

    return this.http.get<any>(addTenantUrl);
  }
  submitSTK(data: any): Observable<any> {
    const submitPaymentUrl = `${this.apiUrl}/mobile-money/stk-transaction-request`;
    return this.http.post<any>(submitPaymentUrl, data);
  }
  getIncomes(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/bulk-payments/all_payments`;

    return this.http.get<any>(addTenantUrl);
  }
  getRevenue(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/bulk-payments/all-revenuesPerMonth`;

    return this.http.get<any>(addTenantUrl);
  }

}










