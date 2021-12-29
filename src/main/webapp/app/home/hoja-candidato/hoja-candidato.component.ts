/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { InformacionAcademicaService } from 'app/entities/informacion-academica/informacion-academica.service';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { PersonaIdiomaService } from 'app/entities/persona-idioma/persona-idioma.service';
import { AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { IInformacionAcademica, InformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { IPersona, Persona } from 'app/shared/model/persona.model';
import { IResultadoHojaCandidato } from 'app/shared/vo/opcion-vo';
import * as moment from 'moment';
import { PersonaService } from '../../entities/persona/persona.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-hoja-candidato',
  templateUrl: './hoja-candidato.component.html',
  styleUrls: ['./hoja-candidato.component.scss']
})
export class HojaCandidatoComponent implements OnInit {
  cmHojaCandidato: any = null;
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
  apliOferResponseFiltro: any;
  aplicacionOferta = new AplicacionOferta();
  ofertaInfo!: IOferta | null;
  cargando = false;
  urlImageDefault?: string | ArrayBuffer | null | undefined = '../../../content/images/Image 28_M.png';
  tipoArchivo = TipoArchivo;
  geografia: Array<GeografiaVo> = [];
  municipios: Array<IOpcionVo> = [];

  Titulo = commonMessages.TITULO_LABEL;
  Estudios = commonMessages.ESTUDIOS;
  Idiomas = commonMessages.IDIOMAS_LABEL;
  Exp = commonMessages.EXPERIENCIA;
  Actualidad = commonMessages.ACTUALIDAD;
  Web_Club = commonMessages.WEB_CLUBDELTRABAJO;
  Estado = commonMessages.ESTADO_LABEL;
  Volver = commonMessages.VOLVER;
  Finalizar = commonMessages.FINALIZAR;

