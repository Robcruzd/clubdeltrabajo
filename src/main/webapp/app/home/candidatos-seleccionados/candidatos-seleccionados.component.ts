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

const { exportPDF } = pdf;
declare let alertify: any;

@Component({
  selector: 'jhi-candidatos-seleccionados',
  templateUrl: './candidatos-seleccionados.component.html',
  styleUrls: ['./candidatos-seleccionados.component.scss']
})
export class CandidatosSeleccionadosComponent implements OnInit {
  @ViewChild('pdf') pdfExport: any;

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
  labels = commonMessages;
  listaResultadoBusquedaAspirantes: Array<IResultadoBusquedaAspirantes> = [];
  listaResultadoOfertas: Array<IResultadoOfertas> = [];
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
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
  urlImageDefault = '';
  archivos!: Array<Archivo> | undefined;
  nivelIdioma: Array<IOpcionVo> = commonMessages.ARRAY_NIVEL_IDIOMA;
  estadoNivelEstudio: IOpcionVo[] = commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  listaAplicacionOferta: Array<IAplicacionOferta> | null = [];
  aspiranteSeleccionado = new Persona();
  valorBusqueda = '';
  profesionesFiltro: Array<IProfesion> | null = [];
  mensajeEmail = '';
  aplicacionOferta: any;
  cargando = true;
  filtrosOn = true;
  showBtnArriba = true;
  usuario!: User | null;

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
    private accountService: AccountService,
    private empresaService: EmpresaService
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    this.backColor();
    const param = this.route.snapshot.paramMap.get('oferta')!;
    this.idOferta = parseInt(param, 10);
    this.getOFerta(this.idOferta);

    if (window.screen.width <= 900) {
      this.showBtnArriba = false;
    }

    if (window.screen.width >= 900) {
      this.showBtnArriba = true;
    }
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
    });
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
            this.resultadoBusqueda.forEach(element => {
              let postulacionBD = '';
              let colorApirante = '';
              const edadBD = this.obtenerEdad(element);
              const experienciaBD = this.obtenerExperiencia(element);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
              const edadEncontrada = this.validarEdadSeleccionada(edadBD);
              const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
              this.aplicacionOfertaService.getPersonaFiltro(element.usuario).subscribe(aplicacionOferta => {
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
            for (let j = 0; j < this.resultadoBusqueda.length; j++) {
              let postulacionBD = '';
              let colorApirante = '';
              const edadBD = this.obtenerEdad(this.resultadoBusqueda[j]);
              const experienciaBD = this.obtenerExperiencia(this.resultadoBusqueda[j]);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.resultadoBusqueda[j].ciudad?.toString());
              const edadEncontrada = this.validarEdadSeleccionada(edadBD);
              const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
              this.aplicacionOferta = await this.obetenerPersonaFiltro(this.resultadoBusqueda[j].usuario);
              colorApirante = this.backColor(this.aplicacionOferta[0].estado);
              postulacionBD = this.aplicacionOferta[0].fechaPostulacion;
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
    return new Promise(resolve => {
      this.aplicacionOfertaService.getPersonaFiltro(valor).subscribe(aplicacionOferta => {
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

  obtenerPersonaInfo(params: any, ofer: any): Promise<any> {
    this.resultadoBusqueda = [];
    return new Promise(resolve => {
      this.informacionPersonalService.listar(params).subscribe(response => {
        this.resultadoBusqueda = response.content;
        if (this.resultadoBusqueda) {
          let postulacionBD = '';
          let colorApirante = '';
          this.aplicacionOfertaService.getByOfertaAndPersonaFiltro(ofer, this.resultadoBusqueda[0].usuario).subscribe(aplicacionOferta => {
            colorApirante = this.backColor(aplicacionOferta[0].estado);
            postulacionBD = aplicacionOferta[0].fechaPostulacion;
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
              btnestado: this.btnestado
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
    this.router.navigate(['oferta-publicada']);
  }

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }

  clubEmpresas(): void {
    this.router.navigate(['club-empresas']);
  }

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  verAspirante(item: any): void {
    this.router.navigate(['hoja-candidato', { usuario: item.idPersona, oferta: this.idOferta }]);
  }

  backColor(estado?: any): string {
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
      if(response.body !== null){
        const empresaValidada = response.body;
        if(empresaValidada?.descargasHv !== 0){
          saveAs(this.pdfHojaVida64RenderDescarga, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
          const numero = empresaValidada.descargasHv;
          if(numero !== undefined){
            empresaValidada.descargasHv = numero - 1;
            this.empresaService.update(empresaValidada).subscribe(() => {});
          }
        }else{
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('No cuenta con descargas disponibles!. Debe contratar un plan!');
        }
      }
    })
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
    });
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
      this.urlImageDefault =
        this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
          ? '../../../content/images/Image 28_F.png'
          : '../../../content/images/Image 28_M.png';
      this.archivos = this.hojaVidaVo?.archivos;
      this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
      this.visualizarArchivoPDF();
    });
  }

  enviarEmail(persona: any): void {
    this.cargando = false;
    this.personaService.enviarEmailAspirante(persona.idPersona, this.mensajeEmail).subscribe(() => {
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Email enviado correctamente!');
      this.mensajeEmail = '';
      this.cargando = true;
    });
  }

  public getIdioma(codigo: string): string {
    const nivelIdioma = this.nivelIdioma.find(item => item.codigo === codigo);
    return nivelIdioma?.nombre || '';
  }

  public getEstado(codigo: number): string {
    const estado = this.estadoNivelEstudio.find(item => item.codigo === codigo);
    return estado?.nombre || '';
  }

  public getCiudad(codigo: string): string {
    const ciudad = this.municipiosPersonal.find(item => item.codigo === codigo);
    return ciudad?.nombre || '';
  }
}
