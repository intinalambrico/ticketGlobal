import { TicketGlobalService } from './service/ticket-global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-ticket-global',
  templateUrl: './ticket-global.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class TicketGlobalComponent implements OnInit {
//descripcionmasgrande
public masgrande:boolean = false;
public masgrandeItem:any[] = [];

  //buscar x fecha
  public rangeDates:any[] = [];
  public viewCalendar:boolean = false;
  public pipe:DatePipe = new DatePipe('en-US');
  /***
 * columnas
 */
  //columna dos de row
  public selected:boolean=false;
  //fila de imagenes
  public selectedImages:boolean = false;

  public listTicket:any[] =[];

  public dialog:boolean = false;

  public contrato:boolean = false;

  public listCus:any[] =[];

  public tempItem:any = '';

  public admin:boolean = false;

  public listDetalle:any[] = [];

  public seguimiento:boolean = false;

  public user:string = '';

  //col
  public relationContratos:boolean = false;
  public relationDetalle:boolean = false;

  //images
  public images:any[] = [];


  //buttonLoading
  public buttonDetall:boolean = false;
  public buttonTicket:boolean = false;
  public buttonCus:boolean = false;
  public buttonImages:boolean = false;

  public editform = this.fb.group({
    titulo: ['', Validators.required],
    descripcion:['', Validators.required],
    user_id:['',Validators.required]
  });

  public editCus = this.fb.group({
    contrato_id:['', Validators.required],
    ticket_global_id:['', Validators.required]
  });

  public editSeguimiento = this.fb.group({
    usuario_id:['', Validators.required],
    comentario:['', Validators.required],
    global_id:['', Validators.required]
  });
  constructor(private ticketGlobalService:TicketGlobalService , private fb:FormBuilder,
    private activatedRoute:ActivatedRoute , private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({rol}) => {
      
      if(rol.rol_name=='ADMIN')
      {
         this.admin = true;
         this.user = rol.user_name;
        
      }else{
         this.admin = false;
         this.user = rol.user_name;
       }
    })
    this.getListTicketActivo();
    this.getListImagenes();
  }

  newContrato()
  {
    this.contrato = true;
  }

  newGlobal()
  {
    this.selected = true;
  }

  getListTicketActivo()
  {
      this.ticketGlobalService.getListGlobal().subscribe((resp:any) => {
        this.listTicket = resp.response; 
        for(let item of this.listTicket){

          item.descrip = item.descripcion.substr(0,30)
        }
         
      })
  }

  openDialog()
  {
    this.dialog = true;
  }

  onSave()
  {
    this.buttonTicket = true;
    this.editform.get('user_id')?.setValue(this.user);
    if(this.editform.valid)
    { 
      this.ticketGlobalService.ticketGlobalSave(this.editform.value).subscribe((resp:any) => {
        this.buttonTicket = false;
        this.editform.reset();
        this.dialog = false;
        this.getListTicketActivo();
      })

    }else{
      this.buttonTicket = false;
      this.addMessage('error' , 'Error' , 'Todos los campos son obligatorios');
    }
  }

  verCus(item:any , opt:string)
  { 

    
    this.tempItem = item;
    if(opt == 'cus')
    {
      this.selected = true;
      this.relationContratos = true;
      this.relationDetalle = false;
      this.getListCus();

    }else if(opt == 'detalle')
    { this.selected = true;
      this.relationContratos = false;
      this.relationDetalle = true;
      this.getListSeguimiento();
    }else if(opt == 'images')
    {
      this.selectedImages =  true;
    }
   
  }

  onSaveCus()
  {
    this.buttonCus = true;
    this.editCus.get('ticket_global_id')?.setValue(this.tempItem.ticket_global_id);
    if(this.editCus.valid)
    {
      this.ticketGlobalService.addCusTikect(this.editCus.value).subscribe((resp:any) => {
        this.buttonCus = false;
        this.editCus.reset();
        this.contrato = false;
        this.getListCus();
        
      }, error => {
        this.buttonCus = false;
        this.addMessage('error' , 'Error' , `Error server : ${error.error.response} el contrato`);
      })
    }else{
      this.buttonCus = false;
      this.addMessage('error' , 'Error' , 'Todos los campos son obligatorios');
    }
  }

  deleteTicketGlobal(item:any)
  {
    this.ticketGlobalService.ticketGlobalDelete(item).subscribe((resp:any) => {
      this.getListTicketActivo();
    })
  }

  addDetalle()
  {
    this.seguimiento = true;
  } 

  onSaveDetalle()
  {
    this.buttonDetall = true;
    this.editSeguimiento.get('usuario_id')?.setValue(this.user);
    this.editSeguimiento.get('global_id')?.setValue(this.tempItem.ticket_global_id);
    
    if(this.editSeguimiento.valid){
      this.ticketGlobalService.detalleTicketSave(this.editSeguimiento.value).subscribe((resp:any) => {
        this.buttonDetall = false;
        this.seguimiento = false;
        this.editSeguimiento.reset();
        this.getListSeguimiento();

      }, error => {
        this.buttonDetall = false;
      })
    }else{
      this.addMessage('error' , 'Error' , 'Todos los campos son obligatorios');
      this.buttonDetall = false;
    }
  }

  getListCus()
  {
    this.ticketGlobalService.getListCus(this.tempItem.ticket_global_id).subscribe((resp:any) => {
      this.listCus = resp.response;
    })
  }
  getListSeguimiento()
  {
     
    this.ticketGlobalService.detalleTicketList(this.tempItem.ticket_global_id).subscribe((resp:any) => {
      this.listDetalle = resp.response;
      
      for(let item of this.listDetalle)
      {
        item.descrip = item.detalle_ticket_global_comentario.substr(0,45)
      }
      console.log(this.listDetalle);
       
    })
  }

  addMessage(sev:string, sum:string, det:string){
    this.messageService.add({severity:sev, summary:sum, detail:det});
  }


  ///procesos de busqueda x fecha
  openCalendar()
  {
    this.viewCalendar = true;
  }

  searchListGlobal()
  {
    const range = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyy-MM-dd'),
      valor2: this.pipe.transform(this.rangeDates[1], 'yyyy-MM-dd'),
    }

    this.ticketGlobalService.searchByBetween(range).subscribe((resp:any) =>{
      this.viewCalendar = false;
      this.listTicket = resp.response;

      for(let item of this.listTicket)
      {
        item.descrip = item.descripcion.substr(0,30)
      }
    } )
  }
 
//ver mas grande la description
verMasGrande(item:any , option:string)
{
  if(option == 'detalle')
  {
    this.masgrandeItem = item.detalle_ticket_global_comentario;
  }else{
    this.masgrandeItem = item.descripcion
  }
  this.masgrande = true;
}

//imagenes
getListImagenes()
{
  
}

myUploader(event:File)
{
  console.log(this.tempItem);
  this.ticketGlobalService.saveImagen(event , this.tempItem).subscribe((resp:any) => {
     console.log(resp.response);
  })

}
}
