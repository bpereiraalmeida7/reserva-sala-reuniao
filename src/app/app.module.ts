import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradorCreateComponent } from './colaborador/colaborador-create/colaborador-create.component';
import { ColaboradorEditComponent } from './colaborador/colaborador-edit/colaborador-edit.component';
import { ColaboradorListComponent } from './colaborador/colaborador-list/colaborador-list.component';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ColaboradorCreateComponent,
    ColaboradorEditComponent,
    ColaboradorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
