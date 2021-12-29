/* eslint-disable @typescript-eslint/camelcase */
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faStar,
  faAddressCard,
  faEllipsisH,
  faCommentDots,
  faUserCircle,
  faCheck,
  faTimes,
  faPaperPlane,
  faArrowDown,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Group, pdf } from '@progress/kendo-drawing';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { PersonaService } from 'app/entities/persona/persona.service';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { Archivo } from 'app/shared/model/archivo.model';
import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { Persona } from 'app/shared/model/persona.model';
import { IProfesion } from 'app/shared/model/profesion.model';
import { IRegiones } from 'app/shared/model/regiones.model';
import { HojaVidaService } from 'app/shared/services/hoja-vida.service';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { HojaVidaVo } from 'app/shared/vo/hoja-vida-vo';
import { IOpcionVo, IResultadoBusquedaAspirantes, IResultadoOfertas } from 'app/shared/vo/opcion-vo';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { AccountService } from '../../core/auth/account.service';
import { User } from '../../core/user/user.model';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import Swal from 'sweetalert2';
import { Empresa } from 'app/shared/model/empresa.model';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
// import { CONNREFUSED } from 'dns';

const { exportPDF } = pdf;
declare let alertify: any;

@Component({
  selector: 'jhi-candidatos-seleccionados',
  templateUrl: './candidatos-seleccionados.component.html',
  styleUrls: ['./candidatos-seleccionados.component.scss']
})
export class CandidatosSeleccionadosComponent implements OnInit {
  @ViewChild('pdf') pdfExport: any;
  @ViewChild('searchInput') searchInput: any;

  cmCandidatosSel: any = null;
  public page = 1;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faCheck = faCheck;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faArrowDown = faArrowDown;
  faSearch = faSearch;
  imagen!: Archivo;
  urlImgDefault = '';
  faUserCircle = faUserCircle;

  estado = 'Seleccionado';

  backcolor = '';
  btnestado = true;
  verh = false;
  verche = false;
  verno = false;

  generoValue: any = null;
  salarioValue: any = null;
  experienciaValue: any = null;
  municipioValue: any = null;
  edadValue: any = null;
  listaResultadoBusquedaAspirantes: Array<IResultadoBusquedaAspirantes> = [];
  listaResultadoOfertas: Array<IResultadoOfertas> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  resultadoBusqueda: Array<IInformacionPersonal> = [];
  totalAspirantes = 0;
  idOferta = 0;
  oferta!: IOferta | null;
  mostrar = true;
  pdfHojaVida64RenderDescarga: any;
  pdfGeneradoHojaVida: Archivo = new Archivo();
  hojaVidaVo!: HojaVidaVo | null;
  pdfHojaVida64: any;
  showElement = false;
  urlImageDefault = '../../../content/images/Image 28_M.png';
  archivos!: Array<Archivo> | undefined;
  listaAplicacionOferta: Array<IAplicacionOferta> | null = [];
  aspiranteSeleccionado = new Persona();
  valorBusqueda = '';
  profesionesFiltro: Array<IProfesion> | null = [];
  mensajeEmail = '';
  aplicacionOferta: any;
  usuario!: User | null;
  filtrosOn = false;
  showBtnArriba = false;

