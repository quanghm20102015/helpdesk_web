import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  optionDateSubject$ = new Subject<any>();

  constructor() { }

  changeOptionDate(data: any) {
    this.optionDateSubject$.next(data);
  }
}
