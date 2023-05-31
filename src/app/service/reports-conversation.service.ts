import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: 'root'
})
export class ReportsConversationService {

  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  GetByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Labels/GetByIdCompany?idCompany=' + idCompany
    );
  }

  getOverview(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/Overview?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
    );
  }

  getPerformentMonitorTotal(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/PerformentMonitorTotal?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
    );
  }

  getPerformanceMonitor(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/PerformentMonitor?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&type=' + data.type
    );
  }

  getLabelDistribution(data: any): Observable<any> {
    return this.http.post(AppSettings.HostingAddress + '/Reports/LabelDistribution', data);
  }
}
