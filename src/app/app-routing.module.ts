import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaboradorCreateComponent } from './colaborador/colaborador-create/colaborador-create.component';
import { ColaboradorEditComponent } from './colaborador/colaborador-edit/colaborador-edit.component';
import { ColaboradorListComponent } from './colaborador/colaborador-list/colaborador-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'colaborador-list' },
  { path: 'colaborador-create', component: ColaboradorCreateComponent },
  { path: 'colaborador-edit/:id', component: ColaboradorEditComponent },
  { path: 'colaborador-list', component: ColaboradorListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
