import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { commonMessages } from '../../shared/constants/commonMessages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../core/auth/account.service';
import { User } from '../../core/user/user.model';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import { Empresa } from '../../shared/model/empresa.model';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { ApiService } from '../../shared/services/api.service';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Archivo } from 'app/shared/model/archivo.model';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';

declare let alertify: any;

@Component({
  selector: 'jhi-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  labels = commonMessages;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  formEmpresa!: FormGroup;
  usuario!: User | null;
  datosEmpresa!: Empresa | null;
  municipiosAcademica: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  empresa: any;
  imagen!: Archivo;
  persona: any;
  tipoArchivo = TipoArchivo;
  // ciudad: Array<IOpcionVoMunicipio> = [];

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private accountService: AccountService,
    private empresaService: EmpresaService,
    private apiService: ApiService,
    private router: Router,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionCuenta();
    this.crearFormularioEmpresa();
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
      this.cargarFormularioEmpresa();
    });
    this.consultarInformacionGeografica();
  }

  obtenerIdUsuario(): Promise<any> {
    return new Promise(resolve => {
      this.accountService.getAuthenticationState().subscribe(
        response => {
          resolve(response);
        },
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Ingresado correctamente'))
      );
    });
  }

  async cargarInformacionCuenta(): Promise<any> {
    const cuenta = await this.obtenerIdUsuario();
    const idEmpresa = cuenta.userEmpresa;
    this.empresaService.find(idEmpresa).subscribe(
      response => {
        this.empresa = response.body;
        this.consultarImagen();
      },
      () => (alertify.set('notifier', 'position', 'top-right'), alertify.error(commonMessages.HTTP_ERROR_LABEL))
    );
  }

  consultarImagen(): void {
    // eslint-disable-next-line no-console
    console.log('consultar imagennnnnnn ', this.empresa);
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, this.empresa.id).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log('response:     ', response);
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  crearFormularioEmpresa(): void {
    this.formEmpresa = this.fb.group({
      id: [''],
      razonSocial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ0-9 ]{1,}$')]],
      razonComercial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ0-9 ]{1,}$')]],
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      ciudad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sector: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      subsector: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      webPage: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
      cantidadEmpleados: ['', [Validators.required, Validators.pattern('^[0-9]{0,}$')]],
      descripcion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      nombreRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
      apellidosRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
      telefonoRep: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]]
    });
  }

  cargarFormularioEmpresa(): void {
    if (this.usuario?.userEmpresa) {
      this.empresaService.find(this.usuario.userEmpresa).subscribe(response => {
        this.datosEmpresa = response.body;
        this.formEmpresa.patchValue({
          razonSocial: this.datosEmpresa!.razonSocial,
          razonComercial: this.datosEmpresa!.razonComercial,
          numeroDocumento: this.datosEmpresa!.numeroDocumento,
          direccion: this.datosEmpresa!.direccion,
          telefono: this.datosEmpresa!.telefonoEmpresa,
          ciudad: this.datosEmpresa!.ciudad?.toString(),
          email: this.datosEmpresa!.email,
          sector: this.datosEmpresa!.sector,
          subsector: this.datosEmpresa!.subsector,
          webPage: this.datosEmpresa!.paginaWeb,
          cantidadEmpleados: this.datosEmpresa!.cantidadEmpleados,
          descripcion: this.datosEmpresa!.descripcionEmpresa,
          nombreRepresentante: this.datosEmpresa!.nombreRepresentanteLegal,
          apellidosRepresentante: this.datosEmpresa!.apellidosRepresentanteLegal,
          telefonoRep: this.datosEmpresa!.telefono
        });
      });
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

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      // const bogota = { codigoDpto: '100', nombreDpto: 'Bogotá D.C.', codigoMpio: '100000', nombreMpio: 'Bogotá D.C.' };
      // this.geografia.push(bogota);
      this.cargarMunicipiosAcademica();
    });
  }

  backClicked(): void {
    this._location.back();
  }

  onSubmit(): void {
    this.datosEmpresa!.razonSocial = this.formEmpresa.controls['razonSocial'].value;
    this.datosEmpresa!.razonComercial = this.formEmpresa.controls['razonComercial'].value;
    this.datosEmpresa!.numeroDocumento = this.formEmpresa.controls['numeroDocumento'].value;
    this.datosEmpresa!.direccion = this.formEmpresa.controls['direccion'].value;
    this.datosEmpresa!.telefonoEmpresa = this.formEmpresa.controls['telefono'].value;
    this.datosEmpresa!.ciudad = parseInt(this.formEmpresa.controls['ciudad'].value, 10);
    this.datosEmpresa!.email = this.formEmpresa.controls['email'].value;
    this.datosEmpresa!.sector = this.formEmpresa.controls['sector'].value;
    this.datosEmpresa!.subsector = this.formEmpresa.controls['subsector'].value;
    this.datosEmpresa!.paginaWeb = this.formEmpresa.controls['webPage'].value;
    this.datosEmpresa!.cantidadEmpleados = this.formEmpresa.controls['cantidadEmpleados'].value;
    this.datosEmpresa!.descripcionEmpresa = this.formEmpresa.controls['descripcion'].value;
    this.datosEmpresa!.nombreRepresentanteLegal = this.formEmpresa.controls['nombreRepresentante'].value;
    this.datosEmpresa!.apellidosRepresentanteLegal = this.formEmpresa.controls['apellidosRepresentante'].value;
    this.datosEmpresa!.telefono = this.formEmpresa.controls['telefonoRep'].value;
    // eslint-disable-next-line no-console
    console.log('probandoooooo', this.datosEmpresa);
    this.empresaService.update(this.datosEmpresa).subscribe(
      response => {
        // eslint-disable-next-line no-console
        console.log(response);
        if (response.body !== null) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          this.router.navigate(['/perfil-empresa']);
        }
      },
      () => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(commonMessages.HTTP_ERROR_LABEL);
      }
    );
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

  addCiudad(): void {}

  cargarImagen(event: any, tipoDocumento: number): void {
    const file: File = event.target.files[0];
    const extension = file.name.split('.').pop() || '';

    if (file.size > commonMessages.TAMANO_MAXIMO_PERMITIDO) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_TAMANO_EXCEDIDO);
      return;
    }
    if (!commonMessages.IMAGENES_SOPORTADAS.includes(extension)) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_IMAGEN_NO_SOPORTADA);
      return;
    }

    this.imagen = this.imagen || new Archivo();
    this.imagen.tipo = tipoDocumento;
    this.imagen.nombre = file.name;
    this.imagen.extension = extension;
    this.imagen.empresa = this.empresa;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagen.archivo = reader.result;
      this.subirImagen();
    };
  }

  subirImagen(): void {
    if (this.imagen.id !== undefined) {
      this.archivoService.update(this.imagen).subscribe(
        response => {
          if (response.body !== null) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    } else {
      this.archivoService.create(this.imagen).subscribe(
        response => {
          if (response.body !== null) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    }
  }
}
