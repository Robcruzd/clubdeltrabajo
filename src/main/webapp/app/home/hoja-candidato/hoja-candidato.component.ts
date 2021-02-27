import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionAcademicaService } from 'app/entities/informacion-academica/informacion-academica.service';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { InformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IPersona } from 'app/shared/model/persona.model';
import { IResultadoHojaCandidato } from 'app/shared/vo/opcion-vo';
import { PersonaService } from '../../entities/persona/persona.service';

@Component({
  selector: 'jhi-hoja-candidato',
  templateUrl: './hoja-candidato.component.html',
  styleUrls: ['./hoja-candidato.component.scss']
})
export class HojaCandidatoComponent implements OnInit {
  myValue1 = false;
  persona: any;

  model = 'Ninguno';
  idUsuario = 0;
  informacionPersonal = new InformacionPersonal();
  informacionAcademica = new InformacionAcademica();
  personaInfo! : IPersona | null;
  listaResultadoHojaCandidato: Array<IResultadoHojaCandidato> = [];

  constructor( private personaService: PersonaService,private route: ActivatedRoute,
    private informacionPersonalService: InformacionPersonalService,
    private informacionAcademicaService: InformacionAcademicaService ) { }


  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    this.getPersona();
  }

  getPersona(): void {
    this.listaResultadoHojaCandidato = [];
    this.personaService.find(this.idUsuario).subscribe(persona => {
      this.personaInfo = persona.body;
      if (this.personaInfo) {
        this.informacionPersonal.usuario = this.personaInfo;
        this.informacionAcademica.usuario = this.personaInfo;
        this.informacionPersonalService.listar(this.informacionPersonal).subscribe(info =>{
          this.informacionAcademicaService.listar(this.informacionAcademica).subscribe(academica=>{
            // academica.content.forEach(element => {
            //   element
            // });
            this.listaResultadoHojaCandidato.push({
              nombre: this.personaInfo?.nombre,
              profesion: info.content[0].profesion.profesion,
              descripcion: info.content[0].perfilProfesional
            })
          })
        })
      }
    });
  }

  guardarCambios(): void {
    // for (let x = 0; x < document.forms[0].estado.length; x++)
    // if (document.forms[0].estado[x].checked)
    // {
    //     alert("Tipo " + document.forms[0].estado[x].value + " seleccionado.");
    // }
  }
}
