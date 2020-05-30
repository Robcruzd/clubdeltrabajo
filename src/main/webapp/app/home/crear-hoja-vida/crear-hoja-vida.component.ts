import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDependencia } from 'app/shared/model/dependencia.model';
import { IInstitucion } from 'app/shared/model/institucion.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DependenciaService } from '../../entities/dependencia/dependencia.service';
import { IdiomaService } from '../../entities/idioma/idioma.service';
import { InstitucionService } from '../../entities/institucion/institucion.service';
import { TipoDocumentoService } from '../../entities/tipo-documento/tipo-documento.service';
import { commonMessages } from '../../shared/constants/commonMessages';
import { DATE_FORMAT } from '../../shared/constants/input.constants';
import { Archivo, IArchivo } from '../../shared/model/archivo.model';
import { IIdioma } from '../../shared/model/idioma.model';
import { IInformacionAcademica, InformacionAcademica } from '../../shared/model/informacion-academica.model';
import { IInformacionLaboral, InformacionLaboral } from '../../shared/model/informacion-laboral.model';
import { IInformacionPersonal, InformacionPersonal } from '../../shared/model/informacion-personal.model';
import { IPersonaIdioma, PersonaIdioma } from '../../shared/model/persona-idioma.model';
import { IPersona, Persona } from '../../shared/model/persona.model';
import { ITipoDocumento } from '../../shared/model/tipo-documento.model';
import { ApiService } from '../../shared/services/api.service';
import { HojaVidaService } from '../../shared/services/hoja-vida.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { HojaVidaVo } from '../../shared/vo/hoja-vida-vo';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from '../../entities/cargo/cargo.service';

@Component({
  selector: 'jhi-crear-hoja-vida',
  templateUrl: './crear-hoja-vida.component.html',
  styleUrls: ['./crear-hoja-vida.component.scss']
})
export class CrearHojaVidaComponent implements OnInit {
  labels = commonMessages;
  globalForm!: FormGroup;
  formPersonal!: FormGroup;
  formPerfil!: FormGroup;
  step!: number;
  geografia: Array<GeografiaVo> = [];
  paises: Array<IOpcionVo> = [];
  departamentos: Array<IOpcionVo> = [];
  municipios: Array<IOpcionVo> = [];
  discapacidades: Array<IOpcionVo> = [];
  documentos: Array<ITipoDocumento> = [];
  dias: number[] = this.apiService.getDias();
  meses: number[] = this.apiService.getMeses();
  anios: number[] = this.apiService.getAnios();
  nivelEstudio: IOpcionVo[] = this.apiService.getNivelEstudio();
  estadoNivelEstudio: IOpcionVo[] = this.apiService.getEstadoNivelEstudio();
  idiomas: Array<IIdioma> = [];
  nivelIdioma: Array<IOpcionVo> = [];
  archivos: Array<IArchivo> = [];
  tipoArchivo = TipoArchivo;
  mostrar!: boolean;
  hojaVidaVo!: HojaVidaVo;
  instituciones: Array<IInstitucion> = [];
  dependencias: Array<IDependencia> = [];
  cargos: Array<ICargo> = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private tipoDocumentoService: TipoDocumentoService,
    private idiomaService: IdiomaService,
    private service: HojaVidaService,
    private institucionService: InstitucionService,
    private dependeciaService: DependenciaService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.step = 0;
    this.mostrar = false;

