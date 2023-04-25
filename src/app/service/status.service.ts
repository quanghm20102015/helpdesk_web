import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  create(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Status',
      data
    );
  }
  
  update(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/Status',
      data
    );
  }
  
  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Status'
    );
  }
  
  getById(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Status/?id='+ id
    );
  }
}
