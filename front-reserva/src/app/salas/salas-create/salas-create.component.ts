import { DataTablesModule } from 'angular-datatables';
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

  nome: any = '';
  quantidade: any = '';

  checkboxComp: boolean = false;
  checkboxProj: boolean = false;
  checkboxVideo: boolean = false;

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private apiService: ApiService) {
   
  }

  ngOnInit() {
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


  onSubmit() {

    let data
    data = {
      nome: this.nome, 
      quantidade: this.quantidade,
    
      computador: this.checkboxComp,
      projetor: this.checkboxProj,
      video: this.checkboxVideo
    }
    console.log(data)
    this.apiService.createRoom(data).subscribe(
      (res) => {
        console.log('Room successfully created!')
        this.ngZone.run(() => this.router.navigateByUrl('/salas-list'))
      }, (error) => {
        console.log(error);
    });
  }

}
