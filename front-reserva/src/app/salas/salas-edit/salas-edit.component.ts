import { Sala } from './../../model/sala';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators, NgForm  } from "@angular/forms";

@Component({
  selector: 'app-salas-edit',
  templateUrl: './salas-edit.component.html',
  styleUrls: ['./salas-edit.component.css']
})
export class SalasEditComponent implements OnInit {

  nome: any;
  quantidade;

  checkboxComp: boolean = false;
  checkboxProj: boolean = false;
  checkboxVideo: boolean = false;
  salas: any


  constructor(public fb: FormBuilder, private actRoute: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.mostraSala(id);
  }

  toggleVisibility(e, check){
    switch (check) {
      case 'comp':
        this.checkboxComp = e.target.checked;
        break;
      case 'projetor':
        this.checkboxProj = e.target.checked;
        break;
      case 'video':
        this.checkboxVideo = e.target.checked;
        break;
      default:
        break;
    }
  }

  mostraSala(id) {
    this.apiService.getSala(id).subscribe(data => {
      this.salas = data;
      this.nome = this.salas.nome;
      this.quantidade = this.salas.quantidade;
      this.checkboxComp = this.salas.computador;
      this.checkboxProj = this.salas.projetor;
      this.checkboxVideo = this.salas.video;
    });
  }

  onSubmit() {
    let data
    data = {
      nome: this.nome, 
      quantidade: this.quantidade,
    
      computador: this.checkboxComp,
      projetor: this.checkboxProj,
      video: this.checkboxVideo
    }

    if (window.confirm('Are you sure?')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      console.log(data)
      this.apiService.updateSala(id, data)
        .subscribe(res => {
          this.router.navigateByUrl('/salas-list');
          console.log('Content updated successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }

}
