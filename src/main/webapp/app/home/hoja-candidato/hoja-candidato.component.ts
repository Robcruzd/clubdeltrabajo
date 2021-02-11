import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../entities/persona/persona.service';

@Component({
  selector: 'jhi-hoja-candidato',
  templateUrl: './hoja-candidato.component.html',
  styleUrls: ['./hoja-candidato.component.scss']
})
export class HojaCandidatoComponent implements OnInit {

  myValue1= false;
  persona: any;

  model = "Ninguno";

  constructor( private personaService: PersonaService ) { }


  ngOnInit(): void {
   
  }

}
