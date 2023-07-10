import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) { }


  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts'
    );
  }

  getAccount(idUser: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/' + idUser
    );
  }

  getByEmail(workemail: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/GetByEmail?workemail=' + workemail
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts',
      data
    );
  }

  update(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/Accounts',
      data
    );
  }

  getById(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/' + id
    );
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete(
      AppSettings.HostingAddress + '/Accounts/' + id
    );
  }

  getByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Accounts/GetByIdCompany?idCompany=' + idCompany
    );
  }

  updateSignature(data: any) {
    return this.http.put(
      AppSettings.HostingAddress + '/UpdateSignature',
      data
    );
  }
}
