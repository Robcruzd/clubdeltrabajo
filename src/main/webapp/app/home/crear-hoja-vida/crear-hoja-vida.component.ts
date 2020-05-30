import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICargo } from 'app/shared/model/cargo.model';
import { IDependencia } from 'app/shared/model/dependencia.model';
import { IInstitucion } from 'app/shared/model/institucion.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CargoService } from '../../entities/cargo/cargo.service';
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
import { TipoUsuario } from '../../shared/model/tipo-usuario.model';
import { ApiService } from '../../shared/services/api.service';
import { HojaVidaService } from '../../shared/services/hoja-vida.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { HojaVidaVo } from '../../shared/vo/hoja-vida-vo';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';

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
  hojaVidaVo!: HojaVidaVo | null;
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

    this.globalForm = this.crearFormularioGeneral();
    this.consultarInformacionGeografica();
    this.cargarPaises();
    this.cargarTipoDocumento();
    this.cargarDiscapacidades();
    this.cargarIdiomas();
    this.cargarNivelIdioma();
    this.cargarInstituciones();
    this.cargarDependencias();
    this.cargarCargos();
    this.crearFormularioInformacionPersonal();
    this.crearFormularioPerfil();
    this.getHojaVida();
  }

  getHojaVida(): void {
    this.service.find(1).subscribe(response => {
      this.hojaVidaVo = response.body;
      this.updateForm(response.body);
    });
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
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
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
      cargo: [null]
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

  updateForm(hojaVida: HojaVidaVo | null): void {
    if (hojaVida === null) {
      return;
    }

    // Cargar informacion personal
    this.formPersonal.patchValue({
      id: hojaVida.informacionPersonal.id,
      nombre: hojaVida.persona.nombre,
      apellidos: hojaVida.persona.apellido,
      fechaNacimiento: {
        dia: this.getDia(hojaVida.informacionPersonal.fechaNacimiento),
        mes: this.getMes(hojaVida.informacionPersonal.fechaNacimiento),
        anio: this.getAnio(hojaVida.informacionPersonal.fechaNacimiento)
      },
      tipoDocumento: hojaVida.persona.tipoDocumento,
      numeroDocumento: hojaVida.persona.numeroDocumento,
      lugarNacimiento: hojaVida.informacionPersonal.lugarNacimiento,
      direccionResidencia: hojaVida.informacionPersonal.direccionResidencia,
      genero: hojaVida.informacionPersonal.genero,
      ciudad: hojaVida.informacionPersonal.ciudad,
      telefono: hojaVida.informacionPersonal.telefono,
      email: hojaVida.persona.email,
      discapacidad: hojaVida.informacionPersonal.discapacidad,
      redesSociales: hojaVida.informacionPersonal.redesSociales,
      perfilProfesional: hojaVida.informacionPersonal.perfilProfesional,
      licencenciaConduccion: hojaVida.informacionPersonal.licencenciaConduccion
    });

    // cargar perfil profesional
    this.formPerfil.patchValue({ perfilProfesional: hojaVida.informacionPersonal.perfilProfesional });

    // cargar Informacion Academica
    this.informacionAcademica.clear();
    for (let index = 0; index < hojaVida.informacionAcademica.length; index++) {
      this.addItemInformacionAcademica();
      const academica = hojaVida.informacionAcademica[index];
      this.informacionAcademica.at(index).patchValue({
        id: academica.id,
        nivelEstudio: academica.nivelEstudio,
        estado: academica.estado,
        fechaInicio: {
          dia: this.getDia(academica.fechaInicio),
          mes: this.getMes(academica.fechaInicio),
          anio: this.getAnio(academica.fechaInicio)
        },
        fechaFin: {
          dia: this.getDia(academica.fechaFin),
          mes: this.getMes(academica.fechaFin),
          anio: this.getAnio(academica.fechaFin)
        },
        tituloOtorgado: academica.tituloOtorgado,
        usuario: academica.usuario,
        institucion: academica.institucion
      });
    }

    // cargar idiomas
    this.idioma.clear();
    for (let index = 0; index < hojaVida.idiomas.length; index++) {
      this.addItemIdioma();
      const idioma = hojaVida.idiomas[index];
      this.idioma.at(index).setValue(idioma);
    }

    // cargar Experiencia laboral
    this.experienciaLaboral.clear();
    for (let index = 0; index < hojaVida.experienciaLaboral.length; index++) {
      this.addItemExperienciaLaboral();
      const experiencia = hojaVida.experienciaLaboral[index];
      this.experienciaLaboral.at(index).patchValue({
        id: experiencia.id,
        nombreEmpresa: experiencia.nombreEmpresa,
        fechaInicio: {
          dia: this.getDia(experiencia.fechaInicio),
          mes: this.getMes(experiencia.fechaInicio),
          anio: this.getAnio(experiencia.fechaInicio)
        },
        fechaFin: {
          dia: this.getDia(experiencia.fechaFin),
          mes: this.getMes(experiencia.fechaFin),
          anio: this.getAnio(experiencia.fechaFin)
        },
        direccion: experiencia.direccion,
        cuidad: experiencia.cuidad,
        departamento: experiencia.departamento,
        pais: experiencia.pais,
        telefonoEmpresa: experiencia.telefonoEmpresa,
        usuario: experiencia.usuario,
        dependencia: experiencia.dependencia,
        cargo: experiencia.cargo
      });
    }
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
    this.hojaVidaVo.persona = this.procesarPersona();

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

  procesarPersona(): IPersona {
    return {
      ...new Persona(),
      id: 1,
      nombre: this.formPersonal.get(['nombre'])!.value,
      apellido: this.formPersonal.get(['apellido'])!.value,
      email: this.formPersonal.get(['email'])!.value,
      tipoDocumento: this.formPersonal.get(['tipoDocumento'])!.value,
      numeroDocumento: this.formPersonal.get(['numeroDocumento'])!.value,
      tipoUsuario: new TipoUsuario(1)
    };
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
      discapacidad: this.formPersonal.get(['discapacidad'])!.value.codigo,
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

  getDia(fecha: any): number | null {
    const date = moment(fecha, DATE_FORMAT);
    return date ? Number(date.format('D')) : null;
  }

  getMes(fecha: any): number | null {
    const date = moment(fecha, DATE_FORMAT);
    return date ? Number(date.format('M')) : null;
  }

  getAnio(fecha: any): number | null {
    const date = moment(fecha, DATE_FORMAT);
    return date ? Number(date.format('YYYY')) : null;
  }

  cargarPaises(): void {
    this.apiService.getPaises().subscribe(response => (this.paises = response));
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
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

  cargarTipoDocumento(): void {
    this.tipoDocumentoService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<ITipoDocumento[]>) => (this.documentos = res.body || []));
  }

  cargarInstituciones(): void {
    this.institucionService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<IInstitucion[]>) => (this.instituciones = res.body || []));
  }

  cargarDependencias(): void {
    this.dependeciaService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<IDependencia[]>) => (this.dependencias = res.body || []));
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
