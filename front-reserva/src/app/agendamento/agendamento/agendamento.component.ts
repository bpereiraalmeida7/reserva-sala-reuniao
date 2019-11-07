import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  colaboradores: any = [];
  salas: any = [];
  agendamentos: any = []
  salas_filtro: any = [];
  salas_disponiveis: any = [];
  dtOptions: DataTables.Settings = {};

  sala_id: any = null;
  colaborador_id: any = null;
  hora_inicio: any = '';
  hora_fim: any = '';
  computador: any = '';
  projetor: any = '';
  video: any = '';

  checkboxComp: boolean = false;
  checkboxProj: boolean = false;
  checkboxVideo: boolean = false;

  
  dataAgendamento = Date.now();

  public mask = [/[0-9]/, /\d/, '/', /[0-9]/,  /\d/, '/', /[0-9]/, /\d/, /\d/, /\d/];
  public maskTime = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];
  public maskTimeFim = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];

  constructor(private apiService: ApiService, private pipe: DatePipe) { }

  ngOnInit() {
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

    this.listaColaboradores()
    this.listaSalas()
    this.listaAgendamentos()
  }

  toggleVisibility(e, check){
    console.log('e')
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
     this.getDisponiveis();
    })    
  }

  listaAgendamentos(){
    this.apiService.getAgendamentos().subscribe((data) => {
      this.agendamentos = data;
      this.agendamentos = this.agendamentos.agendamento;
      console.log(this.agendamentos);
    })    
  }

  getDisponiveis(){
    let data
    data = {
      colaborador_id: this.colaborador_id, 
      sala_id: this.sala_id,
      data_reserva: this.pipe.transform(this.dataAgendamento, 'dd/MM/yyyy'),
      hora_inicio: this.hora_inicio,
      hora_fim: this.hora_fim,
      computador: this.checkboxComp,
      projetor: this.checkboxProj,
      video: this.checkboxVideo
    }
    console.log(data)
    /* $record[$data_reserva] != $data['data_reserva'] && ($record[$hora_inicio] >= $data['hora_inicio'] && $record[$hora_fim] <= $data['hora_fim']) && $record[$computador] == $data['computador'] && $record[$projetor] == $data['projetor'] && $record[$video] == $data['video'] */
    this.salas_filtro = this.salas.filter(function(room) {
      return (room.computador == data.computador || room.projetor == data.projetor || room.video == data.video);
    });

    /* this.salas_disponiveis = this.agendamentos.filter(function(room) {
      return (room.id == this.salas_filtro.id);
    });
 */
    this.salas_disponiveis = this.salas_filtro.filter(function(room) {
      return (room.data_reserva == data.data_reserva && (room.hora_inicio < data.hora_inicio && room.hora_fim < data.hora_fim) && room.id == this.salas_agendamento.sala_id);
    });
    /* this.salas_disponiveis = this.agendamentos.filter(function(room) {
      return room.id == this.salas_filtro.id;
    }); */
    var novoarray = this.salas_filtro.filter(function(a){return a.id != 2});
    console.log(this.salas_disponiveis)
  }
}
