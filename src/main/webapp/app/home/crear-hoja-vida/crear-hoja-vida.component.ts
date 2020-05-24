import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { commonMessages } from '../../shared/constants/commonMessages';
import { ApiService } from '../../shared/services/api.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { IOpcionVo } from '../../shared/vo/option-vo';

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
  formLaboral!: FormGroup;
  formAcademica!: FormArray;
  formIdiomas!: FormArray;
  step!: number;
  geografia: Array<GeografiaVo> = [];
  departamentos: Array<IOpcionVo> = [];
  municipios: Array<IOpcionVo> = [];
  mostrar!: boolean;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.step = 0;
    this.mostrar = false;

    this.globalForm = this.crearFormularioGeneral();
    this.crearFormularioInformacionPersonal();
    this.crearFormularioPerfil();
    this.consultarInformacionGeografica();
  }

  crearFormularioGeneral(): FormGroup {
    return this.fb.group({
      informacionAcademica: this.fb.array([this.crearItemInformacionAcademica()]),
      idiomas: this.fb.array([this.crearItemIdioma()]),
      experienciaLaboral: this.fb.array([this.crearItemExperienciaLaboral()])
    });
  }

  crearFormularioInformacionPersonal(): void {
    this.formPersonal = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]], // numero documento
      fechaNacimiento: ['', [Validators.required]],
      lugarNacimiento: [''],
      direccionResidencia: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      discapacidad: [''],
      redesSociales: [''],
      perfilProfesional: [''],
      licencenciaConduccion: ['']
    });
  }

  crearItemInformacionAcademica(): FormGroup {
    return this.fb.group({
      id: [''],
      nivelEstudio: ['', [Validators.required]],
      estado: [''],
      fechaInicio: [''],
      fechaFin: [''],
      tituloOtorgado: [''],
      usuario: [''],
      idioma: [''],
      nivelIdioma: [''],
      institucion: ['']
    });
  }

  addItemInformacionAcademica(): void {
    this.informacionAcademica.push(this.crearItemInformacionAcademica());
  }

  crearItemIdioma(): FormGroup {
    return this.fb.group({
      idioma: [''],
      nivel: ['']
    });
  }

  addItemIdioma(): void {
    this.idiomas.push(this.crearItemIdioma());
  }

  crearItemExperienciaLaboral(): FormGroup {
    return this.fb.group({
      id: [''],
      nombreEmpresa: [''],
      fechaInicio: [''],
      fechaFin: [''],
      direccion: [''],
      cuidad: [''],
      departamento: [''],
      pais: [''],
      telefonoEmpresa: [''],
      usuario: [''],
      dependencia: [''],
      cargo: ['']
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
    this.mostrar = true;
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(response => {
      this.geografia = response;
      this.cargarDepartamentos();
      this.cargarMunicipios(this.departamentos[0].codigo);
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

  cargarMunicipios(codigoDpto: string): void {
    this.municipios = this.geografia
      .filter(item => item.codigoDpto === codigoDpto)
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      });
  }

  // getters
  get informacionPersonal(): FormArray {
    return this.globalForm.get('informacionPersonal') as FormArray;
  }

  get informacionAcademica(): FormArray {
    return this.globalForm.get('informacionAcademica') as FormArray;
  }

  get idiomas(): FormArray {
    return this.globalForm.get('idiomas') as FormArray;
  }

  get experienciaLaboral(): FormArray {
    return this.globalForm.get('experienciaLaboral') as FormArray;
  }
}
