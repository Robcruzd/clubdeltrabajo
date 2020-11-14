import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { AccountService } from '../../core/auth/account.service';
import { ArchivoService } from '../../entities/archivo/archivo.service';
import { PersonaService } from '../../entities/persona/persona.service';
import { Archivo } from '../../shared/model/archivo.model';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { HojaVidaVo } from './../../shared/vo/hoja-vida-vo';
import { HojaVidaService } from './../../shared/services/hoja-vida.service';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { ApiService } from 'app/shared/services/api.service';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { Account } from 'app/core/user/account.model';

declare let alertify: any;

@Component({
  selector: 'jhi-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  lblVerHojaVida = commonMessages.VER_HOJA_VIDA_LABEL;
  lblBuscaEmpleo = commonMessages.VER_BUSCA_EMPLEO_LABEL;
  lblVerOfertas = commonMessages.VER_OFERTAS_LABEL;
  lblEditarHojaVida = commonMessages.EDITAR_HOJA_VIDA_LABEL;
  lblImagenPerfil = commonMessages.IMAGEN_LABEL;
  qrCard: any;
  persona: any;
  tipoArchivo = TipoArchivo;
  imagen!: Archivo;
  ulrImgDefault = '';
  hojaVidaVo!: HojaVidaVo | null;
  geografia: Array<GeografiaVo> = [];
  municipios: Array<IOpcionVo> = [];
  account!: Account | null;
  personaInicial!: number;
  archivos!: Array<Archivo> | undefined;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private personaService: PersonaService,
    private service: HojaVidaService,
    private archivoService: ArchivoService,
    private apiService: ApiService,
    private hojaVidaService: HojaVidaService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionCuenta();
    this.cargarHojaVida();
    this.consultarInformacionGeografica();
    this.cargarCuentaUsuario();
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.personaInicial = this.account?.user || 0;
      this.getHojaVida();
    });
  }

  getHojaVida(): void {
    this.hojaVidaService.find(this.personaInicial).subscribe(response => {
      this.hojaVidaVo = response.body;
      this.ulrImgDefault =
        this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
          ? '../../../content/images/Image 28_F.png'
          : '../../../content/images/Image 28_M.png';
      this.qrCard = 'Perfil de presentación ' + this.account?.firstName + ' ' + this.account?.lastName;
      this.archivos = this.hojaVidaVo?.archivos;
      this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
      if (this.hojaVidaVo?.informacionPersonal === null && this.imagen.archivo !== undefined) {
        alertify
          .alert('ATENCIÓN', 'Debe registrar su hoja de vida en el botón Editar Hoja de Vida')
          .setting({
            label: 'Aceptar'
          })
          .show();
      } else if (this.imagen.archivo === undefined && this.hojaVidaVo?.informacionPersonal !== null) {
        alertify
          .alert('ATENCIÓN', 'Debe insertar su foto de perfil.')
          .setting({
            label: 'Aceptar'
          })
          .show();
      } else if (this.hojaVidaVo?.informacionPersonal === null && this.imagen.archivo === undefined) {
        alertify
          .alert('ATENCIÓN', 'Debe insertar su foto de perfil y registrar su hoja de vida en el botón Editar Hoja de Vida.')
          .setting({
            label: 'Aceptar'
          })
          .show();
      }
    });
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
    const idPersona = cuenta.user;
    this.personaService.find(idPersona).subscribe(
      response => {
        this.persona = response.body;
        this.consultarImagen();
      },
      () => (alertify.set('notifier', 'position', 'top-right'), alertify.error(commonMessages.HTTP_ERROR_LABEL))
    );
  }

  async cargarHojaVida(): Promise<any> {
    const cuenta = await this.obtenerIdUsuario();
    this.service.find(cuenta.user).subscribe(response => {
      this.hojaVidaVo = response.body;
    });
  }

  consultarImagen(): void {
    this.archivoService.get(this.persona.id, TipoArchivo.IMAGEN_PERFIL).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  editarHojaVida(): void {
    this.router.navigate(['crear-hoja-vida']);
  }

  verHojaVida(): void {
    this.router.navigate(['visualizar-hoja-vida']);
  }

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

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      this.cargarMunicipios();
    });
  }

  private cargarMunicipios(): void {
    this.municipios = this.geografia.map(item => {
      return {
        codigo: item.codigoMpio,
        nombre: item.nombreMpio
      };
    });
  }

  getCiudad(codigo: string): string {
    const ciudad = this.municipios.find(item => item.codigo === codigo);

    return ciudad?.nombre || '';
  }
}
