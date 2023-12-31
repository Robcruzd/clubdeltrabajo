/* eslint-disable @typescript-eslint/camelcase */
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { IProfesion } from 'app/shared/model/profesion.model';
import { IInstitucion } from 'app/shared/model/institucion.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AccountService } from '../../core/auth/account.service';
import { CargoService } from '../../entities/cargo/cargo.service';
import { ProfesionService } from '../../entities/profesion/profesion.service';
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
import { GeografiaVo, PaisesVo } from '../../shared/vo/geografia-vo';
import { HojaVidaVo } from '../../shared/vo/hoja-vida-vo';
import { IOpcionVo, IOpcionVoDescripcion } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { ArchivoService } from '../../entities/archivo/archivo.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IRegiones } from 'app/shared/model/regiones.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { PersonaService } from 'app/entities/persona/persona.service';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { PaisesService } from 'app/entities/paises/paises.service';
import { IPaises } from 'app/shared/model/paises.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

declare let alertify: any;

/* eslint-disable */

@Component({
  selector: 'jhi-crear-hoja-vida',
  templateUrl: './crear-hoja-vida.component.html',
  styleUrls: ['./crear-hoja-vida.component.scss']
})
export class CrearHojaVidaComponent implements OnInit {
  cmCrearHojaVida: any = null;
  globalForm!: FormGroup;
  formPersonal!: FormGroup;
  formPerfil!: FormGroup;
  anioExperiencia!: FormControlName;
  mesExperiencia!: FormControlName;
  trabajoActual!: FormControlName;
  step!: number;
  geografia: Array<GeografiaVo> = [];
  paises: Array<PaisesVo> = [];
  departamentos: Array<IOpcionVo> | undefined = [];
  municipios: Array<IOpcionVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  municipiosAcademica: Array<IOpcionVo> = [];
  documentos: Array<ITipoDocumento> = [];
  dias: number[] = this.apiService.getDias();
  meses: number[] = this.apiService.getMeses();
  anios: number[] = this.apiService.getAnios();
  idiomas: Array<IIdioma> = [];
  archivos: Array<IArchivo> = [];
  tipoArchivo = TipoArchivo;
  mostrar!: boolean;
  hojaVidaVo!: HojaVidaVo | null;
  hojaVidaTemp!: HojaVidaVo | null;
  instituciones: Array<IInstitucion> = [];
  cargos: Array<ICargo> = [];
  profesiones: Array<IProfesion> = [];
  account!: Account | null;
  persona!: number;
  redSocial = ' ';
  cargando = true;
  CEDULA_REGEX = '^[0-9]{6,18}$';
  mensajeDocumento: any = '*El documento debe contener de 6 a 18 números';
  mensajeArchivoDoc: any = '';
  mensajeArchivoTitulo: any = '';
  cargandoDeshabilitado: any = false;

  colorMudarse: any | null;
  colorViajar: any | null;
  valorMudarme = false;
  valorViajar = false;
  banderaColorMudarse = false;
  banderaColorViajar = false;
  cargoElement = false;
  aniosFin: number[] = [];
  mesFin: number[] = [];
  diasFin: number[] = [];
  archivosaws: any = [];

  cargadoDocumento = false;
  cargadoLicencia = false;
  archivosCargadosIAcademica: Array<number> = [];
  archivosCargadosILaboral: Array<number> = [];

  //profesiones: string[] = ['Diseño grafico', 'Ingenieria de sistemas', 'Ingenieria electronica', 'Nutricion'];
  myControlProfesiones = new FormControl();
  filteredOptionsProfesiones = new Observable<IProfesion[]>();
  profesionState: Boolean = false;
  personaDatos!: Persona | null;

