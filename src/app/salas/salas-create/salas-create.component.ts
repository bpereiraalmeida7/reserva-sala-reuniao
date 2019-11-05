import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-salas-create',
  templateUrl: './salas-create.component.html',
  styleUrls: ['./salas-create.component.css']
})
export class SalasCreateComponent implements OnInit {

  submitted = false;
  salaForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) { }

  ngOnInit() {
  }

  mainForm() {
    this.salaForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.salaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.salaForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.salaForm.value).subscribe(
        (res) => {
          console.log('Room successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/sala-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
