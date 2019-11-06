import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaboradorCreateComponent } from './colaborador/colaborador-create/colaborador-create.component';
import { ColaboradorEditComponent } from './colaborador/colaborador-edit/colaborador-edit.component';
import { ColaboradorListComponent } from './colaborador/colaborador-list/colaborador-list.component';
import { SalasListComponent } from './salas/salas-list/salas-list.component';
import { SalasEditComponent } from './salas/salas-edit/salas-edit.component';
import { SalasCreateComponent } from './salas/salas-create/salas-create.component';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'colaborador-list' },
  { path: 'colaborador-create', component: ColaboradorCreateComponent },
  { path: 'colaborador-edit/:id', component: ColaboradorEditComponent },
  { path: 'colaborador-list', component: ColaboradorListComponent },

  { path: 'salas-create', component: SalasCreateComponent },
  { path: 'salas-edit/:id', component: SalasEditComponent },
  { path: 'salas-list', component: SalasListComponent },

  { path: 'agendamento', component: AgendamentoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
