import { Colaborador } from './../../model/colaborador';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators, NgForm  } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-colaborador-edit',
  templateUrl: './colaborador-edit.component.html',
  styleUrls: ['./colaborador-edit.component.css']
})
export class ColaboradorEditComponent implements OnInit {

  submitted = false;
  editForm: FormGroup;
  colaboradorData: Colaborador[];

  constructor(public fb: FormBuilder, private actRoute: ActivatedRoute, private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.atualizaColaborador();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.mostraColaborador(id);
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

   // Getter to access form control
   get myForm() {
    return this.editForm.controls;
  }

  mostraColaborador(id) {
    this.apiService.getColaborador(id).subscribe(data => {
      this.editForm.setValue({
        nome: data['nome'],
        email: data['email'],
        telefone: data['telefone'],
      });
    });
  }

  atualizaColaborador() {
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    
    this.submitted = true;
    if (this.editForm.invalid) {
      console.log(this.myForm)
      return;
      
    } else {
      Swal.fire({
        title: 'Tem certeza?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Editado!',
            'Esta sala foi editada com sucesso',
            'success'
          )
          let id = this.actRoute.snapshot.paramMap.get('id');
          console.log(this.editForm.value)
          this.apiService.updateColaborador(id, this.editForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/colaborador-list');
              console.log('Content updated successfully!')
            }, (error) => {
              console.log(error)
            })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } 
      })
    }
  }
}
