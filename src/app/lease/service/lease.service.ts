import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  private apiUrl = environment.apiUrl

  private baseUrl = '/api/v1';

  private updateDataSubject = new Subject<void>();

  constructor(private http:HttpClient,private httpClient: HttpClient) { }

  addMember(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/members/add_member`;
   const headers=new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(addTenantUrl, tenantData,{headers});
  }
  addMembe(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/members/add`;
   
    return this.http.post<any>(addTenantUrl, tenantData);
  }
  
  getMembers(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/members/all_members`;

    return this.http.get<any>(addTenantUrl);
  }
  getRoutes(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/routes/all_routes`;

    return this.http.get<any>(addTenantUrl);
  }
  editMember(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/members/${id}`, data);
  }
  public deleteMember(id: any): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/api/members?id=${id}`)
  }
  addRoute(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/routes/add_route`;

    return this.http.post<any>(addTenantUrl, tenantData);
  }
  
}
