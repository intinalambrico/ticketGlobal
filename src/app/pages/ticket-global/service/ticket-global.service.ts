import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const base_url = "http://localhost:8080/control/modulos/presenters/";
// const base_url ="/control/modulos/presenters/";
@Injectable({
  providedIn: 'root'
})
export class TicketGlobalService {

  constructor(private http:HttpClient) { }

  getListGlobal()
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData();

    data.append("function" , "globalTicketList");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");

    return this.http.post( link, data )
  }

  ticketGlobalSave(item:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("user_id" , item.user_id );
    data.append("titulo" , item.titulo);
    data.append("descripcion" , item.descripcion);
    data.append("function" , "globalTicketSave");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");

    return this.http.post(link , data);
  }

  getListCus(item:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("ticket_global_id" , item);
    data.append("function" , "getListCus");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");

    return this.http.post(link , data);
    
  }

  addCusTikect(item:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "addCusTicketGlobal");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("contrato_id" , item.contrato_id);
    data.append("ticket_global_id" , item.ticket_global_id);

    return this.http.post(link, data);
  }

  returnAdmin(id:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "returnAdmin");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("usuario_id" , id);

    return this.http.post(link, data);
  }

  ticketGlobalDelete(item:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "globalTicketDelete");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("ticket_global_id" , item.ticket_global_id);

    return this.http.post(link, data);
  }

  detalleTicketSave(item:any){
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "detalleGlobalTicketSave");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("ticket_global_id" , item.global_id);
    data.append("usuario_id" , item.usuario_id);
    data.append("detalle_ticket_global_comentario" , item.comentario);

    return this.http.post(link, data);
  }

  detalleTicketList(item:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "detalleGlobalTicketList");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("ticket_global_id" , item);

    return this.http.post(link, data);
  }
}
