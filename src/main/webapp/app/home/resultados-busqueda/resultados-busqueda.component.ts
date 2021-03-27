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

@Component({
  selector: 'jhi-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  lblResultados = commonMessages.RESULTADO_BUSQUEDA_LABEL;
  lblSalario = commonMessages.SALARIO_LABEL;
  lblCiudad = commonMessages.CIUDAD_LABEL;
  lblFechaPublicacion = commonMessages.FECHA_PUBLICACION_LABEL;
  lblAreaTrabajo = commonMessages.AREA_TRABAJO_LABEL;
  lblEmpresas = commonMessages.EMPRESAS_LABEL;
  // formBusqueda!: FormGroup;
  profesion: any;
  ubicacion: any;
  ofertaFiltro!: Oferta;
  geografia: Array<GeografiaVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  labels = commonMessages;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  municipioValue: any = null;
  salarioValue: any = null;
  fechaValue: any = null;
  listaResultadoBusquedaOfertas: any = [];
  profesiones: Array<IProfesion> = [];
  fechaFiltro: IOpcionVo[] = commonMessages.ARRAY_FECHA_FILTRO;
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
  urlImgDefault = '../../../content/images/Image 28.png';
  imagen: any;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
  edadValue: any = null;
  generoValue: any = null;
  experienciaValue: any = null;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  archivoEmpresa: any;
  filtrosOn = false;
  showBtn = false;

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
    private archivoService: ArchivoService
  ) {
    this.traerCiudad();
    this.cargarProfesiones();
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.general);
    const param = this.route.snapshot.paramMap.get('general')!;

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
      this.ofertaService.query().subscribe(response => {
        this.resultadoBusqueda = response.body;
        if (this.resultadoBusqueda) {
          this.resultadoBusqueda.forEach(element => {
            const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
            const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
            const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
            this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
              archivos => {
                // eslint-disable-next-line no-console
                console.log('aaaaaaaaaaaaaaaaaaa', archivos);
                if (archivos.body !== null) {
                  this.imagen = archivos.body;
                }
                this.listaResultadoBusquedaOfertas.push({
                  profesion: profesionBD?.profesion,
                  salario: salarioBD?.nombre,
                  ciudad: ciudadBD?.nombre,
                  fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                  empresa: element.usuario?.razonSocial,
                  idEmpresa: element.usuario?.id,
                  idOferta: element.id,
                  imagen: archivos.body?.archivo
                });
                this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
              },
              error => {
                // eslint-disable-next-line no-console
                console.log('eeeeeeeeeeeeeeeee', error);
                this.listaResultadoBusquedaOfertas.push({
                  profesion: profesionBD?.profesion,
                  salario: salarioBD?.nombre,
                  ciudad: ciudadBD?.nombre,
                  fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                  empresa: element.usuario?.razonSocial,
                  idEmpresa: element.usuario?.id,
                  idOferta: element.id,
                  imagen: this.urlImgDefault
                });
                this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
              }
            );
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
                empresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.razonSocial,
                idEmpresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.id,
                idOferta: this.ListaAplicacionOferta[i]?.oferta?.id,
                imagen: archivos.body?.archivo
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            },
            error => {
              // eslint-disable-next-line no-console
              console.log('eeeeeeeeeeeeeeeee', error);
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: this.ListaAplicacionOferta[i]?.oferta?.fechaPublicacion?.toString(),
                empresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.razonSocial,
                idEmpresa: this.ListaAplicacionOferta[i]?.oferta?.usuario?.id,
                idOferta: this.ListaAplicacionOferta[i]?.oferta?.id,
                imagen: this.urlImgDefault
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
      const params = new Oferta();
      if (this.fechaValue == null) {
        if (this.municipioValue != null) {
          params.ciudad = this.municipioValue;
        }
        if (this.salarioValue != null) {
          params.salario = this.salarioValue;
        }
        this.ofertaService.listar(params).subscribe(response => {
          this.resultadoBusqueda = response.content;
          if (this.resultadoBusqueda) {
            this.resultadoBusqueda.forEach(element => {
              const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
              const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
              this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(
                archivos => {
                  // eslint-disable-next-line no-console
                  console.log('aaaaaaaaaaaaaaaaaaa', archivos);
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
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: archivos.body?.archivo
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                },
                error => {
                  // eslint-disable-next-line no-console
                  console.log('eeeeeeeeeeeeeeeee', error);
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: this.urlImgDefault
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                }
              );
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
        params.fecha = this.fechaValue;
        this.ofertaService.getOfertasFiltro(params).subscribe(response => {
          this.resultadoBusqueda = response;
          if (this.resultadoBusqueda) {
            this.resultadoBusqueda.forEach(element => {
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
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: archivos.body?.archivo
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                },
                error => {
                  // eslint-disable-next-line no-console
                  console.log('eeeeeeeeeeeeeeeee', error);
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id,
                    imagen: this.urlImgDefault
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                }
              );
            });
          }
        });
      }
    } else {
      this.listaResultadoBusquedaOfertas = [];
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
            params.profesion = this.profesionesFiltro[i].id;
            this.resultadoBusqueda = await this.listarOfertas(params);
            if (this.resultadoBusqueda) {
              this.resultadoBusqueda.forEach(element => {
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
                        empresa: element.usuario?.razonSocial,
                        idEmpresa: element.usuario?.id,
                        idOferta: element.id,
                        imagen: archivos.body?.archivo
                      });
                      this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                    },
                    error => {
                      // eslint-disable-next-line no-console
                      console.log('eeeeeeeeeeeeeeeee', error);
                      this.listaResultadoBusquedaOfertas.push({
                        profesion: profesionBD?.profesion,
                        salario: salarioBD?.nombre,
                        ciudad: ciudadBD?.nombre,
                        fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                        empresa: element.usuario?.razonSocial,
                        idEmpresa: element.usuario?.id,
                        idOferta: element.id,
                        imagen: this.urlImgDefault
                      });
                      this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                    }
                  );
                }, 200);
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
            params.fecha = this.fechaValue;
            params.profesion = this.profesionesFiltro[i].id;
            this.ofertaService.getOfertasFiltroProfesion(params).subscribe(response => {
              this.resultadoBusqueda = response;
              if (this.resultadoBusqueda) {
                this.resultadoBusqueda.forEach(element => {
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
                        empresa: element.usuario?.razonSocial,
                        idEmpresa: element.usuario?.id,
                        idOferta: element.id,
                        imagen: archivos.body?.archivo
                      });
                      this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                    },
                    error => {
                      // eslint-disable-next-line no-console
                      console.log('eeeeeeeeeeeeeeeee', error);
                      this.listaResultadoBusquedaOfertas.push({
                        profesion: profesionBD?.profesion,
                        salario: salarioBD?.nombre,
                        ciudad: ciudadBD?.nombre,
                        fecha: element.fechaPublicacion?.format('YYYY-MM-DD'),
                        empresa: element.usuario?.razonSocial,
                        idEmpresa: element.usuario?.id,
                        idOferta: element.id,
                        imagen: this.urlImgDefault
                      });
                      this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
                    }
                  );
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
    this.router.navigate(['/oferta-publica', { oferta: oferta.idOferta, general: this.general }]);
  }
}