  labels = commonMessages;
  nivelIdioma: Array<IOpcionVo> = commonMessages.ARRAY_NIVEL_IDIOMA;
  estadoNivelEstudio: IOpcionVo[] = commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
  Crear_Oferta = commonMessages.CREAR_OFERTA;
  Editar_perfil = commonMessages.EDITAR_PERFIL;
  Club_empresas = commonMessages.CLUB_DE_EMPRESAS;
  Controla_ofertas = commonMessages.CONTROLA_TUS_OFERTAS;
  Membresia = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  Oferta = commonMessages.OFERTA;
  Titulo = commonMessages.TITULO_LABEL;
  Tipo_Contrato = commonMessages.TIPO_CONTRATO;
  Publicado = commonMessages.PUBLICADO;
  Experiencia = commonMessages.EXPERIENCIA;
  Ciudad = commonMessages.CIUDAD_LABEL;
  Salario = commonMessages.SALARIO;
  Perfiles_Aspirantes = commonMessages.PERFILES_ASPIRANTES;
  Perfiles = commonMessages.PERFILES;
  Edad = commonMessages.EDAD;
  Genero = commonMessages.GENERO;
  Masculino = commonMessages.MASCULINO_LABEL;
  Femenino = commonMessages.FEMENINO_LABEL;
  Ocultar_filtros = commonMessages.OCULTAR_FILTROS;
  Ver_filtros = commonMessages.VER_FILTROS;
  Fecha_Postulacion = commonMessages.FECHA_POSTULACION;
  VER_HV = commonMessages.VER_HV;
  Seleccionado = commonMessages.SELECCIONADO;
  Descartado = commonMessages.DESCARTADO;
  Descargar_HV = commonMessages.DESCARGAR_HV;
  Enviar_Mail = commonMessages.ENVIAR_MAIL;
  SOBRE_MI = commonMessages.SOBRE_MI;
  CONTACTO = commonMessages.CONTACTO;
  EXPERIENCIA_PROFESIONAL = commonMessages.EXPERIENCIA_PROFESIONAL;
  Actualidad = commonMessages.ACTUALIDAD;
  Formacion = commonMessages.FORMACION;

  archivoBase64: any;
  persona!: number;
  personaDatos!: Persona | null;
  archivoHv!: Archivo;
  empresaUpdate!: Empresa | null;

