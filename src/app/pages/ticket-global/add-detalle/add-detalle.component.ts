import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.component.html',
  styles: [
  ]
})

 
export class AddDetalleComponent implements OnInit {

  @Input() public visible:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