    this.cargarPaises();
    this.cargarDocumentos();
    this.cargarDiscapacidades();
    this.cargarIdiomas();
    this.cargarNivelIdioma();
    this.cargarInstituciones();
    this.cargarDependencias();
    this.cargarCargos();
    this.globalForm = this.crearFormularioGeneral();
    this.crearFormularioInformacionPersonal();
    this.crearFormularioPerfil();
    this.consultarInformacionGeografica();
  }

  crearFormularioGeneral(): FormGroup {
    return this.fb.group({
      informacionAcademica: this.fb.array([this.crearItemInformacionAcademica()]),
      idioma: this.fb.array([this.crearItemIdioma()]),
      experienciaLaboral: this.fb.array([this.crearItemExperienciaLaboral()])
    });
  }

  crearFormularioInformacionPersonal(): void {
    this.formPersonal = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      documento: this.fb.group({
        tipoDocumento: [null, [Validators.required]],
        numeroDocumento: ['', [Validators.required]]
      }), // numero documento
      fechaNacimiento: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      lugarNacimiento: [''],
      direccionResidencia: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      ciudad: [null, [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      discapacidad: [null],
      redesSociales: [''],
      perfilProfesional: [''],
      licencenciaConduccion: [null]
    });
  }

  crearItemInformacionAcademica(): FormGroup {
    return this.fb.group({
      id: [''],
      nivelEstudio: [null, [Validators.required]],
      estado: [null],
      fechaInicio: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      fechaFin: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      tituloOtorgado: [''],
      usuario: [''],
      idioma: [''],
      nivelIdioma: [''],
      institucion: [null]
    });
  }

  addItemInformacionAcademica(): void {
    this.informacionAcademica.push(this.crearItemInformacionAcademica());
  }

  crearItemIdioma(): FormGroup {
    return this.fb.group({
      id: [null],
      idPersona: [null],
      idIdioma: [null],
      nivel: [null]
    });
  }

  addItemIdioma(): void {
    this.idioma.push(this.crearItemIdioma());
  }

  crearItemExperienciaLaboral(): FormGroup {
    return this.fb.group({
      id: [''],
      nombreEmpresa: [''],
      fechaInicio: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      fechaFin: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      direccion: [''],
      cuidad: [null],
      departamento: [null],
      pais: [null],
      telefonoEmpresa: [''],
      usuario: [''],
      dependencia: [null],
      cargo: [null],
      certificado: [null]
    });
  }

  addItemExperienciaLaboral(): void {
    this.experienciaLaboral.push(this.crearItemExperienciaLaboral());
  }

  crearFormularioPerfil(): void {
    this.formPerfil = this.fb.group({
      perfilProfesional: ['', [Validators.required]]
    });
  }

  nextStep(): void {
    if (this.step === 3) return;
    this.step++;
  }

  previousStep(): void {
    if (this.step === 0) return;
    this.step--;
  }

  onSubmit(): void {
    this.hojaVidaVo = new HojaVidaVo();

    // cargar informacion personal
    this.hojaVidaVo.informacionPersonal = this.procesarInformacionPersonal();

    // cargar informacion academica
    const academica: IInformacionAcademica[] = [];
    for (let index = 0; index < this.informacionAcademica.length; index++) {
      academica.push(this.procesarInformacionAcademica(this.informacionAcademica.at(index).value));
    }
    this.hojaVidaVo.informacionAcademica = academica;

    // cargar idiomas
    const idioma: IPersona[] = [];
    for (let index = 0; index < this.idioma.length; index++) {
      idioma.push(this.procesarIdiomas(this.idioma.at(index).value));
    }
    this.hojaVidaVo.idiomas = idioma;

    // cargar informacion laboral
    const laboral: IInformacionLaboral[] = [];
    for (let index = 0; index < this.experienciaLaboral.length; index++) {
      laboral.push(this.procesarExperienciaLaboral(this.experienciaLaboral.at(index).value));
    }
    this.hojaVidaVo.experienciaLaboral = laboral;
    this.mostrar = true;
    this.service.create(this.hojaVidaVo).subscribe(response => {
      if (response.body) this.hojaVidaVo = response.body;
    });
  }

  procesarInformacionPersonal(): IInformacionPersonal {
    return {
      ...new InformacionPersonal(),
      id: this.formPersonal.get(['id'])!.value,
      fechaNacimiento: this.getFecha(this.formPersonal.get(['fechaNacimiento'])!.value),
      lugarNacimiento: this.formPersonal.get(['lugarNacimiento'])!.value,
      direccionResidencia: this.formPersonal.get(['direccionResidencia'])!.value,
      genero: this.formPersonal.get(['genero'])!.value,
      ciudad: this.formPersonal.get(['ciudad'])!.value.codigo as number,
      telefono: this.formPersonal.get(['telefono'])!.value,
      discapacidad: this.formPersonal.get(['discapacidad'])!.value,
      redesSociales: this.formPersonal.get(['redesSociales'])!.value,
      licencenciaConduccion: this.formPersonal.get(['licencenciaConduccion'])!.value,
      perfilProfesional: this.formPerfil.get(['perfilProfesional'])!.value,
      usuario: new Persona(1)
    };
  }

  procesarInformacionAcademica(academica: Object): IInformacionAcademica {
    return {
      ...new InformacionAcademica(),
      id: academica['id'],
      nivelEstudio: academica['nivelEstudio'] ? (academica['nivelEstudio'].codigo as number) : undefined,
      estado: academica['estado'] ? (academica['estado'].codigo as number) : undefined,
      fechaInicio: this.getFecha(academica['fechaInicio']),
      fechaFin: this.getFecha(academica['fechaFin']),
      tituloOtorgado: academica['tituloOtorgado'],
      usuario: new Persona(1),
      institucion: academica['institucion']
    };
  }

  procesarExperienciaLaboral(experiencia: Object): IInformacionLaboral {
    return {
      ...new InformacionLaboral(),
      id: experiencia['id'],
      nombreEmpresa: experiencia['nombreEmpresa'],
      fechaInicio: this.getFecha(experiencia['fechaInicio']),
      fechaFin: this.getFecha(experiencia['fechaFin']),
      direccion: experiencia['direccion'],
      cuidad: experiencia['cuidad'] ? (experiencia['cuidad'].codigo as number) : undefined,
      departamento: experiencia['departamento'] ? (experiencia['departamento'].codigo as number) : undefined,
      pais: experiencia['pais'] ? this.getPaisPorCodigo(experiencia['pais'].codigo) : undefined,
      telefonoEmpresa: experiencia['telefonoEmpresa'],
      usuario: new Persona(1),
      dependencia: experiencia['dependencia'],
      cargo: experiencia['cargo']
    };
  }

  getPaisPorCodigo(codigo: string): number {
    return this.paises.findIndex(pais => pais.codigo === codigo);
  }

  getPaisPorIndice(indice: number): IOpcionVo {
    return this.paises[indice];
  }

  procesarIdiomas(idioma: Object): IPersonaIdioma {
    return {
      ...new PersonaIdioma(),
      id: idioma['id'],
      nivel: idioma['nivel'] ? idioma['nivel'].codigo : undefined,
      idPersona: new Persona(1),
      idIdioma: idioma['idIdioma']
    };
  }

  getFecha(fecha: Object): Moment {
    const dia = fecha['dia'] < 10 ? '0' + fecha['dia'] : fecha['dia'];
    const mes = fecha['mes'] < 10 ? '0' + fecha['mes'] : fecha['mes'];
    const anio = fecha['anio'];

    return moment(`${anio}/${mes}/${dia}`, DATE_FORMAT);
  }

  cargarPaises(): void {
    this.apiService.getPaises().subscribe(response => (this.paises = response));
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(response => {
      this.geografia = response;
      this.cargarDepartamentos();
      this.cargarMunicipios({});
    });
  }

  cargarDepartamentos(): void {
    this.departamentos = this.geografia
      .filter(this.filterUnique)
      .map(item => {
        return {
          codigo: item.codigoDpto,
          nombre: item.nombreDpto
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
  }

  filterUnique(value: GeografiaVo, index: number, self: GeografiaVo[]): boolean {
    return self.findIndex(item => item.codigoDpto === value.codigoDpto) === index;
  }

  cargarMunicipios(value: Object): void {
    this.municipios = [];
    if (this.step === 0) {
      this.municipios = this.geografia.map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      });
    } else if (value && Object.entries(value).length > 0) {
      this.municipios = this.geografia
        .filter(item => item.codigoDpto === value['departamento'].codigo)
        .map(item => {
          return {
            codigo: item.codigoMpio,
            nombre: item.nombreMpio
          };
        });
    }
  }

  cargarDiscapacidades(): void {
    this.discapacidades = this.apiService.getDiscapacidades();
  }

  cargarDocumentos(): void {
    this.tipoDocumentoService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<ITipoDocumento[]>) => this.onSuccessTipoDocumento(res.body));
  }

  onSuccessTipoDocumento(data: ITipoDocumento[] | null): void {
    this.documentos = data || [];
  }

  cargarInstituciones(): void {
    this.institucionService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<IInstitucion[]>) => this.onSuccessInstitucion(res.body));
  }

  onSuccessInstitucion(data: IInstitucion[] | null): void {
    this.instituciones = data || [];
  }

  cargarDependencias(): void {
    this.dependeciaService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<IDependencia[]>) => this.onSuccessDependencia(res.body));
  }

  onSuccessDependencia(data: IDependencia[] | null): void {
    this.dependencias = data || [];
  }

  cargarCargos(): void {
    this.cargoService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<ICargo[]>) => this.onSuccessCargo(res.body));
  }

  onSuccessCargo(data: ICargo[] | null): void {
    this.cargos = data || [];
  }

  cargarIdiomas(): void {
    this.idiomaService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<IIdioma[]>) => this.onSuccessIdioma(res.body));
  }

  onSuccessIdioma(data: IIdioma[] | null): void {
    this.idiomas = data || [];
  }

  cargarNivelIdioma(): void {
    this.nivelIdioma = this.apiService.getNivelIdioma();
  }

  // cargar archivos
  addArchivo(event: any, tipoDocumento: number): void {
    const file: File = event.target.files[0];
    const archivo = new Archivo();
    archivo.tipo = tipoDocumento;
    archivo.nombre = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      archivo.archivo = reader.result;
      this.archivos.push(archivo);
    };
  }

  // getters
  get informacionPersonal(): FormArray {
    return this.globalForm.get('informacionPersonal') as FormArray;
  }

  get informacionAcademica(): FormArray {
    return this.globalForm.get('informacionAcademica') as FormArray;
  }

  get idioma(): FormArray {
    return this.globalForm.get('idioma') as FormArray;
  }

  get experienciaLaboral(): FormArray {
    return this.globalForm.get('experienciaLaboral') as FormArray;
  }
}
