import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecordServiceBack {
    private records: JSON[] = [];
    private recordsUpdated = new Subject<JSON[]>();
    private record : JSON

    constructor(
        private router: Router,
        private http: HttpClient,

    ) {

    }

    getUserRecords(id: string) {
      return this.http.get<{message: string, records:JSON[]}>(`http://localhost:3000/user/records/${id}`)
      .subscribe((getData) => {
        this.records = getData.records;
        this.recordsUpdated.next([...this.records]);
      });
  }

  getUserRecordsUpdateListener() {
    return this.recordsUpdated.asObservable();
  }

    getAllRecords(id: string) {
         return this.http.get<{message: string, records:JSON[]}>("http://localhost:3000/user/records")
         .subscribe((getData) => {
           this.records = getData.records;
           this.recordsUpdated.next([...this.records]);
         });
     }

     getAllRecordsUpdateListener() {
       return this.recordsUpdated.asObservable();
     }


    addRequest( schedule: JSON) {
       const recordData = new FormData();

       recordData.append("email", schedule['email']);
       recordData.append("password", schedule['password']);
       recordData.append("datasource", schedule['datasource']);
       recordData.append("name", schedule['name']);
       recordData.append("pawprint", schedule['pawprint']);
       recordData.append("department", schedule['department']);
       recordData.append("pi", schedule['pi']);
       recordData.append("role", schedule['role']);
       recordData.append("protitle", schedule['protitle']);
       recordData.append("prodesc", schedule['prodesc']);
       recordData.append("funding", schedule['funding']);
       recordData.append("datatype", schedule['datatype']);
       recordData.append("irb", schedule['irb']);

       console.log(schedule)
       return this.http
       .post<{message: string, recordId: number}>("http://localhost:3000/user/record", recordData)
       .subscribe((responseMessage) => {
         console.log(responseMessage.message);
         console.log("recordId is"  + responseMessage.recordId);
       });
    }


    addUser( schedule: JSON) {
      const recordData = new FormData();
      recordData.append("email", schedule['email']);
      recordData.append("password", schedule['password']);

      console.log(schedule)
      return this.http
      .post<{message: string, redshiftRes: any}>("http://localhost:3000/user/record/createuser", recordData)
      .subscribe((responseMessage) => {
        console.log(responseMessage.message);
        console.log("redshiftRes is"  + responseMessage.redshiftRes);
      });
   }

}
