import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private dataService: DataService, private operationService: OperationService) { }
  
  operations= this.operationService.getBasicOperations(() => this.dataService.getBasicDataStream(1000,5));  
  ngOnInit(): void {
  }

}
