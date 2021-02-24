import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IPersona, Persona } from 'app/shared/model/persona.model';
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
  idUsuario = 0;
  informacionPersonal = new InformacionPersonal();
  personaInfo! : IPersona | null;

  constructor( private personaService: PersonaService,private route: ActivatedRoute,
    private informacionPersonalService: InformacionPersonalService ) { }


  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    this.getPersona(this.idUsuario);
  }

  getPersona(id:any): void{
    this.personaService.find(this.idUsuario).subscribe(persona =>{
      this.personaInfo = persona.body;
      if(this.personaInfo){
        this.informacionPersonal.usuario = this.personaInfo;
        this.informacionPersonalService.listar(this.informacionPersonal).subscribe(info =>{
        })
      }
    })
  }

  guardarCambios(): void{
    // for (let x = 0; x < document.forms[0].estado.length; x++)
    // if (document.forms[0].estado[x].checked)
    // {
    //     alert("Tipo " + document.forms[0].estado[x].value + " seleccionado.");
        
    // }
  }

}