  labels = commonMessages;
  lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
  nivelCargo: IOpcionVo[] = commonMessages.ARRAY_NIVEL_CARGO;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  redesSociales: Array<IOpcionVo> = commonMessages.ARRAY_REDES_SOCIALES;
  nivelIdioma: Array<IOpcionVo> = commonMessages.ARRAY_NIVEL_IDIOMA;
  tipoLicenciaConduccion: Array<IOpcionVoDescripcion> = commonMessages.ARRAY_TIPOS_LICENCIA_CONDUCCION;
  aniosExperiencia: IOpcionVo[] = commonMessages.ARRAY_ANIOS_EXPERIENCIA;
  mesesExperiencia: IOpcionVo[] = commonMessages.ARRAY_MESES_EXPERIENCIA;
  nivelEstudio: IOpcionVo[] = commonMessages.ARRAY_NIVEL_ESTUDIOS;
  nivelEducativoProfesion: IOpcionVo[] = commonMessages.ARRAY_NIVEL_EDUCATIVO_PROFESION;
  estadoNivelEstudio: IOpcionVo[] = commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  discapacidades: Array<IOpcionVo> = commonMessages.ARRAY_DISCAPACIDADES;
  estadosCiviles: Array<IOpcionVo> = commonMessages.ARRAY_ESTADOS_CIVILES;
  Danger_telefono = commonMessages.DANGER_TELEFONO;
  Danger_mail = commonMessages.DANGER_CORREO;
  Danger_profesion = commonMessages.DANGER_PROFESION;
  Quitar_Estudio = commonMessages.QUITAR_ESTUDIO;
  Quitar_idioma = commonMessages.QUITAR_IDIOMA;
  Perfil_Profesional = commonMessages.PERFIL_PROFESIONAL;
  EXP_ANIOS = commonMessages.EXPERIENCIA_ANIOS;
  Meses = commonMessages.MESES;
  Asp_Salarial = commonMessages.ASPIRACION_SALARIAL;
  Selec_Option = commonMessages.SELECCIONE_OPCION_LABEL;
  Movilidad_laboral = commonMessages.MOVILIDAD_LABORAL;
  Permiso_trabajo = commonMessages.PERMISO_TRABAJO_PAISES;
  Danger_Long_Telefono = commonMessages.DANGER_LONG_TELEFONO;
  Nivel_cargo = commonMessages.NIVEL_CARGO;
  Estado_Empleo = commonMessages.ESTADO_EMPLEO;
  Empresa_Actual = commonMessages.EMPRESA_ACTUAL;
  Quitar_experiencia = commonMessages.QUITAR_EXPERIENCIA;
  Ciudad_estudio = commonMessages.CIUDAD_ESTUDIO;
  Anios = commonMessages.ANIOS;
  faTrash = faTrash;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private tipoDocumentoService: TipoDocumentoService,
    private idiomaService: IdiomaService,
    private service: HojaVidaService,
    private institucionService: InstitucionService,
    private cargoService: CargoService,
    private profesionService: ProfesionService,
    private accountService: AccountService,
    private router: Router,
    private archivo: ArchivoService,
    private regionService: RegionesService,
    private personaService: PersonaService,
    private commonMessagesService: CommonMessagesService,
    private paisesService: PaisesService,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmCrearHojaVida'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmCrearHojaVida = mensajes;
          this.updateVariables();
          this.cargarInformacion();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmCrearHojaVida = 0;
          this.cargarInformacion();
        }
      );
  }

  cargarInformacion(): void {
    this.documentos;
    this.step = 0;
    this.mostrar = false;
    this.cargarCuentaUsuario();
    this.globalForm = this.crearFormularioGeneral();
    this.informacionAcademica
      .at(0)
      .get(['fechaFin'])
      ?.disable();
    this.consultarInformacionGeografica();
    this.cargarPaises();
    this.cargarTipoDocumento();
    this.cargarIdiomas();
    this.cargarInstituciones();
    this.cargarCargos();
    this.cargarProfesiones();
    this.traerProfesiones();
    this.cargarAniosFin(0, 0);
    this.crearFormularioInformacionPersonal();
    this.crearFormularioPerfil();
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.labels = this.cmCrearHojaVida;
    this.lblSeleccioneProfesion = commonData.SELECCIONE_PROFESION_LABEL;
    this.nivelCargo = commonData.ARRAY_NIVEL_CARGO;
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.redesSociales = commonData.ARRAY_REDES_SOCIALES;
    this.nivelIdioma = commonData.ARRAY_NIVEL_IDIOMA;
    this.tipoLicenciaConduccion = commonData.ARRAY_TIPOS_LICENCIA_CONDUCCION;
    this.aniosExperiencia = commonData.ARRAY_ANIOS_EXPERIENCIA;
    this.mesesExperiencia = commonData.ARRAY_MESES_EXPERIENCIA;
    this.nivelEstudio = commonData.ARRAY_NIVEL_ESTUDIOS;
    this.nivelEducativoProfesion = commonData.ARRAY_NIVEL_EDUCATIVO_PROFESION;
    this.estadoNivelEstudio = commonData.ARRAY_ESTADO_NIVEL_ESTUDIO;
    this.discapacidades = commonData.ARRAY_DISCAPACIDADES;
    this.estadosCiviles = commonData.ARRAY_ESTADOS_CIVILES;
    this.Danger_telefono = this.cmCrearHojaVida.DANGER_TELEFONO;
    this.Danger_mail = this.cmCrearHojaVida.DANGER_CORREO;
    this.Danger_profesion = this.cmCrearHojaVida.DANGER_PROFESION;
    this.Quitar_Estudio = this.cmCrearHojaVida.QUITAR_ESTUDIO;
    this.Quitar_idioma = this.cmCrearHojaVida.QUITAR_IDIOMA;
    this.Perfil_Profesional = this.cmCrearHojaVida.PERFIL_PROFESIONAL;
    this.EXP_ANIOS = this.cmCrearHojaVida.EXPERIENCIA_ANIOS;
    this.Meses = this.cmCrearHojaVida.MESES;
    this.Asp_Salarial = this.cmCrearHojaVida.ASPIRACION_SALARIAL;
    this.Selec_Option = this.cmCrearHojaVida.SELECCIONE_OPCION_LABEL;
    this.Movilidad_laboral = this.cmCrearHojaVida.MOVILIDAD_LABORAL;
    this.Permiso_trabajo = this.cmCrearHojaVida.PERMISO_TRABAJO_PAISES;
    this.Danger_Long_Telefono = this.cmCrearHojaVida.DANGER_LONG_TELEFONO;
    this.Nivel_cargo = this.cmCrearHojaVida.NIVEL_CARGO;
    this.Estado_Empleo = this.cmCrearHojaVida.ESTADO_EMPLEO;
    this.Empresa_Actual = this.cmCrearHojaVida.EMPRESA_ACTUAL;
    this.Quitar_experiencia = this.cmCrearHojaVida.QUITAR_EXPERIENCIA;
  }

  private _filterProfesiones(value: string): IProfesion[] {
    const filterValue = value.toLowerCase();
    return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
  }

  private _filterProfesionObject(value: string): IProfesion {
    const filterValue = value.toLowerCase().trim();
    return this.profesiones.filter(option => option.profesion?.toLowerCase().trim() === filterValue)[0];
  }

  traerProfesiones(): void {
    this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProfesiones(value))
    );
  }

  onSelectionChanged(event: any) {
    this.profesionState = false;
    let bandera = 0;
    this.profesiones.map(option => {
      if (option.profesion === event) {
        bandera++;
      }
    });
    if (bandera > 0) {
      this.profesionState = true;
      this.formPersonal.get('profesion')?.setValue(event);
    } else if (event === '') {
      this.formPersonal.get('profesion')?.setValue('');
    }
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.persona = this.account?.user || 0;
      this.getHojaVida();
    });
  }

  getHojaVida(): void {
    this.service.find(this.persona).subscribe(response => {
      this.hojaVidaVo = response.body;
      this.hojaVidaTemp = this.hojaVidaVo;
      this.updateForm(response.body);
    });
  }

  crearFormularioGeneral(): FormGroup {
    return this.fb.group({
      informacionAcademica: this.fb.array([this.crearItemInformacionAcademica(0)]),
      idioma: this.fb.array([this.crearItemIdioma()]),
      experienciaLaboral: this.fb.array([this.crearItemExperienciaLaboral(0)])
    });
  }

  crearFormularioInformacionPersonal(): void {
    this.formPersonal = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: ['', [Validators.required, Validators.pattern(this.CEDULA_REGEX)]],
      fechaNacimiento: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      lugarNacimiento: ['', [Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      direccionResidencia: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      genero: ['', [Validators.required]],
      ciudad: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      discapacidad: [null],
      redesSociales: [null],
      perfilProfesional: [''],
      tipoLicenciaConduccion: [null],
      estadoCivil: [null],
      activoNotificaciones: [''],
      nivelEducativoProfesion: [null, [Validators.required]],
      profesion: [null, [Validators.required]]
    });
  }

  crearItemInformacionAcademica(index: number | undefined): FormGroup {
    return this.fb.group({
      id: index,
      nivelEstudio: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      ciudadAcademica: [null, [Validators.required]],
      fechaFin: this.fb.group({
        dia: [null, [Validators.required]],
        mes: [null, [Validators.required]],
        anio: [null, [Validators.required]]
      }),
      tituloOtorgado: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      usuario: [''],
      institucion: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]]
    });
  }

  addItemInformacionAcademica(): void {
    this.informacionAcademica.push(this.crearItemInformacionAcademica(this.informacionAcademica.length));
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

  crearItemExperienciaLaboral(index: number | undefined): FormGroup {
    return this.fb.group({
      id: index,
      nombreEmpresa: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
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
      direccion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      ciudad: [{ disabled: true, value: null }, [Validators.required]],
      departamento: [{ disabled: true, value: null }, [Validators.required]],
      pais: [null, [Validators.required]],
      ciudadExtranjera: [{ disabled: false, value: '' }, [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      telefonoEmpresa: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      usuario: [''],
      dependencia: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      cargo: [null, [Validators.required]],
      nivelCargo: [null, [Validators.required]],
      trabajoActual: [false],
      cargoDiferente: [{ disabled: true, value: '' }, [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]]
    });
  }

  addItemExperienciaLaboral(): void {
    this.experienciaLaboral.push(this.crearItemExperienciaLaboral(this.experienciaLaboral.length));
  }

  crearFormularioPerfil(): void {
    this.formPerfil = this.fb.group({
      perfilProfesional: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      anioExperiencia: [null, [Validators.required]],
      mesExperiencia: [null, [Validators.required]],
      aspiracionSalarial: [null, [Validators.required]],
      paisPermisoTrabajo: [null]
    });
  }

  updateForm(hojaVida: HojaVidaVo | null): void {
    if (hojaVida === null) {
      return;
    }
    if (hojaVida.informacionPersonal && hojaVida.informacionPersonal.mudarme === true) {
      this.banderaColorMudarse = true;
      this.valorMudarme = true;
    }
    if (hojaVida.informacionPersonal && hojaVida.informacionPersonal.viajar === true) {
      this.banderaColorViajar = true;
      this.valorViajar = true;
    }
    this.archivos = this.hojaVidaVo?.archivos || [];
    // Cargar informacion personal
    if (this.hojaVidaVo?.informacionPersonal !== null) {
      this.formPersonal.patchValue({
        id: hojaVida.informacionPersonal.id,
        nombre: hojaVida.persona.nombre,
        apellido: hojaVida.persona.apellido,
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
        tipoLicenciaConduccion: JSON.parse(hojaVida.informacionPersonal.tipoLicenciaConduccion!),
        departamento: hojaVida.informacionPersonal.departamento,
        estadoCivil: hojaVida.informacionPersonal.estadoCivil,
        nivelEducativoProfesion: hojaVida.informacionPersonal.nivelEducativoProfesion,
        profesion: hojaVida.informacionPersonal.profesion,
        activoNotificaciones: hojaVida.informacionPersonal.activoNotificaciones ? this.labels.SI_LABEL : this.labels.NO_LABEL
      });
      this.myControlProfesiones.setValue(hojaVida.informacionPersonal.profesion?.profesion!);
      this.profesionState = true;

      // cargar perfil profesional
      this.formPerfil.patchValue({
        perfilProfesional: hojaVida.informacionPersonal.perfilProfesional,
        anioExperiencia: hojaVida.informacionPersonal.anioExperiencia,
        mesExperiencia: hojaVida.informacionPersonal.mesExperiencia,
        aspiracionSalarial: hojaVida.informacionPersonal.aspiracionSalarial,
        paisPermisoTrabajo: JSON.parse(hojaVida.informacionPersonal.paisPermisoTrabajo!)
      });

      this.cargarRedSocial();
      this.cargarMunicipiosPersonal(this.formPersonal.value);
    } else {
      this.formPersonal.get('nombre')?.setValue(this.hojaVidaVo.persona.nombre);
      this.formPersonal.get('apellido')?.setValue(this.hojaVidaVo.persona.apellido);
      this.formPersonal.get('tipoDocumento')?.setValue(this.hojaVidaVo.persona.tipoDocumento);
      this.formPersonal.get('numeroDocumento')?.setValue(this.hojaVidaVo.persona.numeroDocumento);
      this.formPersonal.get('email')?.setValue(this.hojaVidaVo.persona.email);
    }

    if (this.hojaVidaVo?.informacionAcademica.length !== 0) {
      // cargar Informacion Academica
      this.informacionAcademica.clear();
      for (let index = 0; index < hojaVida.informacionAcademica.length; index++) {
        this.addItemInformacionAcademica();
        const academica = hojaVida.informacionAcademica[index];
        this.informacionAcademica.at(index).patchValue({
          id: academica.id,
          nivelEstudio: academica.nivelEstudio,
          estado: academica.estado,
          ciudadAcademica: academica.ciudadAcademica,
          fechaFin: {
            dia: this.getDia(academica.fechaFin),
            mes: this.getMes(academica.fechaFin),
            anio: this.getAnio(academica.fechaFin)
          },
          tituloOtorgado: academica.tituloOtorgado,
          usuario: academica.usuario,
          institucion: academica.institucion
        });
        if (academica.estado !== 3) {
          this.informacionAcademica
            .at(index)
            .get(['fechaFin'])
            ?.disable();
        }
      }
    }

    this.validarArchivos();

    if (this.hojaVidaVo?.idiomas.length !== 0) {
      // cargar idiomas
      this.idioma.clear();
      for (let index = 0; index < hojaVida.idiomas.length; index++) {
        this.addItemIdioma();
        const idioma = hojaVida.idiomas[index];
        this.idioma.at(index).setValue(idioma);
      }
    }

    if (this.hojaVidaVo?.experienciaLaboral.length !== 0) {
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
          pais: experiencia.pais,
          ciudadExtranjera: experiencia.ciudadExtranjera,
          telefonoEmpresa: experiencia.telefonoEmpresa,
          usuario: experiencia.usuario,
          dependencia: experiencia.dependencia,
          cargo: experiencia.cargo,
          nivelCargo: experiencia.nivelCargo,
          ciudad: experiencia.ciudad,
          departamento: experiencia.departamento,
          trabajoActual: experiencia.trabajoActual,
          cargoDiferente: experiencia.cargoDiferente
        });
        this.updatePais(index);
        this.cargarMunicipios(this.experienciaLaboral.at(index).value);
        if (experiencia.trabajoActual === true) {
          this.experienciaLaboral
            .at(index)
            .get(['fechaFin'])
            ?.disable();
        }
        if (experiencia.cargo?.cargo === 'Otro') {
          this.cargoElement = true;
          this.experienciaLaboral
            .at(index)
            .get(['cargoDiferente'])
            ?.enable();
        }
      }
    }
  }

  validarArchivos(): void {
    if (this.archivos.length > 0) {
      this.archivos.forEach(archivo => {
        if (archivo.tipo === TipoArchivo.DOCUMENTO_IDENTIDAD) {
          this.cargadoDocumento = true;
        } else if (archivo.tipo === TipoArchivo.LICENCIA_CONDUCCION) {
          this.cargadoLicencia = true;
        } else if (archivo.tipo === TipoArchivo.CERTIFICADO_ESTUDIO) {
          this.hojaVidaVo?.informacionAcademica.forEach((info, index) => {
            if (info.id === archivo.informacionAcademica?.id) {
              this.archivosCargadosIAcademica.push(index);
            }
          });
        } else if (archivo.tipo === TipoArchivo.CERTIFICADO_LABORAL) {
          this.hojaVidaVo?.experienciaLaboral.forEach((info, index) => {
            if (info.id === archivo.informacionLaboral?.id) {
              this.archivosCargadosILaboral.push(index);
            }
          });
        }
      });
    }
  }

  nextStep(): void {
    if (this.step === 3) return;
    let flag = 0;
    switch (this.step) {
      case 0:
        if (!this.profesionState) {
          break;
        }
        this.archivos.forEach(archivo => {
          if (archivo.tipo === TipoArchivo.DOCUMENTO_IDENTIDAD) {
            flag++;
          }
        });
        this.step++;
        this.onSubmit1();
        // if (flag === 0) {
        //   alertify.set('notifier', 'position', 'top-right');
        //   alertify.error('Debe adjuntar el documento de identidad');
        // } else {
        //   this.step++;
        // }
        break;
      case 1:
        this.informacionAcademica.length;
        this.archivos.forEach(archivo => {
          if (archivo.tipo === TipoArchivo.CERTIFICADO_ESTUDIO) {
            flag++;
          }
        });
        this.step++;
        this.onSubmit2();
        // if (flag < this.informacionAcademica.length) {
        //   alertify.set('notifier', 'position', 'top-right');
        //   alertify.error('Debe adjuntar el título a cada estudio');
        // } else {
        //   this.step++;
        // }
        break;
      case 3:
        return;
      default:
        this.step++;
    }
  }

  previousStep(): void {
    if (this.step === 0) return;
    this.step--;
  }

  onSubmit1(): void {
    // this.cargando = false;
    this.hojaVidaVo = new HojaVidaVo();

    // cargar informacion personal
    this.hojaVidaVo.informacionPersonal = this.procesarInformacionPersonal();
    if (this.hojaVidaTemp?.informacionPersonal !== this.hojaVidaVo.informacionPersonal) {
      this.personaService.find(this.persona).subscribe(response => {
        this.personaDatos = response.body;
        if (this.personaDatos !== null) {
          this.personaDatos.estadohv = true;
          this.personaService.update(this.personaDatos).subscribe(() => {});
        }
      });
    }
    this.hojaVidaVo.persona = this.procesarPersona();
    this.cargarArchivos(this.hojaVidaVo);
  }

  onSubmit2(): void {
    this.hojaVidaVo = new HojaVidaVo();
    const academica: IInformacionAcademica[] = [];
    for (let index = 0; index < this.informacionAcademica.length; index++) {
      academica.push(this.procesarInformacionAcademica(this.informacionAcademica.at(index).value, index));
    }
    this.hojaVidaVo.informacionAcademica = academica;
    if (this.hojaVidaTemp?.informacionAcademica !== this.hojaVidaVo.informacionAcademica) {
      this.personaService.find(this.persona).subscribe(response => {
        this.personaDatos = response.body;
        if (this.personaDatos !== null) {
          this.personaDatos.estadohv = true;
          this.personaService.update(this.personaDatos).subscribe(() => {});
        }
      });
    }
    // cargar idiomas
    const idioma: IPersona[] = [];
    for (let index = 0; index < this.idioma.length; index++) {
      idioma.push(this.procesarIdiomas(this.idioma.at(index).value));
    }
    this.hojaVidaVo.idiomas = idioma;

    this.cargarArchivos(this.hojaVidaVo);
  }

  cargarArchivos(hojavo: HojaVidaVo): void {
    this.hojaVidaVo = hojavo;
    if (this.archivos.length > 0) {
      this.hojaVidaVo.archivos = this.archivos;
      this.cargadoDocumento = this.archivos.some(archivo => archivo.tipo === 1);
    }
    this.service.create(this.hojaVidaVo).subscribe(
      response => {
        if (response.body !== null) {
          if (response.body.informacionPersonal !== null) {
            this.formPersonal.get('id')?.setValue(response.body.informacionPersonal.id);
          }
          this.archivosaws.forEach((element: { file: File; name: string }) => {
            const formData = new FormData();
            formData.append('file', element.file, element.name);
            this.archivo.uploadS3(formData).subscribe((res: any) => {});
          });
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          this.hojaVidaVo = response.body;
        }
      },
      err => {
        console.log(err);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(commonMessages.HTTP_ERROR_LABEL);
      }
    );
  }

  onSubmit(): void {
    this.cargandoDeshabilitado = true;
    let flag = 0;
    this.archivos.forEach(archivo => {
      if (archivo.tipo === TipoArchivo.CERTIFICADO_LABORAL) {
        flag++;
      }
    });
    // if (flag < this.experienciaLaboral.length) {
    if (false) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Debe adjuntar el certificado de cada experiencia');
    } else {
      this.cargando = false;
      this.hojaVidaVo = new HojaVidaVo();

      // cargar informacion personal
      this.hojaVidaVo.informacionPersonal = this.procesarInformacionPersonal();

      // cargar informacion laboral
      const laboral: IInformacionLaboral[] = [];
      for (let index = 0; index < this.experienciaLaboral.length; index++) {
        laboral.push(this.procesarExperienciaLaboral(this.experienciaLaboral.at(index).value, index));
      }
      this.hojaVidaVo.experienciaLaboral = laboral;
      if (this.hojaVidaTemp?.experienciaLaboral !== this.hojaVidaVo.experienciaLaboral) {
        this.personaService.find(this.persona).subscribe(response => {
          this.personaDatos = response.body;
          if (this.personaDatos !== null) {
            this.personaDatos.estadohv = true;
            this.personaService.update(this.personaDatos).subscribe(() => {});
          }
        });
      }
      // Cargar archivos
      if (this.archivos.length !== 0) {
        this.hojaVidaVo.archivos = this.archivos;
      }

      this.service.create(this.hojaVidaVo).subscribe(
        response => {
          // eslint-disable-next-line no-console
          // console.log('response save: ', response);
          // eslint-disable-next-line no-console
          // console.log('archivos aws: ', this.archivosaws);
          // eslint-disable-next-line no-console
          // console.log('archivos: ', this.archivos);
          if (response.body !== null) {
            this.archivosaws.forEach((element: { file: File; name: string }) => {
              const formData = new FormData();
              formData.append('file', element.file, element.name);
              this.archivo.uploadS3(formData).subscribe((res: any) => {});
            });
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
            this.hojaVidaVo = response.body;
            this.router.navigate(['/perfil']);
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    }
  }

  procesarPersona(): IPersona {
    return {
      ...new Persona(),
      id: this.persona,
      nombre: this.formPersonal.get(['nombre'])!.value,
      apellido: this.formPersonal.get(['apellido'])!.value,
      email: this.formPersonal.get(['email'])!.value,
      tipoDocumento: this.formPersonal.get(['tipoDocumento'])!.value,
      numeroDocumento: this.formPersonal.get(['numeroDocumento'])!.value,
      tipoUsuario: new TipoUsuario(1)
    };
  }

  procesarInformacionPersonal(): IInformacionPersonal {
    // eslint-disable-next-line no-console
    // console.log('iiiiiiiiiiiiiiiiid: ', this.formPersonal.get(['id'])!.value);
    return {
      ...new InformacionPersonal(),
      id: this.formPersonal.get(['id'])!.value,
      fechaNacimiento: this.getFecha(this.formPersonal.get(['fechaNacimiento'])!.value),
      lugarNacimiento: this.formPersonal.get(['lugarNacimiento'])!.value,
      direccionResidencia: this.formPersonal.get(['direccionResidencia'])!.value,
      genero: this.formPersonal.get(['genero'])!.value,
      departamento: this.formPersonal.get(['departamento'])!.value as number,
      ciudad: this.formPersonal.get(['ciudad'])!.value as number,
      telefono: this.formPersonal.get(['telefono'])!.value,
      discapacidad: this.formPersonal.get(['discapacidad'])!.value,
      redesSociales: this.procesarRedSocial(this.formPersonal.get(['redesSociales'])!.value),
      tipoLicenciaConduccion: JSON.stringify(this.formPersonal.get(['tipoLicenciaConduccion'])!.value),
      perfilProfesional: this.formPerfil.get(['perfilProfesional'])!.value,
      anioExperiencia: this.formPerfil.get(['anioExperiencia'])!.value,
      mesExperiencia: this.formPerfil.get(['mesExperiencia'])!.value,
      aspiracionSalarial: this.formPerfil.get(['aspiracionSalarial'])!.value,
      mudarme: this.valorMudarme,
      viajar: this.valorViajar,
      paisPermisoTrabajo: JSON.stringify(this.formPerfil.get(['paisPermisoTrabajo'])!.value),
      usuario: new Persona(this.persona),
      estadoCivil: this.formPersonal.get('estadoCivil')!.value,
      nivelEducativoProfesion: this.formPersonal.get('nivelEducativoProfesion')!.value,
      profesion: this._filterProfesionObject(this.formPersonal.get('profesion')!.value!),
      activoNotificaciones: this.formPersonal.get('activoNotificaciones')!.value === this.labels.SI_LABEL ? true : false
    };
  }

  procesarInformacionAcademica(academica: Object, index: number): IInformacionAcademica {
    return {
      ...new InformacionAcademica(),
      id: academica['id'],
      nivelEstudio: academica['nivelEstudio'],
      estado: academica['estado'],
      ciudadAcademica: academica['ciudadAcademica'],
      fechaFin: this.getFecha(academica['fechaFin']),
      tituloOtorgado: academica['tituloOtorgado'],
      usuario: new Persona(this.persona),
      institucion: academica['institucion']
    };
  }

  procesarExperienciaLaboral(experiencia: Object, index: number): IInformacionLaboral {
    return {
      ...new InformacionLaboral(),
      id: experiencia['id'],
      nombreEmpresa: experiencia['nombreEmpresa'],
      fechaInicio: this.getFecha(experiencia['fechaInicio']),
      fechaFin: this.getFecha(experiencia['fechaFin']),
      direccion: experiencia['direccion'],
      ciudad: experiencia['ciudad'],
      departamento: experiencia['departamento'],
      pais: experiencia['pais'],
      telefonoEmpresa: experiencia['telefonoEmpresa'],
      ciudadExtranjera: experiencia['ciudadExtranjera'],
      usuario: new Persona(this.persona),
      dependencia: experiencia['dependencia'],
      cargo: experiencia['cargo'],
      nivelCargo: experiencia['nivelCargo'],
      trabajoActual: experiencia['trabajoActual'],
      cargoDiferente: experiencia['cargoDiferente']
    };
  }

  procesarIdiomas(idioma: Object): IPersonaIdioma {
    return {
      ...new PersonaIdioma(),
      id: idioma['id'],
      nivel: idioma['nivel'],
      idPersona: new Persona(this.persona),
      idIdioma: idioma['idIdioma']
    };
  }

  getFecha(fecha: Object): Moment {
    if (fecha === undefined) {
      const dia = null;
      const mes = null;
      const anio = null;
      return moment(`${anio}/${mes}/${dia}`, DATE_FORMAT);
    } else {
      const dia = fecha['dia'] < 10 ? '0' + fecha['dia'] : fecha['dia'];
      const mes = fecha['mes'] < 10 ? '0' + fecha['mes'] : fecha['mes'];
      const anio = fecha['anio'];
      return moment(`${anio}/${mes}/${dia}`, DATE_FORMAT);
    }
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
  cargarAniosFin(value: Object, index: number): void {
    this.aniosFin = [];
    if (value === 0) {
      this.aniosFin = this.apiService.getAnios();
    } else if (value && Object.entries(value).length > 0) {
      this.aniosFin = this.apiService.getAnios().filter(item => item >= value['fechaInicio']?.anio);
      if (
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['anio'])?.value < this.aniosFin[0]
      ) {
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['anio'])
          ?.setValue(this.aniosFin[0]);
      }
    }
    this.cargarMesFin(value, index);
  }

  cargarMesFin(value: Object, index: number): void {
    this.mesFin = [];
    if (value === 0 || value['fechaFin']?.anio > value['fechaInicio']?.anio) {
      this.mesFin = this.apiService.getMeses();
    } else if (value && Object.entries(value).length > 0) {
      this.mesFin = this.apiService.getMeses().filter(item => item >= value['fechaInicio']?.mes);
      if (
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['mes'])?.value < this.mesFin[0]
      ) {
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['mes'])
          ?.setValue(this.mesFin[0]);
      }
    }
    this.cargarDiasFin(value, index);
  }

  cargarDiasFin(value: Object, index: number): void {
    this.diasFin = [];
    if (value === 0 || value['fechaFin']?.anio > value['fechaInicio']?.anio || value['fechaFin']?.mes > value['fechaInicio']?.mes) {
      this.diasFin = this.apiService.getDias();
    } else if (value && Object.entries(value).length > 0) {
      this.diasFin = this.apiService.getDias().filter(item => item >= value['fechaInicio']?.dia);
      if (
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['dia'])?.value < this.diasFin[0]
      ) {
        this.experienciaLaboral
          .at(index)
          .get(['fechaFin'])
          ?.get(['dia'])
          ?.setValue(this.diasFin[0]);
      }
    }
  }

  // cargarPaises(): void {
  //   this.apiService.getPaises().subscribe(response => (this.paises = response));
  // }

  cargarPaises(): void {
    this.paisesService
      .query({
        page: 0,
        size: 250
      })
      .subscribe((res: HttpResponse<IPaises[]>) => {
        this.paises = res.body!.map(item => new PaisesVo(item.iso2!, item.nombre!));
      });
  }
  // getPaises(): Observable<IOpcionVo[]> {
  //   return this.http.get<any[]>(URL_PAISES).pipe(
  //     map(element =>
  //       element
  //         .map(item => {
  //           return {
  //             codigo: item.alpha2Code,
  //             nombre: item.translations.es ? item.translations.es : item.name
  //           };
  //         })
  //         .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0))
  //     )
  //   );
  // }

  consultarInformacionGeografica(): void {
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
        this.cargarDepartamentos();
        this.cargarMunicipios(0);
        this.cargarMunicipiosPersonal(0);
        this.cargarMunicipiosAcademica();
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

  cargarMunicipiosPersonal(value: Object): void {
    this.municipiosPersonal = [];
    if (value === 0) {
      this.municipiosPersonal = this.geografia
        .map(item => {
          return {
            codigo: item.codigoMpio,
            nombre: item.nombreMpio
          };
        })
        .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
    } else {
      if (value && Object.entries(value).length > 0) {
        this.municipiosPersonal = this.geografia
          .filter(item => item.codigoDpto === value['departamento'].toString())
          .map(item => {
            return {
              codigo: item.codigoMpio,
              nombre: item.nombreMpio
            };
          })
          .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
      }
    }
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

  cargarMunicipios(value: Object): void {
    this.municipios = [];
    if (value === 0) {
      this.municipios = this.geografia
        .map(item => {
          return {
            codigo: item.codigoMpio,
            nombre: item.nombreMpio
          };
        })
        .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
    } else {
      if (value && Object.entries(value).length > 0) {
        this.municipios = this.geografia
          .filter(item => item.codigoDpto === value['departamento']?.toString())
          .map(item => {
            return {
              codigo: item.codigoMpio,
              nombre: item.nombreMpio
            };
          })
          .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
      }
    }
  }

  cargarTipoDocumento(): void {
    this.tipoDocumentoService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<ITipoDocumento[]>) => {
        if (res.body !== null) {
          this.documentos = res.body
            .map(item => {
              return {
                id: item.id,
                nombreTipo: item.nombreTipo
              };
            })
            .sort((a: ITipoDocumento, b: ITipoDocumento) => (a.nombreTipo! > b.nombreTipo! ? 1 : b.nombreTipo! > a.nombreTipo! ? -1 : 0));
        }
      });
  }

  cargarInstituciones(): void {
    this.institucionService
      .query({
        page: 0,
        size: 200
      })
      .subscribe((res: HttpResponse<IInstitucion[]>) => {
        if (res.body !== null) {
          this.instituciones = res.body
            .map(item => {
              return {
                id: item.id,
                institucion: item.institucion
              };
            })
            .sort((a: IInstitucion, b: IInstitucion) => (a.institucion! > b.institucion! ? 1 : b.institucion! > a.institucion! ? -1 : 0));
        }
      });
  }

  cargarCargos(): void {
    this.cargoService
      .query({
        page: 0,
        size: 250
      })
      .subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
  }

  cargarProfesiones(): void {
    this.profesionService
      .query({
        page: 0,
        size: 550
      })
      .subscribe((res: HttpResponse<IProfesion[]>) => (this.profesiones = res.body || []));
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

  // cargar archivos
  addArchivo(event: any, tipoDocumento: number, indice?: number): void {
    const file: File = event.target.files[0];
    let nVecesLicencia = 0;
    let nVecesAcademica = 0;
    let nVecesLaboral = 0;

    if (file.size > commonMessages.TAMANO_MAXIMO_PERMITIDO) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_TAMANO_EXCEDIDO);
      return;
    }

    const extension = file.name.split('.').pop() || '';
    if (!commonMessages.ARCHIVOS_PERMITIDOS.includes(extension)) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_ARCHIVO_NO_SOPORTADO);
      return;
    }

    // La cédula debe ser documento que se suben una única vez
    let index = -1;
    if (tipoDocumento === TipoArchivo.DOCUMENTO_IDENTIDAD) {
      index = this.archivos.findIndex(item => item.tipo === tipoDocumento);
      if (index >= 0) {
        this.archivos[index].nombre = file.name;
        this.archivos[index].extension = extension;
        this.archivos[index].usuario = new Persona(this.persona);

        let fileaws = {};
        fileaws['file'] = file;
        fileaws['name'] = this.archivos[index].archivo;

        this.archivosaws.push(fileaws);
        // this.cargadoDocumento = true;
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Archivo cargado, se guardará al continuar al siguiente formulario');
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Archivo cargado, se guardará al continuar al siguiente formulario');
        this.cargarArchivo(file, tipoDocumento, extension, indice);
        // this.cargadoDocumento = true;
      }
    } else if (tipoDocumento === TipoArchivo.LICENCIA_CONDUCCION) {
      this.archivos.forEach(archivo => {
        if (archivo.tipo === tipoDocumento) {
          nVecesLicencia++;
        }
      });
      if (nVecesLicencia >= 2) {
        alertify
          .confirm(
            'ATENCIÓN',
            'Ya ha subido 2 documentos, ¿Desea reemplazarlos?',
            () => {
              let archivostemp: IArchivo[] = [];
              this.archivos.forEach(element => {
                if (element.tipo === TipoArchivo.LICENCIA_CONDUCCION) {
                  this.archivo.deleteS3(element.archivo?.toString()!).subscribe((res: any) => {
                    // console.log(res);
                  });
                  if (element.id !== undefined) {
                    this.archivo.delete(element.id!).subscribe((res: any) => {
                      // console.log(res);
                    });
                  }
                } else {
                  archivostemp.push(element);
                }
              });
              this.archivos = archivostemp;
              this.cargarArchivo(file, tipoDocumento, extension, indice);
            },
            () => {
              // console.log('confirm no licencia');
              return;
            }
          )
          .set('labels', { ok: 'Sí', cancel: 'No' });
      } else {
        this.cargarArchivo(file, tipoDocumento, extension, indice);
      }
      // this.cargadoLicencia = true;
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Archivo cargado, se guardará al continuar al siguiente formulario');
    } else if (tipoDocumento === TipoArchivo.CERTIFICADO_ESTUDIO) {
      if (indice != undefined) {
        this.archivosCargadosIAcademica.forEach(posicion => {
          if (posicion === indice) {
            nVecesAcademica++;
          }
        });
        if (nVecesAcademica >= 2) {
          alertify
            .confirm(
              'ATENCIÓN',
              'Ya ha subido 2 documentos, ¿Desea reemplazarlos?',
              () => {
                let archivostemp: IArchivo[] = [];
                this.archivos.forEach(element => {
                  if (
                    element.tipo === tipoDocumento &&
                    element.informacionAcademica?.id === this.informacionAcademica.at(indice).get('id')!.value
                  ) {
                    this.archivo.deleteS3(element.archivo?.toString()!).subscribe((res: any) => {
                      // console.log(res);
                    });
                    if (element.id !== undefined) {
                      this.archivo.delete(element.id!).subscribe((res: any) => {
                        // console.log(res);
                      });
                    }
                  } else {
                    archivostemp.push(element);
                  }
                });
                this.archivos = archivostemp;
                this.cargarArchivo(file, tipoDocumento, extension, indice);
              },
              () => {
                return;
              }
            )
            .set('labels', { ok: 'Sí', cancel: 'No' });
        } else {
          this.cargarArchivo(file, tipoDocumento, extension, indice);
        }
      } else {
        this.cargarArchivo(file, tipoDocumento, extension, indice);
      }
      // Icono
      document.getElementById('' + indice)?.setAttribute('style', 'visibility: visible');
      if (indice != undefined) {
        this.archivosCargadosIAcademica.push(indice);
      }
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Archivo cargado, se guardará al continuar al siguiente formulario');
    } else if (tipoDocumento === TipoArchivo.CERTIFICADO_LABORAL) {
      if (indice != undefined) {
        this.archivosCargadosILaboral.forEach(posicion => {
          if (posicion === indice) {
            nVecesLaboral++;
          }
        });
        if (nVecesLaboral >= 2) {
          alertify
            .confirm(
              'ATENCIÓN',
              'Ya ha subido 2 documentos, ¿Desea reemplazarlos?',
              () => {
                let archivostemp: IArchivo[] = [];
                this.archivos.forEach(element => {
                  if (
                    element.tipo === tipoDocumento &&
                    element.informacionLaboral?.id === this.experienciaLaboral.at(indice).get('id')!.value
                  ) {
                    this.archivo.deleteS3(element.archivo?.toString()!).subscribe((res: any) => {
                      // console.log(res);
                    });
                    if (element.id !== undefined) {
                      this.archivo.delete(element.id!).subscribe((res: any) => {
                        // console.log(res);
                      });
                    }
                  } else {
                    archivostemp.push(element);
                  }
                });
                this.archivos = archivostemp;
                this.cargarArchivo(file, tipoDocumento, extension, indice);
              },
              () => {
                return;
              }
            )
            .set('labels', { ok: 'Sí', cancel: 'No' });
        } else {
          this.cargarArchivo(file, tipoDocumento, extension, indice);
        }
      } else {
        this.cargarArchivo(file, tipoDocumento, extension, indice);
      }
      // Icono
      document.getElementById('' + indice)?.setAttribute('style', 'visibility: visible');
      if (indice != undefined) {
        this.archivosCargadosILaboral.push(indice);
      }
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Archivo cargado, se guardará al enviar el formulario');
    }
  }

  cargarArchivo(file: File, tipoDocumento: number, extension: string, indice?: number) {
    const reader = new FileReader();

    // console.log('creando archivo init');
    const archivo = new Archivo();
    archivo.tipo = tipoDocumento;
    archivo.nombre = file.name;
    archivo.extension = extension;
    archivo.usuario = new Persona(this.persona);

    if (tipoDocumento === TipoArchivo.CERTIFICADO_ESTUDIO) {
      if (indice != undefined) {
        let id = this.informacionAcademica.at(indice).get('id')!.value;
        archivo.informacionAcademica = new InformacionAcademica();
        if (id != undefined && id != '') {
          archivo.informacionAcademica.id = id;
        } else {
          this.informacionAcademica
            .at(indice)
            .get('id')!
            .setValue(indice);
          archivo.informacionAcademica.id = indice;
        }
      }
    } else if (tipoDocumento === TipoArchivo.CERTIFICADO_LABORAL) {
      if (indice != undefined) {
        let id = this.experienciaLaboral.at(indice).get('id')!.value;
        archivo.informacionLaboral = new InformacionLaboral();
        if (id != undefined && id != '') {
          archivo.informacionLaboral!.id = id;
        } else {
          this.experienciaLaboral
            .at(indice)
            .get('id')!
            .setValue(indice);
          archivo.informacionLaboral.id = indice;
        }
      }
    }
    archivo.archivo = '' + this.formPersonal.get('email')!.value + new Date().getTime();
    let fileaws = {};
    fileaws['file'] = file;
    fileaws['name'] = archivo.archivo;
    this.archivosaws.push(fileaws);
    this.archivos.push(archivo);
    // console.log('adicionando archivo fin');

    // if (tipoDocumento === TipoArchivo.DOCUMENTO_IDENTIDAD) {
    //   this.cargadoDocumento = true;
    // } else if (tipoDocumento === TipoArchivo.LICENCIA_CONDUCCION) {
    //   this.cargadoLicencia = true;
    // } else if (tipoDocumento === TipoArchivo.CERTIFICADO_ESTUDIO) {
    //   if (indice != undefined) {
    //     this.archivosCargadosIAcademica.push(indice);
    //   }
    // } else if (tipoDocumento === TipoArchivo.CERTIFICADO_LABORAL) {
    //   if (indice != undefined) {
    //     this.archivosCargadosILaboral.push(indice);
    //   }
    // }
  }

  procesarRedSocial(value: string | undefined): string | undefined {
    if (value !== null) {
      return value?.concat(':').concat(this.redSocial ? this.redSocial : ' ');
    }
    return undefined;
  }

  cargarRedSocial(): void {
    if (this.formPersonal.get(['redesSociales'])!.value) {
      const value = this.formPersonal.get(['redesSociales'])!.value.split(':');
      this.redSocial = value[1];
      this.formPersonal.get(['redesSociales'])!.setValue(value[0]);
    }
  }

  setRedSocial(event: any): void {
    this.redSocial = event.target.value;
  }

  updatePais(index: any): void {
    if (this.experienciaLaboral.at(index).get(['pais'])!.value !== commonMessages.CODIGO_COLOMBIA) {
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.enable();
    } else {
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.setValue('');
    }
  }

  onChangePais(index: any): void {
    if (this.experienciaLaboral.at(index).get(['pais'])!.value !== commonMessages.CODIGO_COLOMBIA) {
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.setValue('');
    } else {
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['departamento'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudad'])
        ?.setValue(null);
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.disable();
      this.experienciaLaboral
        .at(index)
        .get(['ciudadExtranjera'])
        ?.setValue('');
    }
  }

  volverPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  removeItemExperienciaLaboral(index: any): void {
    this.experienciaLaboral.removeAt(index);
  }

  removeItemInformacionAcademica(index: any): void {
    this.informacionAcademica.removeAt(index);
  }

  removeItemIdioma(index: any): void {
    this.idioma.removeAt(index);
  }

  clickMudarse(): void {
    this.colorMudarse = document.getElementById('buttonMudarse');
    if (this.colorMudarse.style.backgroundColor === 'rgb(163, 170, 175)') {
      this.valorMudarme = false;
      this.colorMudarse.style.backgroundColor = '#FFFFFF';
    } else {
      this.valorMudarme = true;
      this.colorMudarse.style.backgroundColor = '#A3AAAF';
    }
  }

  clickViajar(): void {
    this.colorViajar = document.getElementById('buttonViajar');
    if (this.colorViajar.style.backgroundColor === 'rgb(163, 170, 175)') {
      this.valorViajar = false;
      this.colorViajar.style.backgroundColor = '#FFFFFF';
    } else {
      this.valorViajar = true;
      this.colorViajar.style.backgroundColor = '#A3AAAF';
    }
  }

  onChangeTrabajoActual(index: any, isChecked: boolean): void {
    if (isChecked) {
      this.experienciaLaboral
        .at(index)
        .get(['fechaFin'])
        ?.disable();
    } else {
      this.experienciaLaboral
        .at(index)
        .get(['fechaFin'])
        ?.enable();
    }
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

  onChangeIncompAcademic(index: any, event: any): void {
    // eslint-disable-next-line no-console
    // console.log(event.target.selectedOptions[0].label);
    if (event.target.selectedOptions[0].label !== 'Completo') {
      this.informacionAcademica
        .at(index)
        .get(['fechaFin'])
        ?.disable();
    } else {
      this.informacionAcademica
        .at(index)
        .get(['fechaFin'])
        ?.enable();
    }
  }

  onChangeTipoDoc(event: any): any {
    if (event.target.selectedOptions[0].label === 'Pasaporte') {
      this.mensajeDocumento = '*El documento solo puede tener de 6 a 18 carácteres entre minúsculas, mayúsculas y números';
      this.formPersonal.get('numeroDocumento')?.setValue('');
      this.formPersonal.get('numeroDocumento')?.setValidators([Validators.required, Validators.pattern('^[0-9A-Za-z]{6,18}$')]);
    } else if (event.target.selectedOptions[0].label === 'NIT') {
      this.mensajeDocumento = '*El documento solo puede tener de 6 a 18 carácteres';
      this.formPersonal.get('numeroDocumento')?.setValue('');
      this.formPersonal.get('numeroDocumento')?.setValidators([Validators.required, Validators.pattern('^[0-9-]{6,18}$')]);
    } else {
      this.mensajeDocumento = '*El documento debe contener de 6 a 18 números';
      this.formPersonal.get('numeroDocumento')?.setValue('');
      this.formPersonal.get('numeroDocumento')?.setValidators([Validators.required, Validators.pattern('^[0-9]{6,18}$')]);
    }
  }

  onChangeCargo(index: any, event: any): any {
    if (event.target.selectedOptions[0].label === 'Otro') {
      this.cargoElement = true;
      this.experienciaLaboral
        .at(index)
        .get(['cargoDiferente'])
        ?.enable();
      this.experienciaLaboral
        .at(index)
        .get(['cargoDiferente'])
        ?.setValue('');
    } else {
      this.cargoElement = false;
      this.experienciaLaboral
        .at(index)
        .get(['cargoDiferente'])
        ?.disable();
    }
  }

  descargarArchivo(tipoArchivo: number | undefined, indice?: number): void {
    switch (tipoArchivo) {
      case 1:
        {
          if (this.cargadoDocumento) {
            this.foreachArchivo(tipoArchivo);
          } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('No ha guardado este documento');
          }
        }
        break;
      case 2:
        {
          if (this.cargadoLicencia) {
            this.foreachArchivo(tipoArchivo);
          } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('No ha guardado este documento');
          }
        }
        break;
      case 3:
        {
          if (this.archivosCargadosIAcademica.length > 0) {
            let id = this.informacionAcademica.at(indice!).get('id')!.value;
            if (id != null && id != undefined) this.foreachArchivo(tipoArchivo, id);
          } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('No ha guardado este documento');
          }
        }
        break;
      case 4:
        {
          if (this.archivosCargadosILaboral.length > 0) {
            let id = this.experienciaLaboral.at(indice!).get('id')!.value;
            if (id != null && id != undefined) this.foreachArchivo(tipoArchivo, id);
          } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('No ha guardado este documento');
          }
        }
        break;
    }
  }

  foreachArchivo(tipoArchivo: number | undefined, id?: number): void {
    let flag = 0;
    this.archivos.forEach(archivo => {
      if (archivo.tipo === tipoArchivo) {
        if (id != undefined) {
          if (archivo.informacionAcademica?.id || archivo.informacionLaboral?.id) {
            if (archivo.informacionAcademica?.id == id || archivo.informacionLaboral?.id == id) {
              this.archivoService.getS3(archivo.archivo!.toString(), archivo.nombre!);
              flag++;
            }
          }
        } else {
          this.archivoService.getS3(archivo.archivo!.toString(), archivo.nombre!);
          flag++;
        }
      }
    });
    if (flag == 0) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('No ha guardado este documento');
    }
  }

  deleteArchivo(tipoArchivo: number | undefined, indice?: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar el archivo?',
      icon: 'question',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2699FB',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        if (this.archivos.length > 0) {
          let id: number | undefined = undefined;
          if (tipoArchivo == 3) {
            id = this.informacionAcademica.at(indice!).get('id')!.value;
          } else if (tipoArchivo == 4) {
            id = this.experienciaLaboral.at(indice!).get('id')!.value;
          }
          this.archivos.forEach(archivo => {
            if (archivo.tipo === tipoArchivo) {
              if (id != undefined) {
                if (archivo.informacionAcademica?.id == id || archivo.informacionLaboral?.id == id) {
                  if (archivo.id) {
                    if (archivo && archivo.id && archivo.archivo)
                      this.archivoService.deleteS3(archivo.archivo.toString()).subscribe(
                        () => {},
                        () => {
                          alertify.set('notifier', 'position', 'top-right');
                          alertify.error(commonMessages.HTTP_ERROR_LABEL);
                        }
                      );
                    this.archivoService.delete(archivo.id!).subscribe(() => {});
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                  }
                  if (tipoArchivo == 3) {
                    this.archivosCargadosIAcademica = [];
                  } else if (tipoArchivo == 4) {
                    this.archivosCargadosILaboral = [];
                  }
                  const index = this.archivos.indexOf(archivo);
                  this.archivos.splice(index, 1);
                }
              } else {
                if (archivo.id) {
                  if (archivo && archivo.id && archivo.archivo)
                    this.archivoService.deleteS3(archivo.archivo.toString()).subscribe(
                      () => {},
                      () => {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(commonMessages.HTTP_ERROR_LABEL);
                      }
                    );
                  this.archivoService.delete(archivo.id!).subscribe(() => {});
                  alertify.set('notifier', 'position', 'top-right');
                  alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                }
                const index = this.archivos.indexOf(archivo);
                this.archivos.splice(index, 1);
                if (tipoArchivo == 1) {
                  this.cargadoDocumento = false;
                } else if (tipoArchivo == 2) {
                  this.cargadoLicencia = false;
                }
              }
            }
          });
        }
      }
    });
  }
}
