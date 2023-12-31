/* eslint-disable @typescript-eslint/camelcase */
import { FormBuilder } from '@angular/forms';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { OfertaService } from '../../entities/oferta/oferta.service';
import { IOferta, Oferta } from '../../shared/model/oferta.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { IProfesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { PersonaService } from 'app/entities/persona/persona.service';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { Account } from 'app/core/user/account.model';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import * as moment from 'moment';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

declare let alertify: any;

@Component({
  selector: 'jhi-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  cmResultadosBus: any = null;
  // formBusqueda!: FormGroup;
  profesion: any;
  ubicacion: any;
  ofertaFiltro!: Oferta;
  geografia: Array<GeografiaVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  municipioValue: any = null;
  salarioValue: any = null;
  fechaValue: any = null;
  listaResultadoBusquedaOfertas: any = [];
  profesiones: Array<IProfesion> = [];
  resultadoBusqueda: Array<IOferta> | null = [];
  totalEmpresas = 0;
  general = 'true';
  account!: Account | any;
  personaInicial!: number;
  personaFiltro!: any;
  ListaAplicacionOferta: Array<IAplicacionOferta> = [];
  faSearch = faSearch;
  valorBusqueda = '';
  profesionesFiltro: Array<IProfesion> | null = [];
  urlImgDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28.png';
  imagen: any;
  edadValue: any = null;
  generoValue: any = null;
  experienciaValue: any = null;
  archivoEmpresa: any;
  ofertaBuscaAll = new Oferta();
  filtrosOn = false;
  showBtn = false;

  Explora_Ofertas = commonMessages.EXPLORA_CIENTOS_OFERTAS;
  Profesion = commonMessages.PROFESION_LABEL;
  Empresas = commonMessages.EMPRESAS;
  Resultados = commonMessages.RESULTADOS;
  Ciudad = commonMessages.CIUDAD_LABEL;
  Genero = commonMessages.GENERO_LABEL;
  Masculino = commonMessages.MASCULINO_LABEL;
  Femenino = commonMessages.FEMENINO_LABEL;
  Experiencia = commonMessages.EXPERIENCIA;
  Salario = commonMessages.SALARIO;
  Ver = commonMessages.VER_FILTROS;
  Ocultar = commonMessages.OCULTAR_FILTROS;
  Ver1 = commonMessages.VER;
  lblResultados = commonMessages.RESULTADO_BUSQUEDA_LABEL;
  lblSalario = commonMessages.SALARIO_LABEL;
  lblCiudad = commonMessages.CIUDAD_LABEL;
  lblFechaPublicacion = commonMessages.FECHA_PUBLICACION_LABEL;
  lblAreaTrabajo = commonMessages.AREA_TRABAJO_LABEL;
  lblEmpresas = commonMessages.EMPRESAS_LABEL;
  labels = commonMessages;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  fechaFiltro: IOpcionVo[] = commonMessages.ARRAY_FECHA_FILTRO;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;

  public page = 1;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private ofertaService: OfertaService,
    private regionService: RegionesService,
    private profesionService: ProfesionService,
    private router: Router,
    private accountService: AccountService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private aplicacionOfertaService: AplicacionOfertaService,
    private archivoService: ArchivoService,
    private commonMessagesService: CommonMessagesService,
    private empresaService: EmpresaService
  ) {
    this.traerCiudad();
    this.cargarProfesiones();
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    // console.log(this.general);
    const param = this.route.snapshot.queryParamMap.get('general')!;

    if (param !== null) {
      this.general = param;
    }
    this.profesion = this.dataService.data?.profesion;
    this.ubicacion = this.dataService.data?.ubicacion;

    if (window.screen.width <= 900) {
      this.showBtn = true;
    }
    if (window.screen.width >= 900) {
      this.filtrosOn = true;
    }
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmResultadosBus'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmResultadosBus = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmResultadosBus = 0;
        }
      );
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.Explora_Ofertas = this.cmResultadosBus.EXPLORA_CIENTOS_OFERTAS;
    this.Profesion = this.cmResultadosBus.PROFESION_LABEL;
    this.Empresas = this.cmResultadosBus.EMPRESAS;
    this.Resultados = this.cmResultadosBus.RESULTADOS;
    this.Ciudad = this.cmResultadosBus.CIUDAD_LABEL;
    this.Genero = this.cmResultadosBus.GENERO_LABEL;
    this.Masculino = this.cmResultadosBus.MASCULINO_LABEL;
    this.Femenino = this.cmResultadosBus.FEMENINO_LABEL;
    this.Experiencia = this.cmResultadosBus.EXPERIENCIA;
    this.Salario = this.cmResultadosBus.SALARIO;
    this.Ver = this.cmResultadosBus.VER_FILTROS;
    this.Ocultar = this.cmResultadosBus.OCULTAR_FILTROS;
    this.Ver1 = this.cmResultadosBus.VER;
    this.lblResultados = this.cmResultadosBus.RESULTADO_BUSQUEDA_LABEL;
    this.lblSalario = this.cmResultadosBus.SALARIO_LABEL;
    this.lblCiudad = this.cmResultadosBus.CIUDAD_LABEL;
    this.lblFechaPublicacion = this.cmResultadosBus.FECHA_PUBLICACION_LABEL;
    this.lblAreaTrabajo = this.cmResultadosBus.AREA_TRABAJO_LABEL;
    this.lblEmpresas = this.cmResultadosBus.EMPRESAS_LABEL;
    this.labels = this.cmResultadosBus;
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.fechaFiltro = commonData.ARRAY_FECHA_FILTRO;
    this.edades = commonData.ARRAY_EDAD;
    this.experienciasLaborales = commonData.ARRAY_EXPERIENCIA_LABORAL;
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.personaInicial = this.account?.user || 0;
      if (this.profesion || this.ubicacion) {
        if (this.ubicacion) {
          const ubicacionDB = this.municipiosPersonal.find(ciudad => ciudad.nombre === this.ubicacion.toString());
          this.municipioValue = ubicacionDB?.codigo;
        }
        if (this.profesion) {
          this.valorBusqueda = this.profesion;
        }
        this.cargarOfertar();
      } else {
        this.getOfertas();
      }
    });
  }

  cargarProfesiones(): void {
    this.profesionService
      .query({
        page: 0,
        size: 550
      })
      .subscribe((res: HttpResponse<IProfesion[]>) => (this.profesiones = res.body || []));
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
    setTimeout(() => {
      this.cargarCuentaUsuario();
    }, 500);
  }

  async getOfertas(): Promise<any> {
    if (this.general === 'true') {
      this.ofertaBuscaAll.estado = 'A';
      this.ofertaBuscaAll.activado = true;
      this.ofertaService.listar(this.ofertaBuscaAll).subscribe(response => {
        this.resultadoBusqueda = response.content;
        if (this.resultadoBusqueda) {
          this.resultadoBusqueda.forEach(element => {
            if (element.fechaOfertaCaducacion !== undefined && moment(element.fechaOfertaCaducacion) >= moment(new Date(), 'YYYY-MMM-DD')) {
              const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
              const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
              this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                archivos => {
                  if (archivos.body !== null) {
                    this.imagen = archivos.body;
                  }
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.toString(),
                    empresaRazon: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: archivos.body?.archivo,
                    mostrarSalario: element.mostrarSalario,
                    activado: element.activado ? 'Si' : 'No'
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                },
                error => {
                  // eslint-disable-next-line no-console
                  console.log(error);
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.toString(),
                    empresaRazon: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: this.urlImgDefault,
                    mostrarSalario: element.mostrarSalario,
                    activado: element.activado ? 'Si' : 'No'
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                }
              );
            } else if (element.fechaOfertaCaducacion === undefined || element.fechaOfertaCaducacion === null) {
              const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
              const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
              this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                archivos => {
                  if (archivos.body !== null) {
                    this.imagen = archivos.body;
                  }
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.toString(),
                    empresaRazon: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: archivos.body?.archivo,
                    mostrarSalario: element.mostrarSalario,
                    activado: element.activado ? 'Si' : 'No'
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                },
                error => {
                  // eslint-disable-next-line no-console
                  console.log(error);
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.toString(),
                    empresaRazon: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: this.urlImgDefault,
                    mostrarSalario: element.mostrarSalario,
                    activado: element.activado ? 'Si' : 'No'
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                }
              );
            }
          });
        }
      });
    } else {
      this.personaFiltro = await this.getPersonaInicial();
      this.ListaAplicacionOferta = await this.getPersonaFiltro(this.personaFiltro);
      if (this.ListaAplicacionOferta) {
        for (let i = 0; i < this.ListaAplicacionOferta.length; i++) {
          const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === this.ListaAplicacionOferta[i].oferta?.salario);
          const ciudadBD = this.municipiosPersonal.find(
            ciudad => ciudad.codigo === this.ListaAplicacionOferta[i].oferta?.ciudad?.toString()
          );
          const profesionBD = this.profesiones.find(profesion => profesion.id === this.ListaAplicacionOferta[i].oferta?.profesion);
          // this.archivoEmpresa = await this.getArchivoImagenEmpresa(this.ListaAplicacionOferta[i].usuario?.id!);
          this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, this.ListaAplicacionOferta[i].usuario?.id!).subscribe(
            archivos => {
              if (archivos.body !== null) {
                this.imagen = archivos.body;
              }
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: this.ListaAplicacionOferta[i].oferta?.fechaPublicacion?.toString(),
                empresaRazon: this.ListaAplicacionOferta[i]?.oferta?.usuario?.razonSocial,
                idEmpresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.id,
                idOferta: this.ListaAplicacionOferta[i]?.oferta?.id,
                imagen: archivos.body?.archivo,
                mostrarSalario: this.ListaAplicacionOferta[i].oferta?.mostrarSalario
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            },
            error => {
              // eslint-disable-next-line no-console
              console.log(error);
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: this.ListaAplicacionOferta[i]?.oferta?.fechaPublicacion?.toString(),
                empresaRazon: this.ListaAplicacionOferta[i]?.oferta?.usuario?.razonSocial,
                idEmpresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.id,
                idOferta: this.ListaAplicacionOferta[i]?.oferta?.id,
                imagen: this.urlImgDefault,
                mostrarSalario: this.ListaAplicacionOferta[i].oferta?.mostrarSalario
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            }
          );
        }
      }
    }

    // let params = {
    //   nombre: null,
    //   idUsuarioCreador : this.token.getUser().id
    // }
  }

  getPersonaInicial(): Promise<any> {
    return new Promise(resolve => {
      this.personaService.find(this.personaInicial).subscribe(personaResponse => {
        resolve(personaResponse.body);
      });
    });
  }

  getPersonaFiltro(personaFiltro: any): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.getPersonaFiltro(personaFiltro).subscribe(ApliOfeResponse => {
        resolve(ApliOfeResponse);
      });
    });
  }

  getArchivoImagenEmpresa(idUsuario: any): Promise<any> {
    return new Promise(resolve => {
      this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, idUsuario).subscribe(archivos => {
        resolve(archivos);
      });
    });
  }

  async cargarOfertar(): Promise<any> {
    if (this.valorBusqueda === '') {
      this.listaResultadoBusquedaOfertas = [];
      this.totalEmpresas = 0;
      const params = new Oferta();
      if (this.fechaValue == null) {
        if (this.municipioValue != null) {
          params.ciudad = this.municipioValue;
        }
        if (this.salarioValue != null) {
          params.salario = this.salarioValue;
        }
        if (this.generoValue != null) {
          params.genero = this.generoValue;
        }
        if (this.experienciaValue != null) {
          params.experiencia = this.experienciaValue;
        }
        params.estado = 'A';
        params.activado = true;
        this.ofertaService.listar(params).subscribe(response => {
          this.resultadoBusqueda = response.content;
          if (this.resultadoBusqueda) {
            this.resultadoBusqueda.forEach(element => {
              if (
                element.fechaOfertaCaducacion !== undefined &&
                moment(element.fechaOfertaCaducacion) >= moment(new Date(), 'YYYY-MMM-DD')
              ) {
                const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                  archivos => {
                    // eslint-disable-next-line no-console
                    // console.log('aaaaaaaaaaaaaaaaaaa', archivos);
                    if (archivos.body !== null) {
                      this.imagen = archivos.body;
                    } else {
                      this.imagen = this.urlImgDefault;
                    }
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fechaPublicacion: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: archivos.body?.archivo,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  },
                  error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fecha: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: this.urlImgDefault,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  }
                );
              } else if (element.fechaOfertaCaducacion === undefined || element.fechaOfertaCaducacion === null) {
                const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                  archivos => {
                    // eslint-disable-next-line no-console
                    // console.log('aaaaaaaaaaaaaaaaaaa', archivos);
                    if (archivos.body !== null) {
                      this.imagen = archivos.body;
                    } else {
                      this.imagen = this.urlImgDefault;
                    }
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fechaPublicacion: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: archivos.body?.archivo,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  },
                  error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fecha: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: this.urlImgDefault,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  }
                );
              }
            });
          }
        });
      } else {
        if (this.municipioValue != null) {
          params.ciudad = this.municipioValue;
        } else {
          params.ciudad = 0;
        }
        if (this.salarioValue != null) {
          params.salario = this.salarioValue;
        } else {
          params.salario = 0;
        }
        params.estado = 'A';
        params.activado = true;
        params.fecha = this.fechaValue;
        this.ofertaService.getOfertasFiltro(params).subscribe(response => {
          this.resultadoBusqueda = response;
          if (this.resultadoBusqueda) {
            this.resultadoBusqueda.forEach(element => {
              if (
                element.fechaOfertaCaducacion !== undefined &&
                moment(element.fechaOfertaCaducacion) >= moment(new Date(), 'YYYY-MMM-DD')
              ) {
                const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                  archivos => {
                    if (archivos.body !== null) {
                      this.imagen = archivos.body;
                    }
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fechaPublicacion: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: archivos.body?.archivo,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  },
                  error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fecha: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: this.urlImgDefault,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  }
                );
              }
              if (element.fechaOfertaCaducacion === undefined || element.fechaOfertaCaducacion === null) {
                const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                  archivos => {
                    if (archivos.body !== null) {
                      this.imagen = archivos.body;
                    }
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fechaPublicacion: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: archivos.body?.archivo,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  },
                  error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.listaResultadoBusquedaOfertas.push({
                      profesion: profesionBD?.profesion,
                      salario: salarioBD?.nombre,
                      ciudad: ciudadBD?.nombre,
                      fecha: element.fechaPublicacion?.toString(),
                      empresaRazon: element.usuario?.razonSocial,
                      idEmpresa: element.usuario?.id,
                      idOferta: element.id,
                      imagen: this.urlImgDefault,
                      mostrarSalario: element.mostrarSalario
                    });
                    this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                  }
                );
              }
            });
          }
        });
      }
    } else {
      this.listaResultadoBusquedaOfertas = [];
      this.totalEmpresas = 0;
      this.profesionesFiltro = await this.listarProfesion(this.valorBusqueda);
      if (this.profesionesFiltro) {
        for (let i = 0; i < this.profesionesFiltro.length; i++) {
          // this.listaResultadoBusquedaOfertas = [];
          const params = new Oferta();
          if (this.fechaValue == null) {
            if (this.municipioValue != null) {
              params.ciudad = this.municipioValue;
            }
            if (this.salarioValue != null) {
              params.salario = this.salarioValue;
            }
            if (this.generoValue != null) {
              params.genero = this.generoValue;
            }
            if (this.experienciaValue != null) {
              params.experiencia = this.experienciaValue;
            }
            params.estado = 'A';
            params.activado = true;
            params.profesion = this.profesionesFiltro[i].id;
            this.resultadoBusqueda = await this.listarOfertas(params);
            if (this.resultadoBusqueda) {
              this.resultadoBusqueda.forEach(element => {
                if (
                  element.fechaOfertaCaducacion !== undefined &&
                  moment(element.fechaOfertaCaducacion) >= moment(new Date(), 'YYYY-MMM-DD')
                ) {
                  const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                  const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                  const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                  setTimeout(() => {
                    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                      archivos => {
                        if (archivos.body !== null) {
                          this.imagen = archivos.body;
                        }
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fechaPublicacion: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: archivos.body?.archivo,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      },
                      error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fecha: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: this.urlImgDefault,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      }
                    );
                  }, 200);
                } else if (element.fechaOfertaCaducacion === undefined || element.fechaOfertaCaducacion === null) {
                  const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                  const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                  const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                  setTimeout(() => {
                    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                      archivos => {
                        if (archivos.body !== null) {
                          this.imagen = archivos.body;
                        }
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fechaPublicacion: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: archivos.body?.archivo,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      },
                      error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fecha: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: this.urlImgDefault,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      }
                    );
                  }, 200);
                }
              });
            }
          } else {
            if (this.municipioValue != null) {
              params.ciudad = this.municipioValue;
            } else {
              params.ciudad = 0;
            }
            if (this.salarioValue != null) {
              params.salario = this.salarioValue;
            } else {
              params.salario = 0;
            }
            params.estado = 'A';
            params.activado = true;
            params.fecha = this.fechaValue;
            params.profesion = this.profesionesFiltro[i].id;
            this.ofertaService.getOfertasFiltroProfesion(params).subscribe(response => {
              this.resultadoBusqueda = response;
              if (this.resultadoBusqueda) {
                this.resultadoBusqueda.forEach(element => {
                  if (
                    element.fechaOfertaCaducacion !== undefined &&
                    moment(element.fechaOfertaCaducacion) >= moment(new Date(), 'YYYY-MMM-DD')
                  ) {
                    const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                    const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                    const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                      archivos => {
                        if (archivos.body !== null) {
                          this.imagen = archivos.body;
                        }
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fechaPublicacion: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: archivos.body?.archivo,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      },
                      error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fecha: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: this.urlImgDefault,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      }
                    );
                  } else if (element.fechaOfertaCaducacion === undefined || element.fechaOfertaCaducacion === null) {
                    const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
                    const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
                    const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
                    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                      archivos => {
                        if (archivos.body !== null) {
                          this.imagen = archivos.body;
                        }
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fechaPublicacion: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: archivos.body?.archivo,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      },
                      error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.listaResultadoBusquedaOfertas.push({
                          profesion: profesionBD?.profesion,
                          salario: salarioBD?.nombre,
                          ciudad: ciudadBD?.nombre,
                          fecha: element.fechaPublicacion?.toString(),
                          empresaRazon: element.usuario?.razonSocial,
                          idEmpresa: element.usuario?.id,
                          idOferta: element.id,
                          imagen: this.urlImgDefault,
                          mostrarSalario: element.mostrarSalario
                        });
                        this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                      }
                    );
                  }
                });
              }
            });
          }
        }
      }
    }
  }

  listarOfertas(params: any): Promise<any> {
    return new Promise(resolve => {
      this.ofertaService.listar(params).subscribe(response => {
        resolve(response.content);
      });
    });
  }

  listarProfesion(valor: string): Promise<any> {
    return new Promise(resolve => {
      this.profesionService.getByProfesion(valor).subscribe(profesionResponse => {
        resolve(profesionResponse);
      });
    });
  }

  verOferta(oferta: any): void {
    this.router.navigate(['/oferta-publica'], { queryParams: { oferta: oferta.idOferta, general: this.general } });
  }

  alertaEmpresa(oferta: any): void {
    this.empresaService.find(oferta.idEmpresa).subscribe(res => {
      if (res.status === 200) {
        const empre = res.body;
        console.log('muni: ', empre?.ciudad?.toString());
        this.municipiosPersonal.find(ciudad => {
          console.log(ciudad.codigo);
          if (ciudad.codigo === empre?.ciudad?.toString()) {
            return true;
          } else {
            return false;
          }
        });
        const ciudadEmp = empre?.ciudad
          ? '<br/>Ciudad: ' + this.municipiosPersonal.find(ciudad => ciudad.codigo === empre?.ciudad?.toString())?.nombre
          : '';
        const pagina = empre?.paginaWeb ? '<br/>Página web: ' + empre?.paginaWeb : '';
        const facebook = empre?.urlFacebook ? '<br/>Facebook: ' + empre?.urlFacebook : '';
        const instagram = empre?.urlInstagram ? '<br/>Instagram: ' + empre?.urlInstagram : '';
        const linkedin = empre?.urlLinkedIn ? '<br/>Linkedin: ' + empre?.urlLinkedIn : '';
        alertify.alert(empre?.razonSocial, 'Sector: ' + empre?.sector + ciudadEmp + pagina + facebook + instagram + linkedin).setting({
          label: 'Aceptar'
        });
      }

      console.log('res:', res);
    });
  }

  verEmpresa(idEmpresa: any): void {
    this.router.navigate(['/perfil-info-empresa'], { queryParams: { empresa: idEmpresa } });
  }
}
