import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  create(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Contacts',
      data
    );
  }
  update(data: any): Observable<any> {
    return this.http.put(
      AppSettings.HostingAddress + '/Contacts',
      data
    );
  }

  getContact(id: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Contacts/' + id
    );
  }

  deleteContact(id: any): Observable<any> {
    return this.http.delete(
      AppSettings.HostingAddress + '/Contacts/' + id
    );
  }
  
  getAll(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Contacts'
    );
  }
  
  getByIdCompany(idCompany: any): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Contacts/GetByIdCompany?idCompany='+ idCompany
    );
  }
}
