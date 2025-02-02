import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { Log } from "src/app/admin/users/models/log";

const PASSWORD_RESET_API = `${environment.apiUrl}/api/v1/reset/`;
const USERS_API = `${environment.apiUrl}/api/v1/users/`;
const AUTH_API = `${environment.apiUrl}/api/v1/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user): Observable<any> {
    const authUrl = `${environment.apiUrl}/api/v1/auth/signin`
    return this.http.post<any>(authUrl, user);
  }

  resetPasswordRequest(email: any): Observable<any> {
    return this.http.post(PASSWORD_RESET_API + `send-token?emailaddress=${email}`, httpOptions);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(PASSWORD_RESET_API + 'change-password', data, httpOptions);
  }

  updateUserRole(role: any,username:any): Observable<any> {
    const API = `${environment.apiUrl}/api/v1/users/updaterole`
    return this.http.put(API + '?role='+role+'&username='+username, httpOptions);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(USERS_API + 'signup', data, httpOptions);
  }

  allUsers(): Observable<any> {
    return this.http.get(USERS_API + 'view', httpOptions);
  }

  allActiveUsers(): Observable<any> {
    return this.http.get(USERS_API + 'active', httpOptions);
  }

  allDeletedUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'deletedaccounts', httpOptions);
  }

  allLockedUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'lockedaccounts', httpOptions);
  }

  allInactiveUserAccounts(): Observable<any> {
    return this.http.get(USERS_API + 'inactiveaccounts', httpOptions);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get(AUTH_API + `account/${username}`, httpOptions);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(USERS_API + `find/${id}`, httpOptions);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(USERS_API + 'update', data, httpOptions);
  }

  delete(data: any): Observable<any> {
    return this.http.put(USERS_API + `deleteaccount?username=${data}`, data, httpOptions);
  }

  restoreAccount(data: any): Observable<any> {
    return this.http.put(USERS_API + `restoreaccount?username=${data}`, data, httpOptions);
  }

  public getWidgetsdata():Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/analytics/dashboard`);
  }
 
  public getRevenueFromPropertiesData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/analytics/revenue-from-members`,httpOptions);
  }
  public getWaterUsage(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/analytics/water-usage`,httpOptions);
  }
  public getRevenuePieChartData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/analytics/member-route-summary`,httpOptions);
  }
  public getRevenue(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/analytics/member-route-summary`,httpOptions);
  }

  public getvacantunitsdata(){
    return this.http.get(`${environment.apiUrl}/api/analytics/dashboard`);
    
  }

  lock(data: any): Observable<any> {
    return this.http.put(USERS_API + `lockaccount?username=${data}`, data, httpOptions);
  }

  unlock(data: any): Observable<any> {
    return this.http.put(USERS_API + `unlockaccount?username=${data}`, httpOptions);
  }

  signout(id: any) {
    sessionStorage.clear();
    return this.http.put(AUTH_API + `logout/${id}`, httpOptions);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  bulkUploadUsers(data: any): Observable<any> {
    return this.http.post(USERS_API + 'upload/bulk/users', data, httpOptions);
  }

  bulkUsers(): Observable<any> {
    return this.http.get(USERS_API + 'uploaded/users', httpOptions);
  }

  initiateBulkRegistration(): Observable<any> {
    return this.http.post(USERS_API + 'registration/initiate', httpOptions);
  }

  public deleteUser(username): Observable<{ message: string }> {
    const deleteUrl = `${environment.apiUrl}/api/v1/users/deleteaccount`;
    return this.http.put<{ message: string }>(deleteUrl, username);
  }

  public restoreDeletedAccount(username): Observable<{ message: string }> {
    const restoreDeletedaccountUrl = `${environment.apiUrl}/api/v1/users/restoreaccount`;
    return this.http.put<{ message: string }>(
      restoreDeletedaccountUrl,
      username
    );
  }


  public updateDepartment(userDetails): Observable<{ message: string }> {
    const updateDepartmentsUrl = `${environment.apiUrl}/p2p/users/updatedepartment`;
    return this.http.put<{ message: string }>(
      updateDepartmentsUrl,
      userDetails
    );
  }

  

  public updateUserPassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/api/v1/users/updatepassword`;
    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public updateFirstTimePassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/ebm/auth/resetpassword`;
    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public getAccountLogs(username): Observable<Log[]> {
    const accountLogsUrl = `${environment.apiUrl}/p2p/audit/alllogs/${username}`;
    return this.http.get<Log[]>(accountLogsUrl);
  }

  public getDailyAccountLogs(uname, stime): Observable<Log[]> {
    const dailyAccountLogsUrl = `${environment.apiUrl}/p2p/audit/todaylogs`;
    return this.http.get<Log[]>(dailyAccountLogsUrl, {
      params: { uname, stime },
    });
  }

  public updateUserDepartment(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.apiUrl}/api/v1/users/updatedepartment`;
    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

 public logout(): Observable<any> {

      return this.http.post(AUTH_API + 'logout', httpOptions);
    
  }
}
