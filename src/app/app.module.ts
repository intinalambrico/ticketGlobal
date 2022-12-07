import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketGlobalComponent } from './pages/ticket-global/ticket-global.component';


import {SplitterModule} from 'primeng/splitter';

import{ToolbarModule}from 'primeng/toolbar';

import{TableModule} from 'primeng/table';

import{ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import { HttpClientModule } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {  InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDetalleComponent } from './pages/ticket-global/add-detalle/add-detalle.component';
@NgModule({
  declarations: [
    AppComponent,
    TicketGlobalComponent,
    AddDetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SplitterModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    MegaMenuModule,
    HttpClientModule,
    DialogModule,
    InputTextModule, 
    ReactiveFormsModule,
    ToastModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
