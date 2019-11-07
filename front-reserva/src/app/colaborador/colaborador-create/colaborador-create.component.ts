import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colaborador-create',
  templateUrl: './colaborador-create.component.html',
  styleUrls: ['./colaborador-create.component.css']
})
export class ColaboradorCreateComponent implements OnInit {

  submitted = false;
  colaboradorForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
    this.mainForm();
  }

  ngOnInit() {
  }

  mainForm() {
    this.colaboradorForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.colaboradorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.colaboradorForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.colaboradorForm.value).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Salvo com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.ngZone.run(() => this.router.navigateByUrl('/colaborador-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
