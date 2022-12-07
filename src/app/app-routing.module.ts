import { TicketRoutingResolveService } from './pages/ticket-global/service/ticket-global-routing-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketGlobalComponent } from './pages/ticket-global/ticket-global.component';

const routes: Routes = [
  {path:':id/global' , 
  component:TicketGlobalComponent,
  resolve:{
    rol: TicketRoutingResolveService,
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
