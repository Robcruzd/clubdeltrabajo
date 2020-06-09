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
  ulrImgDefault = '../../../content/images/Image 28.png';
  hojaVidaVo!: HojaVidaVo | null;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private personaService: PersonaService,
    private service: HojaVidaService,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.qrCard = 'Perfil de presentación Juan Pérez.';
    this.cargarInformacionCuenta();
    this.cargarHojaVida();
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
    this.router.navigate(['hoja-vida']);
  }

  cargarImagen(event: any, tipoDocumento: number): void {
    // Se elimina la opción pdf
    const archivosPermitidos = commonMessages.ARCHIVOS_PERMITIDOS;
    archivosPermitidos.splice(
      commonMessages.ARCHIVOS_PERMITIDOS.findIndex(item => item === 'pdf'),
      1
    );

    const file: File = event.target.files[0];
    const extension = file.name.split('.').pop() || '';
    if (!archivosPermitidos.includes(extension)) {
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
