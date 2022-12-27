import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/control/modulos/presenters/";
//const base_url ="/control/modulos/presenters/";
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

  searchByBetween(fecha:any)
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData(); 

    data.append("function" , "searchByBetween");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("valor1" , fecha.valor1);
    data.append("valor2" , fecha.valor2);

    return this.http.post(link, data);
  }

  saveImagen(file:File , item:any):Observable<any>
  {
    const link =`${base_url}PresentersGlobalFunctions.php`;
    const data = new FormData();

    data.append("function" , "uploadFiles");
    data.append("key" , "f24f0aaa81db035965e65f60c5e54c41");
    data.append("ticket_global_id" , item.ticket_global_id);
    data.append("upload" , file);

    return this.http.post(link, data);
    /*return {
      "data":[
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria1.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria1s.jpeg",
              "alt": "Description for Image 1",
              "title": "Title 1"
          },
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria2.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria2s.jpeg",
              "alt": "Description for Image 2",
              "title": "Title 2"
          },
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria3.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria3s.jpeg",
              "alt": "Description for Image 3",
              "title": "Title 3"
          },
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria4.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria4s.jpeg",
              "alt": "Description for Image 4",
              "title": "Title 4"
          },
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria5.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria5s.jpeg",
              "alt": "Description for Image 5",
              "title": "Title 5"
          },
          {
              "previewImageSrc": "http://localhost:8080/control/gallery/galleria6.jpeg",
              "thumbnailImageSrc": "http://localhost:8080/control/gallery/galleria6s.jpeg",
              "alt": "Description for Image 6",
              "title": "Title 6"
          } 
      ]
  }*/
  
  }
}
