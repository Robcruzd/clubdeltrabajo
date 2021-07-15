import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../../entities/cargo/cargo.service';
import { commonMessages } from '../../shared/constants/commonMessages';
import { ICargo } from 'app/shared/model/cargo.model';
import { HttpResponse } from '@angular/common/http';
import { IlistarOfertas, IOpcionVo, ISubnivelVo } from '../../shared/vo/opcion-vo';
import { IdiomaService } from '../../entities/idioma/idioma.service';
import { IIdioma } from '../../shared/model/idioma.model';
import { FormControl } from '@angular/forms';
import { Oferta } from '../../shared/model/oferta.model';
import * as moment from 'moment';
import { OfertaService } from '../../entities/oferta/oferta.service';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import { AccountService } from '../../core/auth/account.service';
import { ApiService } from '../../shared/services/api.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { IProfesion } from '../../shared/model/profesion.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../core/user/user.model';
import { ProfesionService } from '../../entities/profesion/profesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { IRegiones } from 'app/shared/model/regiones.model';
import { Location } from '@angular/common';
import { Empresa } from '../../shared/model/empresa.model';
import { Account } from 'app/core/user/account.model';

declare let alertify: any;

@Component({
  selector: 'jhi-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.scss']
})
export class CrearOfertaComponent implements OnInit {
  myControlCiudades = new FormControl();
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  formDatosBasicos!: FormGroup;
  labels = commonMessages;
  cargos: Array<ICargo> = [];
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  idiomas: Array<IIdioma> = [];
  nivelIdioma: IOpcionVo[] = commonMessages.ARRAY_NIVEL_IDIOMA;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  modalidadesLaborales: IOpcionVo[] = commonMessages.ARRAY_MODALIDAD_LABORAL;
  nivelEducativoProfesion: IOpcionVo[] = commonMessages.ARRAY_NIVEL_EDUCATIVO_PROFESION;
  oferta!: Oferta;
  account!: Account | null;
  municipiosAcademica: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  myControlProfesiones = new FormControl();
  filteredOptionsProfesiones = new Observable<IProfesion[]>();
  profesiones: Array<IProfesion> = [];
  profesionState: Boolean = false;
  usuario!: User | null;
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  nivelesLaborales: ISubnivelVo[] = commonMessages.ARRAY_NIVEL_LABORAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  no_publicar: any;
  genero: any;
  visualizarOferta = false;
  visualizarOfertasCreadas = false;
  descripcionOferta = '';
  profesionOferta: any;
  tituloOferta: any;
  contratoOferta: any;
  publicadoOFerta: any;
  experienciaOferta: any;
  salarioOferta: any;
  data: any = [];
  dataCiudades: Array<IRegiones> = [];
  filteredOptionsCiudades = new Observable<string[]>();
  ciudades: string[] = [];
  lblSeleccioneCiudad = commonMessages.SELECCIONE_CIUDAD_LABEL;
  ciudadOferta: any;
  municipiosPersonal: Array<IOpcionVo> = [];
  listaOfertas: Array<Oferta> = [];
  listaOFertasCreadas: Array<IlistarOfertas> = [];
  datosOferta!: Oferta | null;
  idOferta = 0;
  subnivelesLaborales: IOpcionVo[] = commonMessages.ARRAY_NIVEL_LABORAL[0].subniveles;
  mostrarSalario = false;
datosEmpresa!: Empresa | null;

