import { Injectable } from '@angular/core';
import { from, interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getBasicDataStream(interval: number, count: number) {
    return timer(interval).pipe(
      take(count)
    );
  }  
}
