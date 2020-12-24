import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { RecordServiceBack } from '../_services/records.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private schedule: JSON

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private recordsService: RecordServiceBack
  ) { }

  ngOnInit() {
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;


      const obj: any =
      {
        'email' : this.form.get('email').value,
        'password' : this.form.get('password').value,
        'datasource' : this.form.get('datasource').value,
        'name' : this.form.get('name').value,
        'pawprint' : this.form.get('pawprint').value,
        'department' : this.form.get('department').value,
        'role' : this.form.get('role').value,
        'pi' : this.form.get('pi').value,
        'protitle' : this.form.get('protitle').value,
        'prodesc' : this.form.get('prodesc').value,
        'funding' : this.form.get('funding').value,
        'datatype' : this.form.get('datatype').value,
        'irb' : this.form.get('irb').value
      };
     this.schedule = <JSON>obj;
     this.recordsService.addRequest(this.schedule);
      if (this.form.invalid) {
        swal('Form entries not valid')
          return;
      }
      swal('Form submitted')
  }

}
