import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  colaboradores: any = [];
  salas: any = [];
  dtOptions: DataTables.Settings = {};
  
  dataAgendamento = Date.now();

  public mask = [/[0-9]/, /\d/, '/', /[0-9]/,  /\d/, '/', /[0-9]/, /\d/, /\d/, /\d/];
  public maskTime = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];
  public maskTimeFim = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];

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
    this.listaColaboradores()
    this.listaSalas()
  }

  listaColaboradores(){
    this.apiService.getColaboradores().subscribe((data) => {
     this.colaboradores = data;
     this.colaboradores = this.colaboradores.colaboradores;
     console.log(this.colaboradores);
    })    
  }

  listaSalas(){
    this.apiService.getSalas().subscribe((data) => {
     this.salas = data;
     this.salas = this.salas.salas;
     console.log(this.salas);
    })    
  }
}
