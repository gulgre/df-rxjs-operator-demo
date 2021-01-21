import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.scss']
})
export class CombinedComponent implements OnInit {

  constructor(private dataService: DataService, private operationService: OperationService) { }
  
  operations= this.operationService.getCombinedOperations(() => this.dataService.getBasicDataStream(500,10));  
  ngOnInit(): void {
  }

}
