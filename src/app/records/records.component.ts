import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecordServiceBack } from '../_services/records.service';

export interface PeriodicElement {
  name: string;
  position: number;
  role: string;
  status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Bob Smith', role: 'Faculty', status: 'Active'},
  {position: 2, name: 'Mike Smith', role: 'Faculty', status: 'Active'},
  {position: 3, name: 'Juan Carlos', role: 'Faculty', status: 'Active'},
  {position: 4, name: 'Jane Smith', role: 'Faculty', status: 'Inactive'},
  {position: 5, name: 'Mike Jones', role: 'Staff', status: 'Inactive'},
  {position: 6, name: 'David Smith', role: 'Trainee', status: 'Inactive'},
  {position: 7, name: 'Sarah Smith', role: 'Student', status: 'Pending'},
  {position: 8, name: 'James Smith', role: 'Student', status: 'Pending'},
  {position: 9, name: 'Rog Smith', role: 'Staff', status: 'Pending'},
  {position: 10, name: 'Raf Smith', role: 'Trainee', status: 'Pending'},
];

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent{
  dataSource = new MatTableDataSource();
  displayedColumns: string[];
  private datasub : Subscription;
  private datarecords : JSON[];
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private recordsService: RecordServiceBack
  ) {
  }

  ngOnInit(){
    this.recordsService.getAllRecords("curr_User")
    this.recordsService.getAllRecordsUpdateListener()
        .subscribe((records: JSON[] ) => {
          console.log("SOME IMAES CAME HERE")
          console.log(records)
          this.datarecords = records;

          this.displayedColumns = ['pawprint', 'name', 'role', 'status'];
          //dataSource = ELEMENT_DATA;
          this.dataSource = new MatTableDataSource(this.datarecords);;
        })

      }

  moveToInfo(user: string){
      console.log("moveToInfo called")
      this.router.navigate(['/recordinfo'] ,{ queryParams: { curr_User: user }});
  }
}
