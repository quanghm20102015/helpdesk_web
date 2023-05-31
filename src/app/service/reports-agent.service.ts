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

    getOverview(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/AgentOverview?idCompany=' + data.idCompany
      );
    }

    agentTopConversation(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/AgentTopConversation?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
      );
    }

    agentPerformentMonitorTotal(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/AgentPerformentMonitorTotal?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&idUser=' + data.idUser
      );
    }

    agentPerformentMonitor(data: any): Observable<any> {
      return this.http.get(
        AppSettings.HostingAddress + '/Reports/AgentPerformentMonitor?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&type=' + data.type + '&idUser=' + data.idUser
      );
    }

}
