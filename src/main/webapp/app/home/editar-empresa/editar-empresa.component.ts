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
  empresa = new Empresa();
  imagen!: Archivo;
  persona: any;
  tipoArchivo = TipoArchivo;

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
    this.crearFormularioEmpresa();
    this.accountService.getAuthenticationState().subscribe(account => {
      this.usuario = account;
      this.cargarFormularioEmpresa();
    });
    this.consultarInformacionGeografica();
    // eslint-disable-next-line no-console
    console.log(this.municipiosAcademica);
  }

  crearFormularioEmpresa(): void {
    this.formEmpresa = this.fb.group({
      id: [''],
      razonSocial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      razonComercial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      ciudad: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
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
          telefono: this.datosEmpresa!.telefono,
          ciudad: this.datosEmpresa!.ciudad,
          email: this.datosEmpresa!.email,
          sector: this.datosEmpresa!.sector,
          subsector: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
          webPage: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
          cantidadEmpleados: ['', [Validators.required, Validators.pattern('^[0-9]{0,}$')]],
          descripcion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
          nombreRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
          apellidosRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ.:/ ]{1,}$')]],
          telefonoRep: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]]
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

  editarRegistro(): void {
    this.datosEmpresa!.razonSocial = this.formEmpresa.controls['razonSocial'].value;
    this.datosEmpresa!.razonComercial = this.formEmpresa.controls['razonComercial'].value;
    this.datosEmpresa!.numeroDocumento = this.formEmpresa.controls['numeroDocumento'].value;
    this.datosEmpresa!.direccion = this.formEmpresa.controls['direccion'].value;
    this.datosEmpresa!.telefono = this.formEmpresa.controls['telefono'].value;
    this.datosEmpresa!.ciudad = this.formEmpresa.controls['ciudad'].value;
    this.datosEmpresa!.email = this.formEmpresa.controls['email'].value;

    this.empresaService.update(this.datosEmpresa).subscribe(() => {});
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
    this.imagen.usuario = this.persona;

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
