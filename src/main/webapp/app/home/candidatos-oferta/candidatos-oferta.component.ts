/* eslint-disable @typescript-eslint/camelcase */
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'app/core/auth/account.service';
import { User } from 'app/core/user/user.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Archivo } from 'app/shared/model/archivo.model';
import { Empresa } from 'app/shared/model/empresa.model';
import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { IRegiones } from 'app/shared/model/regiones.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo, IResultadoBusquedaAspirantes, IResultadoOfertas } from 'app/shared/vo/opcion-vo';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-candidatos-oferta',
  templateUrl: './candidatos-oferta.component.html',
  styleUrls: ['./candidatos-oferta.component.scss']
})
export class CandidatosOfertaComponent implements OnInit {
  public page = 1;
  cmCandidatos: any = null;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  imagen!: Archivo;
  urlImgDefault = '';
  faUserCircle = faUserCircle;
  generoValue: any = null;
  salarioValue: any = null;
  experienciaValue: any = null;
  municipioValue: any = null;
  edadValue: any = null;
  listaResultadoBusquedaAspirantes: Array<IResultadoBusquedaAspirantes> = [];
  listaResultadoOfertas: Array<IResultadoOfertas> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  resultadoBusqueda: Array<IInformacionPersonal> | null = [];
  totalAspirantes = 0;
  idOferta = 0;
  oferta!: IOferta | null;
  mostrar = true;
  empresaUpdate!: Empresa | null;
  usuario!: User | null;

  labels = commonMessages;
  Crear_Oferta = commonMessages.CREAR_OFERTA;
  Editar_perfil = commonMessages.EDITAR_PERFIL;
  Club_empresas = commonMessages.CLUB_DE_EMPRESAS;
  Controla_ofertas = commonMessages.CONTROLA_TUS_OFERTAS;
  Membresia = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  Titulo = commonMessages.TITULO_LABEL;
  Tipo_Contrato = commonMessages.TIPO_CONTRATO;
  Publicado = commonMessages.PUBLICADO;
  Experiencia = commonMessages.EXPERIENCIA;
  Ciudad = commonMessages.CIUDAD_LABEL;
  Salario = commonMessages.SALARIO;
  Perfiles_Aspirantes = commonMessages.PERFILES_ASPIRANTES;
  Resultados_Para = commonMessages.RESULTADOS_PARA;
  Perfiles = commonMessages.PERFILES;
  Ordenar_Perfiles = commonMessages.ORDENAR_PERFILES;
  Seleccionar = commonMessages.SELECCIONAR;
  Edad = commonMessages.EDAD;
  Cargo = commonMessages.CARGO_LABEL;
  Genero = commonMessages.GENERO;
  Masculino = commonMessages.MASCULINO_LABEL;
  Femenino = commonMessages.FEMENINO_LABEL;
  VerHV = commonMessages.VER_HV;
  Buscar_Mas_Perfiles = commonMessages.BUSCAR_MAS_PERFILES;
  Buscar = commonMessages.BUSCAR;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
  resultados = commonMessages.RESULTADOS;
  Edad2 = commonMessages.EDAD;
  Ciudad2 = commonMessages.CIUDAD_LABEL;
  Experiencia2 = commonMessages.EXPERIENCIA;
  Titulo2 = commonMessages.TITULO_LABEL;
  FechaPostulacion = commonMessages.FECHA_POSTULACION;

