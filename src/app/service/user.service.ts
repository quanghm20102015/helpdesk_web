import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  createUser(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts',
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(
      AppSettings.HostingAddress + '/Accounts/Login',
      data
    );
  }
}
