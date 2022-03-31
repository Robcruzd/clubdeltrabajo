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
import { BdEmpresaService } from 'app/shared/services/bd-empresa.service';
import { BdEmpresa } from 'app/shared/model/bd-empresa.model';
import { AccountService } from 'app/core/auth/account.service';
import { User } from 'app/core/user/user.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { IEmpresa } from 'app/shared/model/empresa.model';

declare let alertify: any;

@Component({
  selector: 'jhi-hoja-candidato',
  templateUrl: './hoja-candidato.component.html',
  styleUrls: ['./hoja-candidato.component.scss']
})
export class HojaCandidatoComponent implements OnInit {
  cmHojaCandidato: any = null;
  myValue1 = false;
  persona: any;

  model = 'Archivar';
  modelBandera = '';
  idUsuario = 0;
  idOFerta = 0;
  informacionPersonal = new InformacionPersonal();
  informacionAcademica = new InformacionAcademica();
  personaInfo!: IPersona | null | undefined;
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
  bdEmpresa = new BdEmpresa();
  usuario!: User | null;
  empresaInfo!: IEmpresa | null | undefined;

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
    private commonMessagesService: CommonMessagesService,
    private bdEmpresaService: BdEmpresaService,
    private accountService: AccountService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('usuario')!;
    this.idUsuario = parseInt(param, 10);
    const param2 = this.route.snapshot.queryParamMap.get('oferta')!;
    this.idOFerta = parseInt(param2, 10);
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
    });

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
    this.empresaService.find(this.usuario?.userEmpresa).subscribe(empresa => {
      this.empresaInfo = empresa.body;
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
                if (!aplicacionOferta[0].estado || aplicacionOferta[0].estado === 'Ninguno') {
                  this.model = 'Archivar';
                } else {
                  this.model = aplicacionOferta[0].estado;
                }
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
        const mensaje =
          'club del trabajo le informa que ha Sido seleccionado y está en verificacion del cargo al cual aplicaste o eres apto';
        this.aplicacionOfertaService
          .getByOfertaAndPersonaFiltro(this.idOfertaAplicacionOferta, this.idUsuarioAplicacionOferta)
          .subscribe(apliOferResponse => {
            if (this.usuario?.userEmpresa)
              // this.bdEmpresaService.getBdEmpresaByIdUsuarioAndEmpresa(this.idUsuario,this.usuario?.userEmpresa).subscribe(aspirante => {
              //   /* eslint-disable no-console */
              //   console.log('aspirante:', aspirante);
              //   if(aspirante.size === 1){
              //     /* eslint-disable no-console */
              //     console.log('entroooo');
              //   }
              // });
              this.personaService.enviarEmailAspirante(this.idUsuario, mensaje).subscribe(() => {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Email enviado correctamente!');
              });
            if (this.idAplicacionOferta) {
              this.aplicacionOFertaActualizar.estado = this.model;
              this.aplicacionOFertaActualizar.id = this.idAplicacionOferta;
              this.aplicacionOFertaActualizar.usuario = this.idUsuarioAplicacionOferta;
              this.aplicacionOFertaActualizar.oferta = this.idOfertaAplicacionOferta;
              this.aplicacionOFertaActualizar.fechaPostulacion = this.fechaPostulacionAplicacionOferta;
              this.actualizarAplicacionOferta(this.aplicacionOFertaActualizar);
            } else {
              this.aplicacionOFertaActualizar.estado = this.model;
              this.aplicacionOFertaActualizar.id = this.idAplicacionOferta;
              this.aplicacionOFertaActualizar.usuario = this.personaInfo!;
              this.aplicacionOFertaActualizar.oferta = this.ofertaInfo!;
              this.aplicacionOFertaActualizar.fechaPostulacion = moment(new Date(), 'YYYY-MMM-DD').subtract(5, 'hours');
              this.guardarAplicacionOferta(this.aplicacionOFertaActualizar);
            }
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
      } else if (this.model === 'Archivar') {
        if (this.empresaInfo?.bdEmpresa === true) {
          if (this.personaInfo) this.bdEmpresa.usuario = this.personaInfo;
          if (this.empresaInfo) this.bdEmpresa.empresa = this.empresaInfo;
          this.bdEmpresaService.create(this.bdEmpresa).subscribe(() => {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Aspirante archivado correctamente!');
          });
        } else {
          this.cargando = false;
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('No cuenta con la membresia para tener su base de datos!. Debe contratar un plan!');
          return;
        }
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
