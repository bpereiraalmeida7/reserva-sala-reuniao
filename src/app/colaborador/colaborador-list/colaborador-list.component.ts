import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit {

  colaboradores: any = [];
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
   // this.listaColaboradores()
  }

  listaColaboradores(){
    this.apiService.getColaboradores().subscribe((data) => {
     this.colaboradores = data;
    })    
  }

  removerColaborador(colaborador, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(colaborador._id).subscribe((data) => {
          this.colaboradores.splice(index, 1);
          this.listaColaboradores()
        }
      )    
    }
  }
}
