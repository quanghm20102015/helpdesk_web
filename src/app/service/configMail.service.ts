import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class ConfigMailService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  reqHeaders = new HttpHeaders().set('Content-Type','application/json');

  create(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/ConfigMails',
      data
    );
  }
  
  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/ConfigMails'
    );
  }
  
  GetByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/ConfigMails/GetByIdCompany?idCompany='+ idCompany
    );
  }

  getMenuByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/ConfigMails/GetMenuByIdCompany?idCompany='+ idCompany
    );
  }
     
  putEmailInfo(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/ConfigMails/PutEmailInfo',
      data
    );
  }
    
  deleteById(id: any): Observable<any> {
    return this.http.delete(
      AppSettings.HostingAddress + '/ConfigMails/' + id
    );
  }

  getMenuCount(request: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/GetMenuCount',JSON.stringify(request),{headers:this.reqHeaders}
      );
  }
    
}