  constructor(
    private router: Router,
    private informacionPersonalService: InformacionPersonalService,
    private regionService: RegionesService,
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private aplicacionOfertaService: AplicacionOfertaService,
    private hojaVidaService: HojaVidaService,
    private personaService: PersonaService,
    private profesionService: ProfesionService,
    private archivoService: ArchivoService,
    private accountService: AccountService,
    private empresaService: EmpresaService,
    private commonMessagesService: CommonMessagesService
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    this.backColor();
    const param = this.route.snapshot.queryParamMap.get('oferta')!;
    this.idOferta = parseInt(param, 10);
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmCandidatosSeleccionados'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmCandidatosSel = mensajes;
          this.updateVariables();
          this.getOFerta(this.idOferta);
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmCandidatosSel = 0;
          this.getOFerta(this.idOferta);
        }
      );

    if (window.screen.width <= 900) {
      this.showBtnArriba = true;
      this.filtrosOn = true;
    }

    if (window.screen.width >= 900) {
      this.showBtnArriba = false;
      this.filtrosOn = false;
    }
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
      this.persona = this.usuario?.user || 0;
    });
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.labels = this.cmCandidatosSel;
    this.nivelIdioma = commonData.ARRAY_NIVEL_IDIOMA;
    this.estadoNivelEstudio = commonData.ARRAY_ESTADO_NIVEL_ESTUDIO;
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.experienciasLaborales = commonData.ARRAY_EXPERIENCIA_LABORAL;
    this.tiposContrato = commonData.ARRAY_TIPO_CONTRATO;
    this.edades = commonData.ARRAY_EDAD;
    this.Crear_Oferta = this.cmCandidatosSel.CREAR_OFERTA;
    this.Editar_perfil = this.cmCandidatosSel.EDITAR_PERFIL;
    this.Controla_ofertas = this.cmCandidatosSel.CONTROLA_TUS_OFERTAS;
    this.Oferta = this.cmCandidatosSel.OFERTA;
    this.Titulo = this.cmCandidatosSel.TITULO_LABEL;
    this.Tipo_Contrato = this.cmCandidatosSel.TIPO_CONTRATO;
    this.Publicado = this.cmCandidatosSel.PUBLICADO;
    this.Experiencia = this.cmCandidatosSel.EXPERIENCIA;
    this.Ciudad = this.cmCandidatosSel.CIUDAD_LABEL;
    this.Salario = this.cmCandidatosSel.SALARIO;
    this.Perfiles_Aspirantes = this.cmCandidatosSel.PERFILES_ASPIRANTES;
    this.Perfiles = this.cmCandidatosSel.PERFILES;
    this.Edad = this.cmCandidatosSel.EDAD;
    this.Genero = this.cmCandidatosSel.GENERO;
    this.Masculino = this.cmCandidatosSel.MASCULINO_LABEL;
    this.Femenino = this.cmCandidatosSel.FEMENINO_LABEL;
    this.Ocultar_filtros = this.cmCandidatosSel.OCULTAR_FILTROS;
    this.Ver_filtros = this.cmCandidatosSel.VER_FILTROS;
    this.Fecha_Postulacion = this.cmCandidatosSel.FECHA_POSTULACION;
    this.VER_HV = this.cmCandidatosSel.VER_HV;
    this.Seleccionado = this.cmCandidatosSel.SELECCIONADO;
    this.Descartado = this.cmCandidatosSel.DESCARTADO;
    this.Descargar_HV = this.cmCandidatosSel.DESCARGAR_HV;
    this.Enviar_Mail = this.cmCandidatosSel.ENVIAR_MAIL;
    this.SOBRE_MI = this.cmCandidatosSel.SOBRE_MI;
    this.CONTACTO = this.cmCandidatosSel.CONTACTO;
    this.EXPERIENCIA_PROFESIONAL = this.cmCandidatosSel.EXPERIENCIA_PROFESIONAL;
    this.Actualidad = this.cmCandidatosSel.ACTUALIDAD;
    this.Formacion = this.cmCandidatosSel.FORMACION;
  }

  getOFerta(id: number): void {
    this.listaResultadoOfertas = [];
    this.ofertaService.find(id).subscribe(response => {
      this.oferta = response.body;
      const tipoContratoDB = this.tiposContrato.find(tipo => tipo.codigo === this.oferta?.tipoContrato);
      const experienciaDB = this.experienciasLaborales.find(item => item.codigo === this.oferta?.experiencia?.toString());
      const ciudadDB = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.oferta?.ciudad?.toString());
      const aspiracionDB = this.aspiracionesSalariales.find(item => item.codigo === this.oferta?.salario);
      this.listaResultadoOfertas.push({
        titulo: this.oferta?.titulo,
        descripcion: this.oferta?.descripcion,
        tipoContrato: tipoContratoDB?.nombre,
        publicado: this.oferta?.fechaPublicacion?.format('YYYY-MM-DD'),
        experiencia: experienciaDB?.nombre,
        ciudad: ciudadDB?.nombre,
        salario: aspiracionDB?.nombre
      });
      this.cargarAspirantesInit();
    });
  }

  juridica(): void {
    this.empresaService.find(this.usuario?.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.juridica === true &&
        this.empresaUpdate?.juridica !== undefined
      ) {
        this.router.navigate(['asesoria-juridica']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
    });
  }

  traerCiudad(): void {
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
        this.cargarMunicipiosPersonal();
      });
  }

  cargarMunicipiosPersonal(): void {
    this.municipiosPersonal = [];
    this.municipiosPersonal = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
  }

  async cargarAspirantes(): Promise<any> {
    this.listaResultadoBusquedaAspirantes = [];
    if (this.valorBusqueda === '') {
      if (this.listaAplicacionOferta) {
        for (let i = 0; i < this.listaAplicacionOferta.length; i++) {
          const params = new InformacionPersonal();
          params.usuarioId = this.listaAplicacionOferta[i].usuario?.id;
          params.genero = this.generoValue;
          params.aspiracionSalarial = this.salarioValue;
          params.ciudad = this.municipioValue;
          this.resultadoBusqueda = await this.obtenerInformacionPersonal(params);
          if (this.resultadoBusqueda) {
            // eslint-disable-next-line no-console
            console.log(this.resultadoBusqueda);
            this.resultadoBusqueda.forEach(element => {
              let postulacionBD = '';
              let colorApirante = '';
              const edadBD = this.obtenerEdad(element);
              const experienciaBD = this.obtenerExperiencia(element);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
              const edadEncontrada = this.validarEdadSeleccionada(edadBD);
              const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
              this.aplicacionOfertaService.getPersonaFiltro(element.usuario).subscribe(aplicacionOferta => {
                /* eslint-disable no-console */
                console.log('1----------', aplicacionOferta);
                colorApirante = this.backColor(aplicacionOferta[0].estado);
                postulacionBD = aplicacionOferta[0].fechaPostulacion;
              });
              if (edadEncontrada && experienciaEncontrada) {
                setTimeout(() => {
                  this.listaResultadoBusquedaAspirantes.push({
                    nombre: element.usuario?.nombre,
                    apellido: element.usuario?.apellido,
                    profesion: element.profesion?.profesion,
                    edad: edadBD,
                    ciudad: ciudadBD?.nombre,
                    experiencia: experienciaBD,
                    titulo: element.profesion?.profesion,
                    fechaPostulacion: postulacionBD,
                    idPersona: element.usuario?.id,
                    idOferta: 1,
                    color: colorApirante,
                    verche: this.verche,
                    verh: this.verh,
                    verno: this.verno,
                    btnestado: this.btnestado
                  });
                  this.totalAspirantes = this.listaResultadoBusquedaAspirantes.length;
                }, 200);
              }
            });
          }
        }
      }
    } else {
      this.listaResultadoBusquedaAspirantes = [];
      this.profesionesFiltro = await this.obtenerProfesiones(this.valorBusqueda);
      if (this.profesionesFiltro) {
        for (let i = 0; i < this.profesionesFiltro.length; i++) {
          const params = new InformacionPersonal();
          params.genero = this.generoValue;
          params.aspiracionSalarial = this.salarioValue;
          params.ciudad = this.municipioValue;
          params.profesionId = this.profesionesFiltro[i].id;
          this.resultadoBusqueda = await this.obtenerInformacionPersonal(params);
          if (this.resultadoBusqueda) {
            // eslint-disable-next-line no-console
            console.log(this.resultadoBusqueda);
            for (let j = 0; j < this.resultadoBusqueda.length; j++) {
              let postulacionBD = '';
              let colorApirante = '';
              const edadBD = this.obtenerEdad(this.resultadoBusqueda[j]);
              const experienciaBD = this.obtenerExperiencia(this.resultadoBusqueda[j]);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.resultadoBusqueda[j].ciudad?.toString());
              const edadEncontrada = this.validarEdadSeleccionada(edadBD);
              const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
              this.aplicacionOferta = await this.obetenerPersonaFiltro(this.resultadoBusqueda[j].usuario);
              /* eslint-disable no-console */
              console.log('2----------', this.aplicacionOferta[j]);
              if (this.aplicacionOferta[0]) {
                colorApirante = this.backColor(this.aplicacionOferta[0].estado);
                postulacionBD = this.aplicacionOferta[0].fechaPostulacion;
              } else {
                colorApirante = this.backColor('Ninguno');
                postulacionBD = 'sin definir';
              }
              if (edadEncontrada && experienciaEncontrada) {
                this.listaResultadoBusquedaAspirantes.push({
                  nombre: this.resultadoBusqueda[j].usuario?.nombre,
                  apellido: this.resultadoBusqueda[j].usuario?.apellido,
                  profesion: this.resultadoBusqueda[j].profesion?.profesion,
                  edad: edadBD,
                  ciudad: ciudadBD?.nombre,
                  experiencia: experienciaBD,
                  titulo: this.resultadoBusqueda[j].profesion?.profesion,
                  fechaPostulacion: postulacionBD,
                  idPersona: this.resultadoBusqueda[j].usuario?.id,
                  idOferta: 1,
                  color: colorApirante,
                  verche: this.verche,
                  verh: this.verh,
                  verno: this.verno,
                  btnestado: this.btnestado
                });
                this.totalAspirantes = this.listaResultadoBusquedaAspirantes.length;
              }
            }
          }
        }
      }
    }
  }

  obetenerPersonaFiltro(valor: any): Promise<any> {
    /* eslint-disable no-console */
    console.log('obttt----------', valor);
    return new Promise(resolve => {
      this.aplicacionOfertaService.getPersonaFiltro(valor).subscribe(aplicacionOferta => {
        /* eslint-disable no-console */
        console.log('aaappp----------', aplicacionOferta);
        resolve(aplicacionOferta);
      });
    });
  }

  obtenerProfesiones(valor: any): Promise<any> {
    return new Promise(resolve => {
      this.profesionService.getByProfesion(valor).subscribe(profesionResponse => {
        resolve(profesionResponse);
      });
    });
  }

  obtenerInformacionPersonal(params: any): Promise<any> {
    return new Promise(resolve => {
      this.informacionPersonalService.listar(params).subscribe(response => {
        resolve(response.content);
      });
    });
  }

  async cargarAspirantesInit(): Promise<any> {
    this.listaResultadoBusquedaAspirantes = [];
    await this.ofertaFiltro();
    if (this.listaAplicacionOferta) {
      for (let i = 0; i < this.listaAplicacionOferta?.length; i++) {
        const params = new InformacionPersonal();
        params.usuarioId = this.listaAplicacionOferta[i].usuario?.id;
        await this.obtenerPersonaInfo(params, this.listaAplicacionOferta[i].oferta);
      }
    }
  }

  ofertaFiltro(): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.getOfertaFiltro(this.oferta).subscribe(listaOfeApli => {
        this.listaAplicacionOferta = listaOfeApli;
        resolve(listaOfeApli);
      });
    });
  }

  consultarImagen(): void {
    this.archivoService.get(0, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  obtenerPersonaInfo(params: any, ofer: any): Promise<any> {
    this.resultadoBusqueda = [];
    return new Promise(resolve => {
      this.informacionPersonalService.listar(params).subscribe(response => {
        this.resultadoBusqueda = response.content;
        if (this.resultadoBusqueda) {
          // eslint-disable-next-line no-console
          console.log(this.resultadoBusqueda);
          let postulacionBD = '';
          let colorApirante = '';
          let imagenn: string | ArrayBuffer | null | undefined = undefined;
          this.aplicacionOfertaService.getByOfertaAndPersonaFiltro(ofer, this.resultadoBusqueda[0].usuario).subscribe(aplicacionOferta => {
            /* eslint-disable no-console */
            console.log('3----------', aplicacionOferta[0]);
            colorApirante = this.backColor(aplicacionOferta[0].estado);
            postulacionBD = aplicacionOferta[0].fechaPostulacion;
            console.log(aplicacionOferta);
          });
          this.archivoService.get(this.resultadoBusqueda[0].usuario?.id!, TipoArchivo.IMAGEN_PERFIL).subscribe(respImagen => {
            if (respImagen.body !== null) {
              // eslint-disable-next-line no-console
              console.log(respImagen);
              imagenn = respImagen.body.archivo;
            }
          });
          const edadBD = this.obtenerEdad(this.resultadoBusqueda[0]);
          const experienciaBD = this.obtenerExperiencia(this.resultadoBusqueda[0]);
          const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === response.content[0].ciudad?.toString());
          setTimeout(() => {
            this.listaResultadoBusquedaAspirantes.push({
              nombre: response.content[0].usuario?.nombre,
              apellido: response.content[0].usuario?.apellido,
              profesion: response.content[0].profesion?.profesion,
              edad: edadBD,
              ciudad: ciudadBD?.nombre,
              experiencia: experienciaBD,
              titulo: response.content[0].profesion?.profesion,
              fechaPostulacion: postulacionBD,
              idPersona: response.content[0].usuario?.id,
              idOferta: ofer.id,
              color: colorApirante,
              verche: this.verche,
              verh: this.verh,
              verno: this.verno,
              btnestado: this.btnestado,
              imagen: imagenn
            });
            this.totalAspirantes = this.listaResultadoBusquedaAspirantes.length;
            resolve(true);
          }, 200);
        }
      });
    });
  }

  validarExperienciaSeleccionada(experiencia: string): boolean {
    let experienciaReturn = false;
    if (this.experienciaValue === null) {
      experienciaReturn = true;
    } else if (this.experienciaValue === '1') {
      if (this.experienciasLaborales[0].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '2') {
      if (this.experienciasLaborales[1].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '3') {
      if (this.experienciasLaborales[2].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '4') {
      if (this.experienciasLaborales[3].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '5') {
      if (this.experienciasLaborales[4].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '6') {
      if (this.experienciasLaborales[5].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '7') {
      if (this.experienciasLaborales[6].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '8') {
      if (this.experienciasLaborales[7].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '9') {
      if (this.experienciasLaborales[8].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '10') {
      if (this.experienciasLaborales[9].nombre === experiencia) {
        experienciaReturn = true;
      }
    }
    return experienciaReturn;
  }

  validarEdadSeleccionada(edad: number): boolean {
    let edadReturn = false;
    if (this.edadValue === null) {
      edadReturn = true;
    } else if (this.edadValue === 1) {
      if (edad >= 14 && edad < 18) {
        edadReturn = true;
      }
    } else if (this.edadValue === 2) {
      if (edad >= 19 && edad <= 25) {
        edadReturn = true;
      }
    } else if (this.edadValue === 3) {
      if (edad >= 26 && edad <= 30) {
        edadReturn = true;
      }
    } else if (this.edadValue === 4) {
      if (edad >= 31 && edad <= 40) {
        edadReturn = true;
      }
    } else if (this.edadValue === 5) {
      if (edad >= 41 && edad <= 60) {
        edadReturn = true;
      }
    } else if (this.edadValue === 6) {
      if (edad > 60) {
        edadReturn = true;
      }
    }
    return edadReturn;
  }

  obtenerEdad(element: any): number {
    const hoy = new Date();
    let edad = 0;
    if (element !== undefined && element.fechaNacimiento !== undefined) {
      const fechaBandera = element.fechaNacimiento?.toString();
      const fechaDate = Date.parse(fechaBandera);
      const cumpleanos = new Date(fechaDate);
      edad = hoy.getFullYear() - cumpleanos.getFullYear();
      const m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
    }
    return edad;
  }

  obtenerExperiencia(element: any): string {
    let resultado = '';
    if (element.anioExperiencia == null && element.mesExperiencia == null) {
      resultado = this.experienciasLaborales[0].nombre;
    }
    if (element.anioExperiencia == null && element.mesExperiencia > 0) {
      resultado = this.experienciasLaborales[1].nombre;
    }
    if (element.anioExperiencia >= 1 && element.anioExperiencia < 2) {
      resultado = this.experienciasLaborales[2].nombre;
    }
    if (element.anioExperiencia >= 2 && element.anioExperiencia < 3) {
      resultado = this.experienciasLaborales[3].nombre;
    }
    if (element.anioExperiencia >= 3 && element.anioExperiencia < 4) {
      resultado = this.experienciasLaborales[4].nombre;
    }
    if (element.anioExperiencia >= 4 && element.anioExperiencia < 5) {
      resultado = this.experienciasLaborales[5].nombre;
    }
    if (element.anioExperiencia >= 5 && element.anioExperiencia < 7) {
      resultado = this.experienciasLaborales[6].nombre;
    }
    if (element.anioExperiencia >= 7 && element.anioExperiencia < 10) {
      resultado = this.experienciasLaborales[7].nombre;
    }
    if (element.anioExperiencia >= 10 && element.anioExperiencia < 15) {
      resultado = this.experienciasLaborales[8].nombre;
    }
    if (element.anioExperiencia >= 15) {
      resultado = this.experienciasLaborales[9].nombre;
    }
    return resultado;
  }

  volverOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  verOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }

  clubEmpresas(): void {
    this.empresaService.find(this.usuario?.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.membresia === true &&
        this.empresaUpdate?.membresia !== undefined
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  verAspirante(item: any): void {
    this.empresaService.find(this.usuario?.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.visualizacionesHv !== 0 &&
        this.empresaUpdate?.visualizacionesHv !== null
      ) {
        const valor = this.empresaUpdate?.visualizacionesHv;
        if (valor !== undefined && this.empresaUpdate !== null && this.empresaUpdate.visualizacionesHv !== 999) {
          this.empresaUpdate.visualizacionesHv = valor - 1;
          this.empresaService.update(this.empresaUpdate).subscribe(() => {});
        }
        this.router.navigate(['hoja-candidato'], { queryParams: { usuario: item.idPersona, oferta: this.idOferta } });
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con visualizaciones disponibles!. Debe contratar un plan!');
      }
    });
  }

  backColor(estado?: any): string {
    /* eslint-disable no-console */
    console.log('4----------', estado);
    if (estado === 'Descartado') {
      this.backcolor = '#FFC1C1';
      this.btnestado = false;
      this.verno = true;
      this.verche = false;
      this.verh = false;
    }
    if (estado === 'Seleccionado') {
      this.backcolor = '#BAFFE3';
      this.btnestado = true;
      this.verche = true;
      this.verno = false;
      this.verh = false;
    }
    if (estado === 'Ninguno') {
      this.backcolor = '#EFEFEF';
      this.btnestado = false;
      this.verh = true;
      this.verche = false;
      this.verno = false;
    }
    return this.backcolor;
  }

  descargarPDF(): void {
    this.empresaService.find(this.usuario?.userEmpresa).subscribe(response => {
      if (response.body !== null) {
        const empresaValidada = response.body;
        if (empresaValidada?.descargasHv !== 0) {
          saveAs(this.pdfHojaVida64RenderDescarga, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
          const numero = empresaValidada.descargasHv;
          if (numero !== undefined) {
            empresaValidada.descargasHv = numero - 1;
            this.empresaService.update(empresaValidada).subscribe(() => {});
          }
        } else {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('No cuenta con descargas disponibles!. Debe contratar un plan!');
        }
      }
    });
  }

  async visualizarArchivoPDF(): Promise<any> {
    const data64 = await this.generarPdf();
    this.showElement = false;
    this.pdfGeneradoHojaVida.nombre = 'CV' + this.hojaVidaVo?.persona.nombre + this.hojaVidaVo?.persona.apellido + '.pdf';
    this.pdfGeneradoHojaVida.extension = 'pdf';
    this.pdfGeneradoHojaVida.usuario = this.hojaVidaVo?.persona;
    this.pdfGeneradoHojaVida.tipo = 100;
    this.pdfGeneradoHojaVida.archivo = 'data:application/pdf;base64,' + data64;
    this.hojaVidaService.createPDFHojaVida(this.pdfGeneradoHojaVida).subscribe((response: any) => {
      const archivo = response.body;
      this.pdfHojaVida64RenderDescarga = archivo.archivo;
      this.descargarPDF();
      this.generarHvComoArchivo(archivo.archivo, data64, this.pdfGeneradoHojaVida.nombre);
    });
  }

  generarHvComoArchivo(archivo: any, data: any, nombre: any): void {
    this.personaService.find(this.persona).subscribe(response => {
      this.personaDatos = response.body;
      if (this.personaDatos?.estadohv === true) {
        if (this.personaDatos !== null) {
          this.personaDatos.estadohv = false;
          this.personaService.update(this.personaDatos).subscribe(() => {
            this.cargarArchivoHv(archivo, this.personaDatos, nombre);
          });
        }
      }
    });
  }

  cargarArchivoHv(archivo: any, persona: any, nombre: any): void {
    this.archivoHv = this.archivoHv || new Archivo();
    this.archivoHv.tipo = TipoArchivo.ARCHIVO_HV;
    this.archivoHv.nombre = nombre;
    this.archivoHv.extension = 'pdf';
    this.archivoHv.usuario = persona;
    this.archivoHv.archivo = archivo;
    if (this.archivoHv.id !== undefined) {
      this.archivoService.update(this.archivoHv).subscribe(() => {});
    } else {
      this.archivoService.create(this.archivoHv).subscribe(() => {});
    }
  }

  generarPdf(): Promise<any> {
    return new Promise(resolve => {
      this.pdfExport
        .export()
        .then((group: Group) => exportPDF(group))
        .then((dataUri: any) => {
          const base64 = dataUri.replace('data:application/pdf;base64,', '');
          this.pdfHojaVida64 = base64;
          resolve(this.pdfHojaVida64);
        });
    });
  }

  getHojaVida(persona: any): void {
    this.showElement = true;
    this.hojaVidaService.find(persona.idPersona).subscribe(response => {
      this.hojaVidaVo = response.body;
      this.archivoService.get(persona.idPersona, TipoArchivo.ARCHIVO_HV).subscribe(responseArchivo => {
        if (responseArchivo !== undefined && responseArchivo !== null) {
          this.empresaService.find(this.usuario?.userEmpresa).subscribe(empresaResponse => {
            if (empresaResponse.body !== null) {
              const empresaValidada = empresaResponse.body;
              if (empresaValidada?.descargasHv !== 0) {
                this.archivoBase64 = responseArchivo.body?.archivo;
                saveAs(this.archivoBase64, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
                this.showElement = false;
                const numero = empresaValidada.descargasHv;
                if (numero !== undefined) {
                  empresaValidada.descargasHv = numero - 1;
                  this.empresaService.update(empresaValidada).subscribe(() => {});
                }
              } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('No cuenta con descargas disponibles!. Debe contratar un plan!');
              }
            }
          });
        } else {
          this.urlImageDefault =
            this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
              ? '../../../content/images/Image 28_F.png'
              : '../../../content/images/Image 28_M.png';
          this.archivos = this.hojaVidaVo?.archivos;
          this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
          this.visualizarArchivoPDF();
        }
      });
    });
  }

  enviarEmail(persona: any): void {
    const mensaje = (document.getElementById('mensaje') as HTMLInputElement).value;
    Swal.fire({
      title: '¿Está seguro que desea enviar el email?',
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2699FB',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.personaService.enviarEmailAspirante(persona.idPersona, mensaje).subscribe(() => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Email enviado correctamente!');
          this.searchInput.nativeElement.value = '';
        });
      }
    });
  }

  public getIdioma(codigo: string): string {
    const nivelIdioma = this.nivelIdioma.find(item => item.codigo === codigo);
    return nivelIdioma?.nombre || '';
  }

  public getEstado(codigo: number): string {
    const estado = this.estadoNivelEstudio.find(item => item.codigo === codigo);
    /* eslint-disable no-console */
    console.log('5----------', estado);
    return estado?.nombre || '';
  }

  public getCiudad(codigo: string): string {
    const ciudad = this.municipiosPersonal.find(item => item.codigo === codigo);
    return ciudad?.nombre || '';
  }
}
