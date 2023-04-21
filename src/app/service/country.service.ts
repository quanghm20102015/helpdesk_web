import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceInvokerService } from "./service-invoker.service";
import { Observable } from "rxjs";
import { AppSettings } from "../constants/app-setting";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  constructor(
    private http: HttpClient,
    private serviceInvoker: ServiceInvokerService
  ) {}

  getAllCountry(): Observable<any> {
    return this.http.get(
      AppSettings.HostingAddress + '/Countries'
    );
  }
}
