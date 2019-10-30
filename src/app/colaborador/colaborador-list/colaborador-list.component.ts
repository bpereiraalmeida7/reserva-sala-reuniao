import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit {

  colaboradores: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  eadEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.colaboradores = data;
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.colaboradores.splice(index, 1);
        }
      )    
    }
  }
}
