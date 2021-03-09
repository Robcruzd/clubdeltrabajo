import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { InformacionAcademicaService } from 'app/entities/informacion-academica/informacion-academica.service';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { PersonaIdiomaService } from 'app/entities/persona-idioma/persona-idioma.service';
import { AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { IInformacionAcademica, InformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IPersona, Persona } from 'app/shared/model/persona.model';
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
  modelBandera = '';
  idUsuario = 0;
  idOFerta = 0;
  informacionPersonal = new InformacionPersonal();
  informacionAcademica = new InformacionAcademica();
  personaInfo!: IPersona | null;
  listaResultadoHojaCandidato: Array<IResultadoHojaCandidato> = [];
  listaInformacionAcademica: Array<IInformacionAcademica> = [];
  listaIdiomas: Array<any> = [];
  listaExperiencias: Array<any> = [];
  idAplicacionOferta: any;
  idUsuarioAplicacionOferta: any;
  idOfertaAplicacionOferta: any;
  aplicacionOFertaActualizar = new AplicacionOferta();
  fechaPostulacionAplicacionOferta: any;
  aspiranteSeleccionado = new Persona();

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private informacionPersonalService: InformacionPersonalService,
    private informacionAcademicaService: InformacionAcademicaService,
    private personaIdiomaService: PersonaIdiomaService,
    private informacionLaboralService: InformacionLaboralService,
    private aplicacionOfertaService: AplicacionOfertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    const param2 = this.route.snapshot.paramMap.get('oferta')!;
    this.idOFerta = parseInt(param2, 10);
    this.getPersona();
  }

  getPersona(): void {
    this.listaResultadoHojaCandidato = [];
    this.personaService.find(this.idUsuario).subscribe(persona => {
      this.personaInfo = persona.body;
      if (this.personaInfo) {
        this.informacionPersonal.usuario = this.personaInfo;
        this.informacionAcademica.usuario = this.personaInfo;
        this.informacionPersonalService.listar(this.informacionPersonal).subscribe(info => {
          this.informacionAcademicaService.listar(this.informacionAcademica).subscribe(academica => {
            this.listaInformacionAcademica = academica.content;
            this.personaIdiomaService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaFiltro => {
              this.listaIdiomas = personaFiltro;
            });
            this.informacionLaboralService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaLab => {
              this.listaExperiencias = personaLab;
            });
            this.aplicacionOfertaService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(aplicacionOferta => {
              this.idAplicacionOferta = aplicacionOferta[0].id;
              this.model = aplicacionOferta[0].estado;
              this.modelBandera = aplicacionOferta[0].estado;
              this.idUsuarioAplicacionOferta = aplicacionOferta[0].usuario;
              this.idOfertaAplicacionOferta = aplicacionOferta[0].oferta;
              this.fechaPostulacionAplicacionOferta = aplicacionOferta[0].fechaPostulacion;
            });
            this.listaResultadoHojaCandidato.push({
              nombre: this.personaInfo?.nombre,
              profesion: info.content[0].profesion.profesion,
              descripcion: info.content[0].perfilProfesional
            });
          });
        });
      }
    });
  }

  guardarCambios(): void {
    this.aplicacionOFertaActualizar.estado = this.model;
    this.aplicacionOFertaActualizar.id = this.idAplicacionOferta;
    this.aplicacionOFertaActualizar.usuario = this.idUsuarioAplicacionOferta;
    this.aplicacionOFertaActualizar.oferta = this.idOfertaAplicacionOferta;
    this.aplicacionOFertaActualizar.fechaPostulacion = this.fechaPostulacionAplicacionOferta;
    this.aplicacionOfertaService.update(this.aplicacionOFertaActualizar).subscribe(() => {});
    if (this.modelBandera !== this.model) {
      if (this.model === 'Seleccionado') {
        this.aspiranteSeleccionado.id = this.idUsuarioAplicacionOferta.id;
        this.personaService.seleccionadoAspirante(this.aspiranteSeleccionado).subscribe(() => {});
      }
    }
    this.router.navigate(['candidatos-seleccionados', { oferta: this.idOFerta }]);
  }

  volver(): void {
    this.router.navigate(['candidatos-oferta', { oferta: this.idOFerta }]);
  }
}