  Crear_oferta = commonMessages.CREAR_OFERTA;
  Editar_Perfil = commonMessages.EDITAR_PERFIL;
  Club_Empresas = commonMessages.CLUB_DE_EMPRESAS;
  Controla_ofertas = commonMessages.CONTROLA_TUS_OFERTAS;
  Creando_Oferta = commonMessages.CREANDO_OFERTA;
  Seleccione_Opcion = commonMessages.SELECCIONE_OPCION_LABEL;
  Desc_Requi = commonMessages.DESCRIPCION_REQUISITOS;
  No_Salario = commonMessages.NO_PUBLICAR_SALARIO;
  Nivel_Idioma = commonMessages.NIVEL_IDIOMA_LABEL;
  M_Label = commonMessages.MASCULINO_LABEL;
  F_Label = commonMessages.FEMENINO_LABEL;
  No_Aplica = commonMessages.NO_APLICA;
  Volver = commonMessages.VOLVER;
  Continuar = commonMessages.CONTINUAR;
  Asi_Quedara_Oferta = commonMessages.ASI_QUEDARA_OFERTA;
  Oferta = commonMessages.OFERTA;
  Titulo = commonMessages.TITULO_LABEL;
  Experiencia = commonMessages.EXPERIENCIA;
  Tipo_Contrato = commonMessages.TIPO_CONTRATO;
  Ciudad = commonMessages.CIUDAD_LABEL;
  Publicado = commonMessages.PUBLICADO;
  Salario = commonMessages.SALARIO;
  Publicar = commonMessages.PUBLICAR;
  

