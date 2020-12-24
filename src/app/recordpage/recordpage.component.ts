import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';
import { RecordServiceBack } from '../_services/records.service';

@Component({
  selector: 'recordpage',
  templateUrl: './recordpage.component.html',
  styleUrls: ['./recordpage.component.css']
})
export class RecordPageComponent {

  form: FormGroup;
  fillroles: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  curr_User: string
  private schedule: JSON
  private record : JSON
  private records : JSON[]
  private datasub: Subscription;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private recordsService: RecordServiceBack
  ) { }

  ngOnInit() {

    this.route.queryParams
    .subscribe(params => {
      this.curr_User = params.curr_User;
    });

      this.fillroles = this.formBuilder.group({
        arole: ['', Validators.required],
      })

      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        datasource: ['', Validators.required],
        name: ['', Validators.required],
        pawprint : ['', Validators.required],
        department: ['', Validators.required],
        role: ['', Validators.required],
        pi: ['', Validators.required],
        protitle: ['', Validators.required],
        prodesc: ['', Validators.required],
        funding: ['', Validators.required],
        datatype: ['', Validators.required],
        irb: ['', Validators.required],
      });

      this.recordsService.getUserRecords(this.curr_User)
      this.datasub = this.recordsService.getUserRecordsUpdateListener()
        .subscribe((records: JSON[] ) => {
          console.log("User record CAME HERE")
          console.log(records)
          this.record = records[0];

          this.form.patchValue({
            email: this.record['email'],
            password: this.record['password'],
            datasource: this.record['datasource'],
            name: this.record['name'],
            pawprint : this.record['pawprint'],
            department: this.record['department'],
            role: this.record['role'],
            pi: this.record['pi'],
            protitle: this.record['protitle'],
            prodesc: this.record['prodesc'],
            funding: this.record['funding'],
            datatype: this.record['datatype'],
            irb: this.record['irb']
          });
        })

        this.form.disable()


  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(){
  const obj: any =
  {
    'email' : 'Ashish',
    'password' : 'Pandey',
  };
 swal("User Registered!");
}

}
