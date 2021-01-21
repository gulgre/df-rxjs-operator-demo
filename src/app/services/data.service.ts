import { Injectable } from '@angular/core';
import { from, interval, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getBasicDataStream(duration: number, count: number) {
    return interval(duration).pipe(
      map(number => number + 1),
      take(count)
    );
  }  
}
