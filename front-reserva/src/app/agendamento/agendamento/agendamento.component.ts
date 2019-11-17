import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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

  sala_id: any = '';
  colaborador_id: any = '';
  hora_inicio: any = '';
  hora_fim: any = '';
  computador: any = '';
  projetor: any = '';
  video: any = '';

  checkboxComp: boolean = false;
  checkboxProj: boolean = false;
  checkboxVideo: boolean = false;

  agendamentoFinal: any;
  
  dataAgendamento: any = '';

  public mask = [/[0-9]/, /\d/, '/', /[0-9]/,  /\d/, '/', /[0-9]/, /\d/, /\d/, /\d/];
  public maskTime = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];
  public maskTimeFim = [/[0-9]/, /\d/, ':', /[0-9]/,  /\d/];

  constructor(private apiService: ApiService, private pipe: DatePipe, private spinner: NgxSpinnerService) { }

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
  }

  toggleVisibility(e, check){
    /* Checkbox (computador, projetor, video) */
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

  toggleVisibilitySala(e, id){
    this.sala_id = id;
  }

  toggleVisibilityColaborador(e, id){
    this.colaborador_id = id;
  }

  listaColaboradores(){
    /* Lista todos os colaboradores pra preencher o combo */
    this.apiService.getColaboradores().subscribe((data) => {
     this.colaboradores = data;
     this.colaboradores = this.colaboradores.colaboradores;
    })    
  }

  listaSalas(){
    /* Lista todas as salas para ser usada pela função getDisponiveis() */
    this.apiService.getSalas().subscribe((data) => {
     this.salas = data;
     this.salas = this.salas.salas;
    })    
  }

  listaAgendamentos(){
    /* Retorna os agendamentos filtrados na API pela hora inicial e final */

    this.spinner.show();

    let data
    data = {
      hora_inicio: this.hora_inicio,
      hora_fim: this.hora_fim
    }
    this.apiService.getAgendamento(data).subscribe((data) => {
      this.agendamentos = data;
      this.getDisponiveis();
    })    
  }

  getDisponiveis(){
    /* Retorna o array de agendamentos pré filtrados, verifica quais das salas, não está nesse array e filtra por itens da sala (computador, projetor e video) e data */
    
    let data
    data = {
      sala_id: this.sala_id,
      data_reserva: this.dataAgendamento,
      hora_inicio: this.hora_inicio,
      hora_fim: this.hora_fim,
      computador: this.checkboxComp,
      projetor: this.checkboxProj,
      video: this.checkboxVideo
    }

    this.agendamentos.forEach(element => {
      this.salas_filtro = this.salas.filter(function(room) {
        return ((room.id != element.sala_id) || (room.id == element.sala_id && element.data_reserva != data.data_reserva));
      });
    });
    
    this.salas_filtro = this.salas_filtro.filter(function(roomFilt) {
      if(data.computador == false && data.projetor == false && data.video == false){
        return (roomFilt.computador == false || roomFilt.projetor == false || roomFilt.video == false);
      }else{
        return ((roomFilt.computador == data.computador && roomFilt.projetor == data.projetor && roomFilt.video == data.video));
      }
    });
    
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
  }

  salvarAgendamento(){
    this.spinner.show();

    this.agendamentoFinal = {
      colaborador_id: this.colaborador_id, 
      sala_id: this.sala_id,
      data_reserva: this.dataAgendamento,
      hora_inicio: this.hora_inicio,
      hora_fim: this.hora_fim,
    };

    this.apiService.createAgendamento(this.agendamentoFinal).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Salvo com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          /** spinner ends after 3 seconds */
          this.spinner.hide();
        }, 3000);
        
        /* Limpando as variáveis do formulário: */
        this.salas_filtro = []
        this.agendamentoFinal = {}
        this.checkboxComp = false,
        this.checkboxProj = false,
        this.checkboxVideo = false

      }, (error) => {
        console.log(error);
    });
  }
}
