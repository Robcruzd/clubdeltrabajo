import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { commonMessages } from '../../shared/constants/commonMessages';


@Component({
    selector: 'jhi-crear-oferta',
    templateUrl: './crear-oferta.component.html',
    styleUrls: ['./crear-oferta.component.scss']
  })
export class CrearOfertaComponent implements OnInit {

    formDatosBasicos!: FormGroup;
    labels = commonMessages;

    constructor(
      ) {}
    
    ngOnInit(): void {
        
    }
    
    onSubmit(): void {
    
    }

}