import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class EmailInfoService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  create(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes',
      data
    );
  }
  
  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes'
    );
  }
  
  SendMail(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/SendMail',
      data
    );
  }

  getByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdCompany?idCompany='+ idCompany
    );
  }
}
