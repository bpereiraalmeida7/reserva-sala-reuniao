import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

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

  

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando de _START_ a _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando nenhum elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Carregando registros...",
        zeroRecords: "Nenhum registro encontrado.",
        emptyTable: "Não há dados disponiveis na tabela",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Seguinte",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ativar para ordenar a tabela em ordem ascendente",
          sortDescending: ": Ativar para ordenar a tabela em ordem descendente"
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
     setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    })    
  }

  removerSala(sala, index) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deletado!',
          'Esta sala foi deletada com sucesso',
          'success'
        )
        this.apiService.deleteSala(sala.id).subscribe((data) => {
          this.salas.splice(index, 1);
          this.listaSalas()
        })   
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } 
    })
      
  }

}
