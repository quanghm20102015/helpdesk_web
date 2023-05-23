import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  ) { }
  
  reqHeaders = new HttpHeaders().set('Content-Type','application/json');

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

  getEmailInfo(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/' + id
    );
  }

  delete(request: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: request
    };
    
    return this.http.delete(
      AppSettings.HostingAddress + '/EmailInfoes', options
    );
  }

  SendMail(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/SendMail',
      data
    );
  }

  SendMailNewConversation(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/SendMailNewConversation',
      data
    );
  }

  getByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdCompany?idCompany=' + idCompany
    );
  }
  getByStatus(request: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/getByStatus?idCompany=' + request.idCompany + '&status=' + request.status,
      request
    );
  }


  UpdateStatus(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/EmailInfoes/UpdateStatus',
      data
    );
  }
  getByIdLabel(request: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdLabel?idCompany=' + request.idCompany + '&idLable=' + request.idLabel + '&status=' + request.status,
      request
    );
  }

  getByIdConfigEmail(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByIdConfigEmail?idConfigEmail=' + id,
    );
  }
  getByAgent(request: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetByAgent?idCompany=' + request.idCompany + '&assign=' + request.assign + '&status=' + request.status,
      request
    );
  }

  getCountByCompanyAgent(request: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/EmailInfoes/GetCountByCompanyAgent?idCompany=' + request.idCompany
      + '&assign=' + request.assign + '&idConfigEmail=' + request.idConfigEmail + '&status=' + request.status + '&idLabel=' + request.idLabel,
      request
    );
  }

  postEmailInfoLabel(request: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoLabels', request
    );
  }

  getFillter(request: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/GetFillter',JSON.stringify(request),{headers:this.reqHeaders}
    );
  }

  getFillterCount(request: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoes/GetFillterCount',JSON.stringify(request),{headers:this.reqHeaders}
      );
  }
  
  updateAssign(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoAssigns',
      data
    );
  }
  
  updateFollow(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/EmailInfoFollows',
      data
    );
  }

}
