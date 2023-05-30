import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: 'root'
})
export class ReportsAgentService {

  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService) { }

  
    topConversationAgent(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/TopConversationAgent?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
      );
    }

    performentMonitorAgentTotal(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/PerformentMonitorAgentTotal?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&idUser=' + data.idUser
      );
    }

    
    getPerformanceMonitorAgent(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/PerformentMonitorAgent?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&type=' + data.type + '&idUser=' + data.idUser
      );
    }

}
