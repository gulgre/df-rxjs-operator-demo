import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-higher-order',
  templateUrl: './higher-order.component.html',
  styleUrls: ['./higher-order.component.scss']
})
export class HigherOrderComponent implements OnInit {

  constructor(private dataService: DataService, private operationService: OperationService) { }
  
  operations= this.operationService.getHigherOrderOperations(
    () => this.dataService.getBasicDataStream(400,10),
    (source: number) => this.dataService.getBasicDataStream(1000 / source,5, source * 10)
  );  
  ngOnInit(): void {
  }

}