  constructor(
    private personaService: PersonaService,
    private ofertaService: OfertaService,
    private route: ActivatedRoute,
    private informacionPersonalService: InformacionPersonalService,
    private informacionAcademicaService: InformacionAcademicaService,
    private personaIdiomaService: PersonaIdiomaService,
    private informacionLaboralService: InformacionLaboralService,
    private aplicacionOfertaService: AplicacionOfertaService,
    private router: Router,
    private archivoService: ArchivoService,
    private regionService: RegionesService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    const param2 = this.route.snapshot.queryParamMap.get('oferta')!;
    this.idOFerta = parseInt(param2, 10);
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmHojaCandidata'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmHojaCandidato = mensajes;
          this.updateVariables();
          this.consultarInformacionGeografica();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmHojaCandidato = 0;
          this.consultarInformacionGeografica();
        }
      );
  }

  updateVariables(): void {
    this.Titulo = this.cmHojaCandidato.TITULO_LABEL;
    this.Estudios = this.cmHojaCandidato.ESTUDIOS;
    this.Idiomas = this.cmHojaCandidato.IDIOMAS_LABEL;
    this.Exp = this.cmHojaCandidato.EXPERIENCIA;
    this.Actualidad = this.cmHojaCandidato.ACTUALIDAD;
    this.Web_Club = this.cmHojaCandidato.WEB_CLUBDELTRABAJO;
    this.Estado = this.cmHojaCandidato.ESTADO_LABEL;
    this.Volver = this.cmHojaCandidato.VOLVER;
    this.Finalizar = this.cmHojaCandidato.FINALIZAR;
  }

  // consultarImagen(): void {
  //   this.archivoService.get(this.personaInfo?.id!, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
  //     if (response.body !== null) {
  //       this.imagen = response.body;
  //     }
  //   });
  // }

  getPersona(): void {
    this.listaResultadoHojaCandidato = [];
    this.ofertaService.find(this.idOFerta).subscribe(oferta => {
      this.ofertaInfo = oferta.body;
    });
    this.personaService.find(this.idUsuario).subscribe(persona => {
      this.personaInfo = persona.body;
      if (this.personaInfo) {
        this.informacionPersonal.usuario = this.personaInfo;
        this.informacionAcademica.usuario = this.personaInfo;
        // this.consultarImagen();
        this.informacionPersonalService.getPersonaFiltro(this.personaInfo?.id).subscribe(info => {
          this.informacionAcademicaService.getPersonaFiltro(this.personaInfo?.id).subscribe(academica => {
            this.listaInformacionAcademica = academica;
            this.personaIdiomaService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaFiltro => {
              this.listaIdiomas = personaFiltro;
            });
            this.informacionLaboralService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaLab => {
              this.listaExperiencias = personaLab;
            });
            this.aplicacionOfertaService
              .getByOfertaAndPersonaFiltro(this.ofertaInfo, this.informacionPersonal.usuario)
              .subscribe(aplicacionOferta => {
                this.idAplicacionOferta = aplicacionOferta[0].id;
                this.model = aplicacionOferta[0].estado;
                this.modelBandera = aplicacionOferta[0].estado;
                this.idUsuarioAplicacionOferta = aplicacionOferta[0].usuario;
                this.idOfertaAplicacionOferta = aplicacionOferta[0].oferta;
                this.fechaPostulacionAplicacionOferta = aplicacionOferta[0].fechaPostulacion;
              });
            this.archivoService.get(this.idUsuario, this.tipoArchivo.IMAGEN_PERFIL).subscribe(respImagen => {
              if (respImagen.body !== null) {
                this.urlImageDefault = respImagen.body.archivo;
              }
            });
            this.listaResultadoHojaCandidato.push({
              nombre: this.personaInfo?.nombre,
              apellido: this.personaInfo?.apellido,
              profesion: info.profesion.profesion,
              descripcion: info.perfilProfesional
            });
          });
        });
      }
    });
  }

  async guardarCambios(): Promise<any> {
    this.cargando = true;
    if (this.idAplicacionOferta) {
      this.aplicacionOFertaActualizar.estado = this.model;
      this.aplicacionOFertaActualizar.id = this.idAplicacionOferta;
      this.aplicacionOFertaActualizar.usuario = this.idUsuarioAplicacionOferta;
      this.aplicacionOFertaActualizar.oferta = this.idOfertaAplicacionOferta;
      this.aplicacionOFertaActualizar.fechaPostulacion = this.fechaPostulacionAplicacionOferta;
      await this.actualizarAplicacionOferta(this.aplicacionOFertaActualizar);
    } else {
      this.aplicacionOFertaActualizar.estado = this.model;
      this.aplicacionOFertaActualizar.id = this.idAplicacionOferta;
      this.aplicacionOFertaActualizar.usuario = this.personaInfo!;
      this.aplicacionOFertaActualizar.oferta = this.ofertaInfo!;
      this.aplicacionOFertaActualizar.fechaPostulacion = moment(new Date(), 'YYYY-MMM-DD').subtract(5, 'hours');
      await this.guardarAplicacionOferta(this.aplicacionOFertaActualizar);
    }
    if (this.modelBandera !== this.model) {
      if (this.model === 'Seleccionado') {
        this.aplicacionOfertaService
          .getByOfertaAndPersonaFiltro(this.idOfertaAplicacionOferta, this.idUsuarioAplicacionOferta)
          .subscribe(apliOferResponse => {
            this.apliOferResponseFiltro = apliOferResponse;
            if (this.apliOferResponseFiltro.length === 0) {
              this.aplicacionOferta.estado = this.model;
              this.aplicacionOferta.fechaPostulacion = moment(new Date(), 'YYYY-MMM-DD').subtract(5, 'hours');
              this.aplicacionOferta.oferta = this.idOfertaAplicacionOferta;
              this.aplicacionOferta.usuario = this.idUsuarioAplicacionOferta;
            }
            this.aspiranteSeleccionado.id = this.idUsuarioAplicacionOferta.id;
            this.personaService.seleccionadoAspirante(this.aspiranteSeleccionado).subscribe(() => {});
          });
      }
    }
    setTimeout(() => {
      this.router.navigate(['candidatos-seleccionados'], { queryParams: { oferta: this.idOFerta } });
    }, 500);
  }

  volver(): void {
    this.router.navigate(['candidatos-seleccionados'], { queryParams: { oferta: this.idOFerta } });
  }

  actualizarAplicacionOferta(datos: any): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.update(datos).subscribe(() => {
        resolve('hecho');
      });
    });
  }
  guardarAplicacionOferta(datos: any): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.create(datos).subscribe(() => {
        resolve('hecho');
      });
    });
  }

  getCiudad(codigo: string): string {
    const ciudad = this.municipios.find(item => item.codigo === codigo);
    return ciudad?.nombre || '';
  }

  private cargarMunicipios(): void {
    this.municipios = this.geografia.map(item => {
      return {
        codigo: item.codigoMpio,
        nombre: item.nombreMpio
      };
    });
    this.getPersona();
  }

  consultarInformacionGeografica(): void {
    this.regionService
      .query({
        page: 0,
        size: 1150
      })
      .subscribe((res: HttpResponse<IRegiones[]>) => {
        this.geografia = res.body!.map(
          item =>
            new GeografiaVo(
              item.codigoDaneDelDepartamento?.toString()!,
              item.departamento!,
              item.codigoDaneDelMunicipio?.toString()!,
              item.municipio!
            )
        );
        this.cargarMunicipios();
      });
  }
}
