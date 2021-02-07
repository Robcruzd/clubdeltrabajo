import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../../entities/cargo/cargo.service';
import { commonMessages } from '../../shared/constants/commonMessages';
import { ICargo } from 'app/shared/model/cargo.model';
import { HttpResponse } from '@angular/common/http';
import { IlistarOfertas, IOpcionVo } from '../../shared/vo/opcion-vo';
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
import { Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { IRegiones } from 'app/shared/model/regiones.model';

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
  nivelIdioma: IOpcionVo[] = commonMessages.ARRAY_NIVEL_IDIOMA_PORCENTAJE;
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
  nivelesLaborales: IOpcionVo[] = commonMessages.ARRAY_NIVEL_LABORAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  no_publicar: any;
  genero: any;
  visualizarOferta = false;
  visualizarOfertasCreadas = false;
  descripcionOferta = "";
  profesionOferta : any;
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
    private regionService: RegionesService
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    // this.formDatosBasicos = new FormGroup({
    //   nombre: new FormControl(),
    //   experiencia: new FormControl(),
    //   areaTrabajo: new FormControl(),
    //   rangoSalarial: new FormControl(),
    //   idIdioma: new FormControl(),
    //   tipoContrato: new FormControl(),
    //   modalidadLaboral: new FormControl(),
    //   nivelEstudios: new FormControl(),
    //   requisitos: new FormControl(),
    //   ciudad: new FormControl()
    // });
    this.crearFormularioOferta();
    this.cargarCargos();
    this.cargarIdiomas();
    this.consultarInformacionGeografica();
    this.cargarProfesiones();
    this.traerProfesiones();
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
        // this.region = res.body || [];
        // this.data = res.body;
        // this.dataCiudades = this.data;
        // this.filteredOptionsCiudades = this.myControlCiudades.valueChanges.pipe(
        //   startWith(''),
        //   map(value => this._filterCiudades(value))
        // );
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

  private _filterCiudades(value: string): string[] {
    this.ciudades = [];
    const filterValue = value.toLowerCase();
    for (const valor of this.data) {
      this.ciudades.push(valor.municipio + ' (' + valor.departamento + ')');
    }
    return this.ciudades.filter(option => option.toLowerCase().startsWith(filterValue)).sort();
  }

  crearFormularioOferta(): void {
    this.formDatosBasicos = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      requisitos: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      rangoSalarial: ['', [Validators.required]],
      areaTrabajo: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      idIdioma: ['', [Validators.required]],
      nivelLaboral: ['', [Validators.required]],
      tipoContrato: ['', [Validators.required]],
      modalidadLaboral: ['', [Validators.required]],
      nivelEstudios: ['', [Validators.required]],
      profesion: [null, [Validators.required]],
      subNivelLaboral: [''],
      nivelIdioma: [''],
      // sector: ['', [Validators.required]],
      genero: ['']
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
    this.oferta.fechaPublicacion = moment(new Date(), 'YYYY-MMM-DD');
    this.oferta.idioma = this.formDatosBasicos.controls['idIdioma'].value;
    this.oferta.nivelLaboral = this.formDatosBasicos.controls['nivelLaboral'].value;
    this.oferta.tipoContrato = this.formDatosBasicos.controls['tipoContrato'].value;
    this.oferta.profesion = this.formDatosBasicos.controls['profesion'].value.id;
    this.oferta.modalidad = this.formDatosBasicos.controls['modalidadLaboral'].value;
    this.oferta.nivelEstudios = this.formDatosBasicos.controls['nivelEstudios'].value;
    this.oferta.subNivelLaboral = this.formDatosBasicos.controls['subNivelLaboral'].value;
    this.oferta.nivelIdioma = this.formDatosBasicos.controls['nivelIdioma'].value;
    this.oferta.genero = this.formDatosBasicos.controls['genero'].value;
    
    if (this.usuario?.userEmpresa) {
      this.empresaService.find(this.usuario.userEmpresa).subscribe(RESPONSE => {
        this.oferta.usuario = RESPONSE.body;
        // this.ofertaService.create(this.oferta).subscribe(() => {
          this.ofertaService.getOfertasEmpresa(this.oferta).subscribe(OFERTAS =>{
            this.listaOfertas = OFERTAS;
            this.listaOfertas.forEach(element => {
              const salarioBD = this.aspiracionesSalariales.find( salario => salario.codigo === element.salario );
              const ciudadBD = this.municipiosPersonal.find( ciudad => ciudad.codigo === element.ciudad?.toString() );
              this.profesionService.find(element.profesion).subscribe(PROFESIONES =>{
                this.listaOFertasCreadas.push({
                  profesion: PROFESIONES.body?.profesion,
                  salario: salarioBD?.nombre,
                  ciudad: ciudadBD?.nombre,
                  activado: element?.activado
                })
              });
            });
          });
        // });
      });
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
      const bogota = { codigoDpto: '100', nombreDpto: 'Bogotá D.C.', codigoMpio: '100000', nombreMpio: 'Bogotá D.C.' };
      this.geografia.push(bogota);
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
    const filterValue = value.toLowerCase();
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

  vistaPreliminarOferta(): void {
    this.visualizarOferta = true;
    this.descripcionOferta = this.formDatosBasicos.controls['requisitos'].value;
    this.profesionOferta = this.formDatosBasicos.controls['profesion'].value.profesion;
    this.tituloOferta = this.formDatosBasicos.controls['nombre'].value;
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
    this.publicadoOFerta = f.getDate() + '-' + f.getMonth() + '-' + f.getFullYear();
  }

  volverCrearOferta(): void {
    this.visualizarOferta = false;
  }
}
