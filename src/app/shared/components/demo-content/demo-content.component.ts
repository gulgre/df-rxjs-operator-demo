import { Component, Input, OnInit } from '@angular/core';
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
    operation.callback(operation.observable$).subscribe((data => this.output[operation.title] = data));
  }
}
