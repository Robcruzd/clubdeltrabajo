import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
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
import { ArchivoService } from '../../entities/archivo/archivo.service';
import { PersonaService } from '../../entities/persona/persona.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';

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
  apliOferResponseFiltro: any;
  aplicacionOferta = new AplicacionOferta();
  ofertaInfo!: IOferta | null;
  cargando = false;
  urlImageDefault?: string | ArrayBuffer | null | undefined = "../../../content/images/Image 28_M.png";
  tipoArchivo = TipoArchivo;
  geografia: Array<GeografiaVo> = [];
  municipios: Array<IOpcionVo> = [];

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
    private regionService: RegionesService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    const param2 = this.route.snapshot.queryParamMap.get('oferta')!;
    this.idOFerta = parseInt(param2, 10);
    this.consultarInformacionGeografica();
  }

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
        this.informacionPersonalService.getPersonaFiltro(this.personaInfo?.id).subscribe(info => {
          this.informacionAcademicaService.getPersonaFiltro(this.personaInfo?.id).subscribe(academica => {
            this.listaInformacionAcademica = academica;
            this.personaIdiomaService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaFiltro => {
              this.listaIdiomas = personaFiltro;
            });
            this.informacionLaboralService.getPersonaFiltro(this.informacionPersonal.usuario).subscribe(personaLab => {
              this.listaExperiencias = personaLab;
            });
            this.aplicacionOfertaService.getByOfertaAndPersonaFiltro(this.ofertaInfo,this.informacionPersonal.usuario).subscribe(aplicacionOferta => {
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
