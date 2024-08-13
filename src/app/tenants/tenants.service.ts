import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient,private httpClient: HttpClient

  ) { }


  addWaters(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/waters`;

    return this.http.post<any>(addTenantUrl, tenantData);
  }
  addMeter(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/metres/add_metre`;

    return this.http.post<any>(addTenantUrl, tenantData);
  }
  getwater(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/waters`;

    return this.http.get<any>(addTenantUrl);
  }
  getMeters(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/metres/get_all`;

    return this.http.get<any>(addTenantUrl);
  }
  getRoutes(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/routes/all_routes`;

    return this.http.get<any>(addTenantUrl);
  }
  getReads(): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/water/water-bills`;

    return this.http.get<any>(addTenantUrl);
  }
  editMeterReads(waterBillId:any,memberId: any,data: any): Observable<any>{
  
    return this.httpClient.put(`${environment.apiUrl}/api/water/update-readings?memberId=${memberId}&waterBillId=${waterBillId}`,data)
  }
  getMemberDetails(memberNumber: string): Observable<any> {
    const memberUrl = `/api/members/byNumber/${memberNumber}`;
    return this.http.get<any>(memberUrl);
  }
  manualMeter( memberNumber: any, currentReadings: any): Observable<any> {
    const url = `${this.apiUrl}/api/water/calculateByMemberNumber?memberNumber=${memberNumber}&currentReadings=${currentReadings}`;
    return this.httpClient.post(url, null);
  }  
  editMaji(id: any,data: any): Observable<any>{
  
    return this.httpClient.put(`${environment.apiUrl}/api/waters?id=${id}`,data)
  }
  editMeter(id: any,data: any): Observable<any>{
  
    return this.httpClient.put(`${environment.apiUrl}/api/metres?id=${id}`,data)
  }
  public deleteMeter(id: any): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/api/metres?id=${id}`)
  }
 
  // getTenantById(tenantId:any){
  //   const addTenantUrl = `${this.apiUrl}/api/property/tenant?tenantId=`+tenantId;
  //   return this.http.get<any>(addTenantUrl);
  // }

}