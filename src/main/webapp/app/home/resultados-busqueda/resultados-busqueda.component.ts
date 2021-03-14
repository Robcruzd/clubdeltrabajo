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
import { IOpcionVo, IResultadoBusquedaOfertas } from 'app/shared/vo/opcion-vo';
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
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.personaInicial = this.account?.user || 0;
      this.getOfertas();
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

  getOfertas(): void {
    // eslint-disable-next-line no-console
    console.log('dfghjgfdsdfgh', this.general);
    if (this.general === 'true') {
      this.ofertaService.query().subscribe(response => {
        this.resultadoBusqueda = response.body;
        if (this.resultadoBusqueda) {
          this.resultadoBusqueda.forEach(element => {
            const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
            const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
            const profesionBD = this.profesiones.find(profesion => profesion.id === element.profesion);
            this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.usuario?.id!).subscribe(archivos => {
              // eslint-disable-next-line no-console
              console.log('response:     ', element);
              if (archivos.body !== null) {
                this.imagen = archivos.body;
              }

              // this.listaOfertas.push({
              //   id: element.id?.toString(),
              //   profesion: profBD?.profesion,
              //   salario: salarioBD?.nombre,
              //   ciudad: ciudadBD?.nombre,
              //   activado: element?.activado,
              //   empresa: element?.usuario?.razonSocial,
              //   fecha: element.fechaPublicacion?.format('DD/MM/YYYY'),
              //   imagen: response.body?.archivo
              // });
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
            });
          });
        }
      });
    } else {
      this.personaService.find(this.personaInicial).subscribe(personaResponse => {
        this.personaFiltro = personaResponse.body;
        this.aplicacionOfertaService.getPersonaFiltro(this.personaFiltro).subscribe(ApliOfeResponse => {
          this.ListaAplicacionOferta = ApliOfeResponse;
          if (this.ListaAplicacionOferta) {
            this.ListaAplicacionOferta.forEach(element => {
              const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element?.oferta?.salario);
              const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element?.oferta?.ciudad?.toString());
              const profesionBD = this.profesiones.find(profesion => profesion.id === element?.oferta?.profesion);
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: element?.oferta?.fechaPublicacion?.toString(),
                empresa: element?.oferta?.usuario?.razonSocial,
                idEmpresa: element?.oferta?.usuario?.id,
                idOferta: element?.oferta?.id
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            });
          }
        });
      });
    }

    // let params = {
    //   nombre: null,
    //   idUsuarioCreador : this.token.getUser().id
    // }
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
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: element.fechaPublicacion?.toString(),
                empresa: element.usuario?.razonSocial,
                idEmpresa: element.usuario?.id,
                idOferta: element.id
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
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
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: element.fechaPublicacion?.toString(),
                empresa: element.usuario?.razonSocial,
                idEmpresa: element.usuario?.id,
                idOferta: element.id
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            });
          }
        });
      }
    } else {
      this.listaResultadoBusquedaOfertas = [];
      this.profesionesFiltro = await this.listarProfesion(this.valorBusqueda);
      if (this.profesionesFiltro) {
        for (let i = 0; i < this.profesionesFiltro.length; i++) {
          this.listaResultadoBusquedaOfertas = [];
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
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fechaPublicacion: element.fechaPublicacion?.toString(),
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
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
                  this.listaResultadoBusquedaOfertas.push({
                    profesion: profesionBD?.profesion,
                    salario: salarioBD?.nombre,
                    ciudad: ciudadBD?.nombre,
                    fechaPublicacion: element.fechaPublicacion?.toString(),
                    empresa: element.usuario?.razonSocial,
                    idEmpresa: element.usuario?.id,
                    idOferta: element.id
                  });
                  this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
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