  constructor(
    private cargoService: CargoService,
    private idiomaService: IdiomaService,
    private ofertaService: OfertaService,
    private empresaService: EmpresaService,
    private accountService: AccountService,
    private apiService: ApiService,
    private profesionService: ProfesionService,
    private fb: FormBuilder,
    private router: Router,
    private regionService: RegionesService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('oferta')!;
    // eslint-disable-next-line no-console
    console.log('paaaaaaaaram: ', param);
    if (param !== null) {
      this.idOferta = parseInt(param, 10);
    }
    this.crearFormularioOferta();
    this.cargarCargos();
    this.cargarIdiomas();
    this.consultarInformacionGeografica();
    this.cargarProfesiones();
    this.traerProfesiones();
    if (this.idOferta !== 0) {
      this.cargarFormularioOferta();
    }
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
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

  // private _filterCiudades(value: string): string[] {
  //   this.ciudades = [];
  //   const filterValue = value.toLowerCase();
  //   for (const valor of this.data) {
  //     this.ciudades.push(valor.municipio + ' (' + valor.departamento + ')');
  //   }
  //   return this.ciudades.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  // }

  cargarSubnivel(value: Object): void {
    this.subnivelesLaborales = [];
    if (value === 0) {
      this.subnivelesLaborales = this.nivelesLaborales;
    } else {
      // eslint-disable-next-line no-console
      console.log('vaaaalue: ', value);
      if (value && Object.entries(value).length > 0) {
        // eslint-disable-next-line no-console
        console.log('vaaaalue2: ', value['nivelLaboral']);
        const subniveles = this.nivelesLaborales
          .filter(item => item.codigo === value['nivelLaboral'])
          .map(item => {
            return {
              codigo: item.codigo,
              nombre: item.nombre,
              subniveles: item.subniveles
            };
          });
        this.subnivelesLaborales = subniveles[0].subniveles;
        // eslint-disable-next-line no-console
        console.log(this.subnivelesLaborales);
      }
    }
  }

  crearFormularioOferta(): void {
    this.formDatosBasicos = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{1,}$')]],
      requisitos: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      rangoSalarial: ['', [Validators.required]],
      areaTrabajo: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      idIdioma: [''],
      nivelLaboral: ['', [Validators.required]],
      tipoContrato: ['', [Validators.required]],
      modalidadLaboral: ['', [Validators.required]],
      nivelEstudios: ['', [Validators.required]],
      profesion: [null, [Validators.required]],
      subNivelLaboral: [''],
      nivelIdioma: [''],
      // sector: ['', [Validators.required]],
      genero: [''],
      mostrarSalario: ['']
    });
  }

  cargarFormularioOferta(): void {
    this.ofertaService.find(this.idOferta).subscribe(response => {
      this.datosOferta = response.body;
      this.formDatosBasicos.patchValue({
        id: this.datosOferta!.id,
        nombre: this.datosOferta!.titulo,
        requisitos: this.datosOferta!.descripcion,
        rangoSalarial: this.datosOferta!.salario,
        areaTrabajo: this.datosOferta!.cargo,
        experiencia: this.datosOferta!.experiencia,
        ciudad: this.datosOferta!.ciudad?.toString(),
        idIdioma: this.datosOferta!.idioma,
        nivelLaboral: this.datosOferta!.nivelLaboral,
        tipoContrato: this.datosOferta!.tipoContrato,
        modalidadLaboral: this.datosOferta!.modalidad,
        nivelEstudios: this.datosOferta!.nivelEstudios,
        profesion: this.datosOferta!.profesion,
        subNivelLaboral: this.datosOferta!.subNivelLaboral,
        nivelIdioma: this.datosOferta!.nivelIdioma,
        // sector: ['', [Validators.required]],
        genero: this.datosOferta!.genero,
        mostrarSalario: this.datosOferta!.mostrarSalario
      });
      const ciudadBD = this.profesiones.find(profesion => profesion.id === this.datosOferta!.profesion);
      this.myControlProfesiones.setValue(ciudadBD?.profesion);
      this.cargarSubnivel(this.formDatosBasicos.value);
    });
  }

  onSubmit(): void {
    this.oferta = new Oferta();
    this.oferta.estado = 'A';
    this.oferta.titulo = this.formDatosBasicos.controls['nombre'].value;
    this.oferta.descripcion = this.formDatosBasicos.controls['requisitos'].value;
    this.oferta.salario = this.formDatosBasicos.controls['rangoSalarial'].value;
    this.oferta.cargo = this.formDatosBasicos.controls['areaTrabajo'].value;
    this.oferta.experiencia = this.formDatosBasicos.controls['experiencia'].value;
    this.oferta.ciudad = this.formDatosBasicos.controls['ciudad'].value;
    this.oferta.area = this.formDatosBasicos.controls['areaTrabajo'].value;
    this.oferta.fechaPublicacion = moment(new Date(), 'YYYY-MMM-DD').subtract(5, 'hours');
    this.oferta.idioma = this.formDatosBasicos.controls['idIdioma'].value;
    this.oferta.nivelLaboral = this.formDatosBasicos.controls['nivelLaboral'].value;
    this.oferta.tipoContrato = this.formDatosBasicos.controls['tipoContrato'].value;
    this.oferta.profesion = this.formDatosBasicos.controls['profesion'].value.id;
    this.oferta.modalidad = this.formDatosBasicos.controls['modalidadLaboral'].value;
    this.oferta.nivelEstudios = this.formDatosBasicos.controls['nivelEstudios'].value;
    this.oferta.subNivelLaboral = this.formDatosBasicos.controls['subNivelLaboral'].value;
    this.oferta.nivelIdioma = this.formDatosBasicos.controls['nivelIdioma'].value;
    this.oferta.genero = this.formDatosBasicos.controls['genero'].value;
    this.oferta.mostrarSalario = this.formDatosBasicos.controls['mostrarSalario'].value;
    if (this.usuario?.userEmpresa) {
      // this.ofertaService.getOfertasEmpresa(this.usuario.userEmpresa).subscribe(ofertaResponse => {
        if (this.usuario?.userEmpresa) {
          this.empresaService.find(this.usuario.userEmpresa).subscribe(RESPONSE => {
            this.oferta.usuario = RESPONSE.body;
            this.datosEmpresa = RESPONSE.body;
            if (this.idOferta === 0) {
              if (this.datosEmpresa?.publicacionesOferta !== 0) {
                this.oferta.activado = true;
                this.ofertaService.create(this.oferta).subscribe(
                  response => {
                    if (response.body !== null && this.datosEmpresa !== null) {
                      const valor = this.datosEmpresa?.publicacionesOferta;
                      if(valor !== undefined){
                        this.datosEmpresa.publicacionesOferta = valor - 1;
                        this.empresaService.update(this.datosEmpresa).subscribe(()=>{});
                      }
                      alertify.set('notifier', 'position', 'top-right');
                      alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                      this.router.navigate(['/controlar-ofertas']);
                    }
                  },
                  () => {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(commonMessages.HTTP_ERROR_LABEL);
                    // this.router.navigate(['/controlar-ofertas']);
                  }
                );
              } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('No es posible publicar más ofertas, debe adquirir un plan!');
                this.router.navigate(['/controlar-ofertas']);
              }
            } else {
              this.oferta.id = this.idOferta;
              this.ofertaService.update(this.oferta).subscribe(
                response => {
                  if (response.body !== null) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                    this.router.navigate(['/controlar-ofertas']);
                  }
                },
                () => {
                  alertify.set('notifier', 'position', 'top-right');
                  alertify.error(commonMessages.HTTP_ERROR_LABEL);
                  // this.router.navigate(['/controlar-ofertas']);
                }
              );
            }
          });
        }
      // });
    }

    this.visualizarOferta = false;
    this.visualizarOfertasCreadas = true;
  }

  cargarCargos(): void {
    this.cargoService
      .query({
        page: 0,
        size: 250
      })
      .subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
  }

  cargarIdiomas(): void {
    this.idiomaService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<IIdioma[]>) => {
        if (res.body !== null) {
          this.idiomas = res.body
            .map(item => {
              return {
                id: item.id,
                idioma: item.idioma
              };
            })
            .sort((a: IIdioma, b: IIdioma) => (a.idioma! > b.idioma! ? 1 : b.idioma! > a.idioma! ? -1 : 0));
        }
      });
  }

  cargarMunicipiosAcademica(): void {
    this.municipiosAcademica = [];
    this.municipiosAcademica = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      this.cargarMunicipiosAcademica();
    });
  }

  traerProfesiones(): void {
    this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProfesiones(value))
    );
  }

  private _filterProfesiones(value: string): IProfesion[] {
    const filterValue = value?.toLowerCase();
    return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
  }

  onSelectionChanged(event: any): void {
    this.profesionState = false;
    this.profesiones.map(option => {
      if (option.profesion === event) {
        this.profesionState = true;
        this.formDatosBasicos.get('profesion')?.setValue(option);
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

  volverOferta(): void {
    this.location.back();
    // this.router.navigate(['..']);
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
    this.router.navigate(['club-empresas']);
  }

  vistaPreliminarOferta(): void {
    // eslint-disable-next-line no-console
    console.log(this.formDatosBasicos);
    this.visualizarOferta = true;
    this.descripcionOferta = this.formDatosBasicos.controls['requisitos'].value;
    this.profesionOferta = this.formDatosBasicos.controls['profesion'].value.profesion;
    this.tituloOferta = this.formDatosBasicos.controls['nombre'].value;
    this.mostrarSalario = this.formDatosBasicos.controls['mostrarSalario'].value;
    this.tiposContrato.forEach(element => {
      if (element.codigo === this.formDatosBasicos.controls['tipoContrato'].value) {
        this.contratoOferta = element.nombre;
      }
    });
    this.experienciasLaborales.forEach(element => {
      if (element.codigo === this.formDatosBasicos.controls['experiencia'].value) {
        this.experienciaOferta = element.nombre;
      }
    });
    this.aspiracionesSalariales.forEach(element => {
      if (element.codigo === this.formDatosBasicos.controls['rangoSalarial'].value) {
        this.salarioOferta = element.nombre;
      }
    });

    this.municipiosPersonal.forEach(element => {
      if (element.codigo === this.formDatosBasicos.controls['ciudad'].value) {
        this.ciudadOferta = element.nombre;
      }
    });

    const f = new Date();
    // eslint-disable-next-line no-console
    console.log(f);
    const mes = f.getMonth() + 1;
    this.publicadoOFerta = f.getDate() + '-' + mes + '-' + f.getFullYear();
  }

  volverCrearOferta(): void {
    this.visualizarOferta = false;
  }
}