  constructor(
    private router: Router,
    private informacionPersonalService: InformacionPersonalService,
    private regionService: RegionesService,
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private empresaService: EmpresaService,
    private accountService: AccountService,
    private commonMessagesService: CommonMessagesService
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('oferta')!;
    this.idOferta = parseInt(param, 10);
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmCandidatosOferta'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmCandidatos = mensajes;
          this.updateVariables();
          this.getOFerta(this.idOferta);
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.getOFerta(this.idOferta);
          this.cmCandidatos = 0;
        }
      );
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
    });
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.labels = this.cmCandidatos;
    this.Crear_Oferta = this.cmCandidatos.CREAR_OFERTA;
    this.Editar_perfil = this.cmCandidatos.EDITAR_PERFIL;
    this.Club_empresas = this.cmCandidatos.CLUB_DE_EMPRESAS;
    this.Controla_ofertas = this.cmCandidatos.CONTROLA_TUS_OFERTAS;
    this.Membresia = this.cmCandidatos.MEMBRESIA;
    this.Titulo = this.cmCandidatos.TITULO_LABEL;
    this.Tipo_Contrato = this.cmCandidatos.TIPO_CONTRATO;
    this.Publicado = this.cmCandidatos.PUBLICADO;
    this.Experiencia = this.cmCandidatos.EXPERIENCIA;
    this.Ciudad = this.cmCandidatos.CIUDAD_LABEL;
    this.Salario = this.cmCandidatos.SALARIO;
    this.Perfiles_Aspirantes = this.cmCandidatos.PERFILES_ASPIRANTES;
    this.Resultados_Para = this.cmCandidatos.RESULTADOS_PARA;
    this.Perfiles = this.cmCandidatos.PERFILES;
    this.Ordenar_Perfiles = this.cmCandidatos.ORDENAR_PERFILES;
    this.Seleccionar = this.cmCandidatos.SELECCIONAR;
    this.Edad = this.cmCandidatos.EDAD;
    this.Cargo = this.cmCandidatos.CARGO_LABEL;
    this.Genero = this.cmCandidatos.GENERO;
    this.Masculino = this.cmCandidatos.MASCULINO_LABEL;
    this.Femenino = this.cmCandidatos.FEMENINO_LABEL;
    this.VerHV = this.cmCandidatos.VER_HV;
    this.Buscar_Mas_Perfiles = this.cmCandidatos.BUSCAR_MAS_PERFILES;
    this.Buscar = this.cmCandidatos.BUSCAR;
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.experienciasLaborales = commonData.ARRAY_EXPERIENCIA_LABORAL;
    this.tiposContrato = commonData.ARRAY_TIPO_CONTRATO;
    this.edades = commonData.ARRAY_EDAD;
    this.resultados = this.cmCandidatos.RESULTADOS;
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
        this.router.navigate(['preguntas-frecuentes']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
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
    });
  }

  volverOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  getCandidatosOferta(): void {
    const params = new InformacionPersonal();
    // params.size = 5;
    // params.page = 0;
    params.ciudad = 100;
    // params.telefono = '123458';
    // this.informacionPersonalService.listar(params).subscribe(response=>{

    // })
  }

  cargarAspirantes(): void {
    this.listaResultadoBusquedaAspirantes = [];
    const params = new InformacionPersonal();
    params.genero = this.generoValue;
    params.aspiracionSalarial = this.salarioValue;
    params.ciudad = this.municipioValue;
    this.informacionPersonalService.listar(params).subscribe(response => {
      this.resultadoBusqueda = response.content;
      if (this.resultadoBusqueda) {
        this.resultadoBusqueda.forEach(element => {
          const edadBD = this.obtenerEdad(element);
          const experienciaBD = this.obtenerExperiencia(element);
          const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
          const edadEncontrada = this.validarEdadSeleccionada(edadBD);
          const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
          if (edadEncontrada && experienciaEncontrada) {
            this.listaResultadoBusquedaAspirantes.push({
              nombre: element.usuario?.nombre,
              apellido: element.usuario?.apellido,
              profesion: element.profesion?.profesion,
              edad: edadBD,
              ciudad: ciudadBD?.nombre,
              experiencia: experienciaBD,
              titulo: element.profesion?.profesion,
              fechaPostulacion: 'g',
              idPersona: element.usuario?.id,
              idOferta: 1
            });
            this.totalAspirantes = this.listaResultadoBusquedaAspirantes.length;
          }
        });
      }
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

  verAspirante(item: any): void {
    this.router.navigate(['hoja-candidato', { usuario: item.idPersona, oferta: this.idOferta }]);
  }

  controlaOferta(): void {
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
        this.empresaUpdate?.clubEmpresa !== undefined &&
        this.empresaUpdate?.clubEmpresa === true
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }
}
