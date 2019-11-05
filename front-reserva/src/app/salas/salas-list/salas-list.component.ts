import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-salas-list',
  templateUrl: './salas-list.component.html',
  styleUrls: ['./salas-list.component.css']
})
export class SalasListComponent implements OnInit {

  salas: any = [];
  dtOptions: DataTables.Settings = {};
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
    this.listaSalas()
  }

  listaSalas(){
    this.apiService.getSalas().subscribe((data) => {
     this.salas = data;
     this.salas = this.salas.salas;
     console.log(this.salas);
    })    
  }

  removerSala(sala, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteSala(sala.id).subscribe((data) => {
          this.salas.splice(index, 1);
          this.listaSalas()
        }
      )    
    }
  }

}
