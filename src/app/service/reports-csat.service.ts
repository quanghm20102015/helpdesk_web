import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: 'root'
})
export class ReportsCsatService {

  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  getOverview(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/CsatOverview?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
    );
  }

  getCsatResponeDistribution(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/CsatResponeDistribution?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany
    );
  }

  getResponeDetail(data: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Reports/CsatResponeDetail?fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&idCompany=' + data.idCompany + '&pageIndex=' + data.pageIndex + '&pageSize=' + data.pageSize
    );
  }
}
