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
  getByStatus(requets: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/getByStatus?idCompany='+ requets.idCompany + '&status='+ requets.status,
      requets
    );
  }

  
  UpdateStatus(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/EmailInfoes/UpdateStatus',
      data
    );
  }
  getByIdLabel(requets: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdLabel?idCompany='+ requets.idCompany + '&idLable='+ requets.idLabel + '&status='+ requets.status,
      requets
    );
  }
  
  getByIdConfigEmail(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdConfigEmail?idConfigEmail=' + id,
    );
  }
  getByAgent(requets: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByAgent?idCompany='+ requets.idCompany + '&assign='+ requets.assign + '&status='+ requets.status,
      requets
    );
  }
  
  getCountByCompanyAgent(requets: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetCountByCompanyAgent?idCompany='+ requets.idCompany 
        + '&assign='+ requets.assign + '&idConfigEmail='+ requets.idConfigEmail + '&status='+ requets.status + '&idLabel='+ requets.idLabel,
      requets
    );
  }  

  postEmailInfoLabel(requets: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoLabels',requets
    );
  }
  
}
