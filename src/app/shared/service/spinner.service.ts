import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}

  loaderSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
