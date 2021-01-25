import { Component, Input, OnInit } from '@angular/core';
import { concat, interval, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DemoOperation } from '../../demo-operation';

@Component({
  selector: 'dwf-demo-content',
  templateUrl: './demo-content.component.html',
  styleUrls: ['./demo-content.component.scss']
})
export class DemoContentComponent implements OnInit {  
  output: any = {};
  @Input() operations: DemoOperation[] = [];
  constructor() { }

  ngOnInit(): void {
    this.operations.forEach(operation => {      
      this.output[operation.title] = '';
    });
  }

  activateDemo(operation: DemoOperation) {  
    let timesCalled = 0;
    let startTime = new Date();
    operation.callback(...operation.observables$).pipe(
      tap(o => ++timesCalled),
    ).subscribe(
      data => {
        console.log(data);      
        this.output[operation.title] = data;
      },
      (err) => console.log(err),
      () => {
        let endTime = new Date();
        let milliseconds = endTime.valueOf() - startTime.valueOf();
        this.output[operation.title]+= ` (this data was processed ${timesCalled} times, and took ${milliseconds} ms to complete.)`
        
      });
  }
}
