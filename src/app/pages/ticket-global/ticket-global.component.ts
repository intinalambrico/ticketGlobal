import { TicketGlobalService } from './service/ticket-global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-ticket-global',
  templateUrl: './ticket-global.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class TicketGlobalComponent implements OnInit {


  public selected:boolean=false;

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

  //buttonLoading
  public buttonDetall:boolean = false;
  public buttonTicket:boolean = false;
  public buttonCus:boolean = false;

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

    this.selected = true;
    this.tempItem = item;
    if(opt == 'cus')
    {
      this.relationContratos = true;
      this.relationDetalle = false;
      this.getListCus();

    }else if(opt == 'detalle')
    {
      this.relationContratos = false;
      this.relationDetalle = true;
      this.getListSeguimiento();
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
        console.log(error);
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
    })
  }

  addMessage(sev:string, sum:string, det:string){
    this.messageService.add({severity:sev, summary:sum, detail:det});
  }

 

}
