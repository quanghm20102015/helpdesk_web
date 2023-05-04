import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts'
    );
  }
  createUser(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts',
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/Login',
      data
    );
  }
  
  getByEmail(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/GetByEmail?workemail=' + data,
       data
    );
  }

  postLogin(data: any): Observable<any> {
    debugger
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/PostLogin',
      data
    );
  }
  
  postLogout(data: any): Observable<any> {
    debugger
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/PostLogout',
      data
    );
  }

  GetByIdCompany(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/GetByIdCompany?idCompany=' + data,
       data
    );
  }

  
  changeStatus(data: any): Observable<any> {
    debugger
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/ChangeStatus',
      data
    );
  }

  sendMailConfirm(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/SendMailConfirm',
      data
    );
  }
  
  confirmSigup(data: any): Observable<any> {
    debugger
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/ConfirmSigup',
      data
    );
  }
  
  sendMailResetPassword(data: any): Observable<any> {
    debugger
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/SendMailResetPassword',
      data
    );
  }
}
