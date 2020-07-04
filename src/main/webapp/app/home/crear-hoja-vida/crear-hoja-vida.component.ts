import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { IInstitucion } from 'app/shared/model/institucion.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AccountService } from '../../core/auth/account.service';
import { CargoService } from '../../entities/cargo/cargo.service';
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
import { IOpcionVo, IOpcionVoDescripcion } from '../../shared/vo/opcion-vo';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';

declare let alertify: any;

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
  anioExperiencia!: FormControlName;
  mesExperiencia!: FormControlName;
  trabajoActual!: FormControlName;
  step!: number;
  geografia: Array<GeografiaVo> = [];
  paises: Array<IOpcionVo> = [];
  departamentos: Array<IOpcionVo> = [];
  municipios: Array<IOpcionVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  discapacidades: Array<IOpcionVo> = commonMessages.ARRAY_DISCAPACIDADES;
  estadosCiviles: Array<IOpcionVo> = commonMessages.ARRAY_ESTADOS_CIVILES;
  documentos: Array<ITipoDocumento> = [];
  dias: number[] = this.apiService.getDias();
  meses: number[] = this.apiService.getMeses();
  anios: number[] = this.apiService.getAnios();
  aniosExperiencia: IOpcionVo[] = commonMessages.ARRAY_ANIOS_EXPERIENCIA;
  mesesExperiencia: IOpcionVo[] = commonMessages.ARRAY_MESES_EXPERIENCIA;
  nivelEstudio: IOpcionVo[] = commonMessages.ARRAY_NIVEL_ESTUDIOS;
  nivelEducativoProfesion: IOpcionVo[] = commonMessages.ARRAY_NIVEL_EDUCATIVO_PROFESION;
  estadoNivelEstudio: IOpcionVo[] = commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  idiomas: Array<IIdioma> = [];
  nivelIdioma: Array<IOpcionVo> = commonMessages.ARRAY_NIVEL_IDIOMA;
  tipoLicenciaConduccion: Array<IOpcionVoDescripcion> = commonMessages.ARRAY_TIPOS_LICENCIA_CONDUCCION;
  archivos: Array<IArchivo> = [];
  tipoArchivo = TipoArchivo;
  mostrar!: boolean;
  hojaVidaVo!: HojaVidaVo | null;
  instituciones: Array<IInstitucion> = [];
  cargos: Array<ICargo> = [];
  account!: Account | null;
  persona!: number;
  redesSociales: Array<IOpcionVo> = commonMessages.ARRAY_REDES_SOCIALES;
  redSocial = ' ';
  cargando = true;
  CEDULA_REGEX = '^[0-9]{6,10}$';
  mensajeDocumento: any = '*El documento debe contener de 6 a 10 números';
  mensajeArchivoDoc: any = '';
  mensajeArchivoTitulo: any = '';

  nivelCargo: IOpcionVo[] = commonMessages.ARRAY_NIVEL_CARGO;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  colorMudarse: any | null;
  colorViajar: any | null;
  valorMudarme = false;
  valorViajar = false;
  banderaColorMudarse = false;
  banderaColorViajar = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private tipoDocumentoService: TipoDocumentoService,
    private idiomaService: IdiomaService,
    private service: HojaVidaService,
    private institucionService: InstitucionService,
    private cargoService: CargoService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    this.documentos;
    this.step = 0;
    this.mostrar = false;
    this.cargarCuentaUsuario();
    this.globalForm = this.crearFormularioGeneral();
    this.consultarInformacionGeografica();
    this.cargarPaises();
    this.cargarTipoDocumento();
    this.cargarIdiomas();
    this.cargarInstituciones();
    this.cargarCargos();
    this.crearFormularioInformacionPersonal();
    this.crearFormularioPerfil();
    this.getHojaVida();
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
      direccionResidencia: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(Autopista|autopista|Avenida|avenida|Avenida Calle|avenida calle|Avenida Carrera|avenida carrera|Avenida|avenida|Carrera|carrera|Calle|calle|Carrera|carrera|Circunvalar|circunvalar|Diagonal|diagonal|Kilometro|kilometro|Transversal|transversal|AUTOP|autop|AV|av|AC|ac|AK|ak|CL|cl|KR|kr|CCV|ccv|DG|dg|KM|km|TV|tv)(\\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\\s)?[a-zA-Z]?(\\s)?(bis)?(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?(\\s)?(#(\\s)?[0-9]{1,2}(\\s)?[a-zA-Z]?(\\s)?(bis)?(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?(\\s)?(-)?(\\s)?[0-9]{1,3}(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?)?((\\s)?(Agrupación|agrupación|Altillo|altillo|Apartamento|apartamento|Apartamento Sótano|apartamento sótano|Barrio|barrio|Bloque|bloque|Bodega|bodega|Cabecera Municipal|cabecera municipal|Callejón|callejón|Camino|camino|Carretera|carretera|Casa|casa|Caserio|caserio|Célula|celula|Centro|centro|Centro Comercial|centro comercial|Centro Urbano|centro urbano|Circular|circular|Condominio|condominio|Conjunto|conjunto|Consultorio|consultorio|Corregimiento|corregimiento|Deposito|deposito|Deposito |deposito |Sótano|sótano|Edificio|edificio|Entrada|entrada|Esquina|esquina|Etapa|etapa|Finca|finca|Garaje|garaje|Garaje Sótano|garaje sótano|Grada|grada|Inferior|inferior|Inspección de Policia|inspección de policia|Interior|interior|Kilometro|kilometro|Local|local|Local Mezzanine|local mezzanine|Local Sótano|local sótano|Lote|lote|Manzana|manzana|Manzanita|manzanita|Mejora|mejora|Mezzanine|mezzanine|Módulo|módulo|Municipio|municipio|Núcleo|núcleo|Oficina|oficina|Oficina Sótano|oficina sótano|Parcela|parcela|Parcelación|parcelación|Pasaje|pasaje|Penthouse|penthouse|Piso|piso|Porteria|porteria|Predio|predio|Principal|principal|Puente|puente|Quebrada|quebrada|Salon|salon|Sector|sector|Semisótano|semisótano|Suite|suite|Supermanzana|supermanzana|Terraza|terraza|Torre|torre|Troncal|troncal|Unidad|unidad|Urbanización|urbanización|Vereda|vereda|Via|via|Zona|zona|AGN|agn|AL|al|APTO|apto|AS|as|BR|br|BL|bl|BG|bg|CM|cm|CLJ|clj|CN|cn|CT|ct|CA|ca|CAS|cas|CEL|cel|CE|ce|CECO|ceco|CEUR|ceur|CIR|cir|CDM|cdm|CONJ|conj|CS|cs|CO|co|DP|dp|DS|ds|ED|ed|EN|en|ESQ|esq|ET|et|FCA|fca|GJ|gj|GS|gs|GR|gr|INF|inf|IP|ip|IN|in|KM|km|LC|lc|LM|lm|LS|ls|LT|lt|MZ|mz|MZTA|mzta|MJ|mj|MN|mn|MD|md|MUN|mun|NCO|nco|OF|of|OS|os|PA|pa|PCN|pcn|PSJ|psj|PH|ph|PI|pi|PT|pt|PD|pd|PPAL|ppal|PN|pn|QDA|dqa|SA|sa|SEC|sec|SS|ss|SU|su|SMZ|smz|TZ|tz|TO|to|TRL|trl|UN|un|URB|urb|VDA|vda|VIA|via|ZN|zn)?(\\s)?[1-9][0-9]{0,3})*$'
          )
        ]
      ],
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

  crearItemInformacionAcademica(): FormGroup {
    return this.fb.group({
      id: [''],
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
      direccion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(Autopista|autopista|Avenida|avenida|Avenida Calle|avenida calle|Avenida Carrera|avenida carrera|Avenida|avenida|Carrera|carrera|Calle|calle|Carrera|carrera|Circunvalar|circunvalar|Diagonal|diagonal|Kilometro|kilometro|Transversal|transversal|AUTOP|autop|AV|av|AC|ac|AK|ak|CL|cl|KR|kr|CCV|ccv|DG|dg|KM|km|TV|tv)(\\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\\s)?[a-zA-Z]?(\\s)?(bis)?(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?(\\s)?(#(\\s)?[0-9]{1,2}(\\s)?[a-zA-Z]?(\\s)?(bis)?(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?(\\s)?(-)?(\\s)?[0-9]{1,3}(\\s)?(Este|este|Norte|norte|Occidente|occidente|Oeste|oeste|Sur|sur)?)?((\\s)?(Agrupación|agrupación|Altillo|altillo|Apartamento|apartamento|Apartamento Sótano|apartamento sótano|Barrio|barrio|Bloque|bloque|Bodega|bodega|Cabecera Municipal|cabecera municipal|Callejón|callejón|Camino|camino|Carretera|carretera|Casa|casa|Caserio|caserio|Célula|celula|Centro|centro|Centro Comercial|centro comercial|Centro Urbano|centro urbano|Circular|circular|Condominio|condominio|Conjunto|conjunto|Consultorio|consultorio|Corregimiento|corregimiento|Deposito|deposito|Deposito |deposito |Sótano|sótano|Edificio|edificio|Entrada|entrada|Esquina|esquina|Etapa|etapa|Finca|finca|Garaje|garaje|Garaje Sótano|garaje sótano|Grada|grada|Inferior|inferior|Inspección de Policia|inspección de policia|Interior|interior|Kilometro|kilometro|Local|local|Local Mezzanine|local mezzanine|Local Sótano|local sótano|Lote|lote|Manzana|manzana|Manzanita|manzanita|Mejora|mejora|Mezzanine|mezzanine|Módulo|módulo|Municipio|municipio|Núcleo|núcleo|Oficina|oficina|Oficina Sótano|oficina sótano|Parcela|parcela|Parcelación|parcelación|Pasaje|pasaje|Penthouse|penthouse|Piso|piso|Porteria|porteria|Predio|predio|Principal|principal|Puente|puente|Quebrada|quebrada|Salon|salon|Sector|sector|Semisótano|semisótano|Suite|suite|Supermanzana|supermanzana|Terraza|terraza|Torre|torre|Troncal|troncal|Unidad|unidad|Urbanización|urbanización|Vereda|vereda|Via|via|Zona|zona|AGN|agn|AL|al|APTO|apto|AS|as|BR|br|BL|bl|BG|bg|CM|cm|CLJ|clj|CN|cn|CT|ct|CA|ca|CAS|cas|CEL|cel|CE|ce|CECO|ceco|CEUR|ceur|CIR|cir|CDM|cdm|CONJ|conj|CS|cs|CO|co|DP|dp|DS|ds|ED|ed|EN|en|ESQ|esq|ET|et|FCA|fca|GJ|gj|GS|gs|GR|gr|INF|inf|IP|ip|IN|in|KM|km|LC|lc|LM|lm|LS|ls|LT|lt|MZ|mz|MZTA|mzta|MJ|mj|MN|mn|MD|md|MUN|mun|NCO|nco|OF|of|OS|os|PA|pa|PCN|pcn|PSJ|psj|PH|ph|PI|pi|PT|pt|PD|pd|PPAL|ppal|PN|pn|QDA|dqa|SA|sa|SEC|sec|SS|ss|SU|su|SMZ|smz|TZ|tz|TO|to|TRL|trl|UN|un|URB|urb|VDA|vda|VIA|via|ZN|zn)?(\\s)?[1-9][0-9]{0,3})*$'
          )
        ]
      ],
      ciudad: [{ disabled: true, value: null }, [Validators.required]],
      departamento: [{ disabled: true, value: null }, [Validators.required]],
      pais: [null, [Validators.required]],
      ciudadExtranjera: [{ disabled: false, value: '' }, [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      telefonoEmpresa: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      usuario: [''],
      dependencia: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      cargo: [null, [Validators.required]],
      nivelCargo: [null, [Validators.required]],
      trabajoActual: [false]
    });
  }

  addItemExperienciaLaboral(): void {
    this.experienciaLaboral.push(this.crearItemExperienciaLaboral());
  }

  crearFormularioPerfil(): void {
    this.formPerfil = this.fb.group({
      perfilProfesional: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.: ]{0,}$')]],
      anioExperiencia: [null, [Validators.required]],
      mesExperiencia: [null, [Validators.required]],
      aspiracionSalarial: [null, [Validators.required]],
      paisPermisoTrabajo: ['', [Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,. ]{0,}$')]]
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

      // cargar perfil profesional
      this.formPerfil.patchValue({
        perfilProfesional: hojaVida.informacionPersonal.perfilProfesional,
        anioExperiencia: hojaVida.informacionPersonal.anioExperiencia,
        mesExperiencia: hojaVida.informacionPersonal.mesExperiencia,
        aspiracionSalarial: hojaVida.informacionPersonal.aspiracionSalarial,
        paisPermisoTrabajo: hojaVida.informacionPersonal.paisPermisoTrabajo
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
      }
    }

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
          trabajoActual: experiencia.trabajoActual
        });
        this.updatePais(index);
        this.cargarMunicipios(this.experienciaLaboral.at(index).value);
        if (experiencia.trabajoActual === true) {
          this.experienciaLaboral
            .at(index)
            .get(['fechaFin'])
            ?.disable();
        }
      }
    }
  }

  nextStep(): void {
    if (this.step === 3) return;
    let flag = 0;
    switch (this.step) {
      case 0:
        this.archivos.forEach(archivo => {
          if (archivo.tipo === TipoArchivo.DOCUMENTO_IDENTIDAD) {
            flag++;
          }
        });
        if (flag === 0) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('Debe adjuntar el documento de identidad');
        } else {
          this.step++;
        }
        break;
      case 1:
        this.informacionAcademica.length;
        this.archivos.forEach(archivo => {
          if (archivo.tipo === TipoArchivo.CERTIFICADO_ESTUDIO) {
            flag++;
          }
        });
        if (flag < this.informacionAcademica.length) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('Debe adjuntar el título a cada estudio');
        } else {
          this.step++;
        }
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

  onSubmit(): void {
    let flag = 0;
    this.archivos.forEach(archivo => {
      if (archivo.tipo === TipoArchivo.CERTIFICADO_LABORAL) {
        flag++;
      }
    });
    if (flag < this.experienciaLaboral.length) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Debe adjuntar el certificado de cada experiencia');
    } else {
      this.cargando = false;
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
      // Cargar archivos
      if (this.archivos.length !== 0) this.hojaVidaVo.archivos = this.archivos;

      this.service.create(this.hojaVidaVo).subscribe(
        response => {
          if (response.body !== null) {
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
      paisPermisoTrabajo: this.formPerfil.get(['paisPermisoTrabajo'])!.value,
      usuario: new Persona(this.persona),
      estadoCivil: this.formPersonal.get('estadoCivil')!.value,
      nivelEducativoProfesion: this.formPersonal.get('nivelEducativoProfesion')!.value,
      profesion: this.formPersonal.get('profesion')!.value,
      activoNotificaciones: this.formPersonal.get('activoNotificaciones')!.value === this.labels.SI_LABEL ? true : false
    };
  }

  procesarInformacionAcademica(academica: Object): IInformacionAcademica {
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

  procesarExperienciaLaboral(experiencia: Object): IInformacionLaboral {
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
      trabajoActual: experiencia['trabajoActual']
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

  cargarPaises(): void {
    this.apiService.getPaises().subscribe(response => (this.paises = response));
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      const bogota = { codigoDpto: '100', nombreDpto: 'Bogotá D.C.', codigoMpio: '100000', nombreMpio: 'Bogotá D.C.' };
      this.geografia.push(bogota);
      this.cargarDepartamentos();
      this.cargarMunicipios(0);
      this.cargarMunicipiosPersonal(0);
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
        size: 200
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

  // cargar archivos
  addArchivo(event: any, tipoDocumento: number): void {
    const file: File = event.target.files[0];

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

    // La cédula y la licencia de conducción deben ser documentos que se suben una única vez
    let index = -1;
    if (tipoDocumento === TipoArchivo.DOCUMENTO_IDENTIDAD || tipoDocumento === TipoArchivo.LICENCIA_CONDUCCION) {
      index = this.archivos.findIndex(item => item.tipo === tipoDocumento);
    }

    const reader = new FileReader();
    if (index >= 0) {
      this.archivos[index].nombre = file.name;
      this.archivos[index].extension = extension;
      this.archivos[index].usuario = new Persona(this.persona);

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.archivos[index].archivo = reader.result;
      };
    } else {
      const archivo = new Archivo();
      archivo.tipo = tipoDocumento;
      archivo.nombre = file.name;
      archivo.extension = extension;
      archivo.usuario = new Persona(this.persona);

      reader.readAsDataURL(file);
      reader.onload = () => {
        archivo.archivo = reader.result;
        this.archivos.push(archivo);
      };
    }
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

  onChangeTipoDoc(event: any): any {
    if (event.target.value === '2: Object') {
      // eslint-disable-next-line no-console
      console.log('its working');
      this.mensajeDocumento = '*El documento solo puede tener de 6 a 11 carácteres entre minúsculas, mayúsculas y números';
      this.formPersonal.get('numeroDocumento')?.setValue('');
      this.formPersonal.get('numeroDocumento')?.setValidators([Validators.required, Validators.pattern('^[0-9A-Za-z]{6,11}$')]);
    } else {
      this.mensajeDocumento = '*El documento debe contener de 6 a 10 números';
      this.formPersonal.get('numeroDocumento')?.setValue('');
      this.formPersonal.get('numeroDocumento')?.setValidators([Validators.required, Validators.pattern('^[0-9]{6,11}$')]);
    }
  }
}
