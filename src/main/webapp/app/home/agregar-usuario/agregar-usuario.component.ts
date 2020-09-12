import { JhiLanguageService } from 'ng-jhipster';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../../shared/model/persona.model';
import { commonMessages } from '../../shared/constants/commonMessages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../core/user/user.model';
import { TipoUsuario } from '../../shared/model/tipo-usuario.model';
import { TipoDocumento, ITipoDocumento } from '../../shared/model/tipo-documento.model';
import { UsuarioVo } from '../../shared/vo/usuario-vo';
import { PersonaService } from '../../entities/persona/persona.service';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '../../entities/tipo-documento/tipo-documento.service';
import { HttpResponse } from '@angular/common/http';
import { UsuarioService } from '../../entities/usuario/usuario.service';
import { DatosCaptcha } from '../../shared/vo/datos-captcha';
declare let alertify: any;

@Component({
  selector: 'jhi-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  persona = new Persona();
  user = new User();
  tipoUsuario = new TipoUsuario();
  tipoDocumento = new TipoDocumento();
  usuarioVo = new UsuarioVo();
  datosCaptcha = new DatosCaptcha();
  ConfirmarClave: String = '';
  mensajeNombre: any;
  mensajeApellido: any;
  mensajeEmail: any;
  mensajeNumDoc: any;
  mensajeClave: any;
  mensajeConfClave: any;
  mensajeTipoPersona: any;
  mensajeTerminos: any;
  validacionIncorrecta: any = false;
  condiciones: any;
  personaNatural: any;
  document = new Document();
  isOpen = false;
  documentos: Array<ITipoDocumento> = [];
  criterioCaptcha = '';
  textoCaptcha = '';
  var1 = 0;
  var2 = 0;
  captchaValidado = false;
  mensajeCaptcha: any;
  mensajeActivacionCuenta = commonMessages.ACTIVACION_CUENTA_LABEL;

  eyePrimero = '../../../content/images/eye.svg';
  eyeSegundo = '../../../content/images/eye.svg';
  inputPrimero = 'password';
  inputSegundo = 'password';

  constructor(
    private modalService: NgbModal,
    private personaService: PersonaService,
    private languageService: JhiLanguageService,
    private router: Router,
    private tipoDocumentoService: TipoDocumentoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.user.password = '';
    this.cargarTipoDocumento();
    this.crearCaptcha();
  }

  onCrearUsuario(): void {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const NOMBRE_REGEX = /^[a-zA-ZÑÁÉÍÓÚñáéíóú ]{1,}$/;
    const CONTRASENA_REGEX = /.*(?=.{8,20})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z]).*/;
    const PASAPORTE_REGEX = /^[0-9A-Za-z]{6,18}$/;
    const CEDULA_REGEX = /^[0-9]{6,18}$/;
    this.validacionIncorrecta = false;
    this.mensajeNombre = '';
    this.mensajeApellido = '';
    this.mensajeEmail = '';
    this.mensajeNumDoc = '';
    this.mensajeClave = '';
    this.mensajeConfClave = '';
    this.mensajeTipoPersona = '';
    this.mensajeTerminos = '';
    this.mensajeCaptcha = '';

    // if (!this.tipoUsuario.id) {
    //   this.mensajeTipoPersona = "*Seleccione tipo de persona";
    //   this.validacionIncorrecta = true;
    // }
    if (!this.persona.nombre?.match(NOMBRE_REGEX)) {
      this.mensajeNombre = 'El nombre contine carácteres no permitidos';
      this.validacionIncorrecta = true;
    }
    if (!this.persona.nombre) {
      this.mensajeNombre = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.persona.apellido?.match(NOMBRE_REGEX)) {
      this.mensajeApellido = 'El apellido contiene carácteres no permitidos';
      this.validacionIncorrecta = true;
    }
    if (!this.persona.apellido) {
      this.mensajeApellido = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.persona.email?.match(EMAIL_REGEX)) {
      this.mensajeEmail = commonMessages.FORMATO_EMAIL_INVALIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.persona.email) {
      this.mensajeEmail = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.persona.numeroDocumento) {
      this.mensajeNumDoc = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (
      this.tipoDocumento.nombreTipo === 'Pasaporte' &&
      this.persona.numeroDocumento &&
      !this.persona.numeroDocumento.toString()?.match(PASAPORTE_REGEX)
    ) {
      this.mensajeNumDoc = '*El documento solo puede tener de 6 a 18 carácteres entre minúsculas, mayúsculas y números';
      this.validacionIncorrecta = true;
    }
    if (
      this.tipoDocumento.nombreTipo !== 'Pasaporte' &&
      this.persona.numeroDocumento &&
      !this.persona.numeroDocumento.toString()?.match(CEDULA_REGEX)
    ) {
      this.mensajeNumDoc = '*El documento debe contener de 6 a 18 números';
      this.validacionIncorrecta = true;
    }
    if (this.tipoDocumento.id === undefined) {
      this.mensajeNumDoc = '*Seleccione un tipo de Documento';
      this.validacionIncorrecta = true;
    }
    if (!this.user.password?.match(CONTRASENA_REGEX)) {
      this.mensajeClave = '*La contraseña debe contener de 8 a 20 carácteres entre letras mayúsculas, minúsculas y números';
      this.validacionIncorrecta = true;
    }
    if (!this.user.password) {
      this.mensajeClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.ConfirmarClave && !this.user.password) {
      this.mensajeConfClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (this.user.password !== this.ConfirmarClave) {
      this.mensajeConfClave = commonMessages.CONTRASENA_NO_COINCIDEN;
      this.validacionIncorrecta = true;
    }
    if (!this.condiciones) {
      this.mensajeTerminos = '*Debe aceptar los términos y condiciones';
      this.validacionIncorrecta = true;
    }

    if (!this.captchaValidado) {
      this.mensajeCaptcha = '*Debe resolver el captcha';
      this.validacionIncorrecta = true;
    }

    if (this.validacionIncorrecta === false) {
      // eliminar esta línea al activar tipo usuario jurídico
      this.tipoUsuario.id = 1;
      this.persona;
      this.personaNatural;
      this.user;
      this.persona.tipoUsuario = this.tipoUsuario;
      this.persona.tipoDocumento = this.tipoDocumento;
      this.user.login = this.persona.email;
      this.user.email = this.persona.email;
      this.user.activated = false;
      this.user.createdBy = 'admin';
      this.user.firstName = this.persona.nombre;
      this.user.lastName = this.persona.apellido;
      this.user.langKey = this.languageService.getCurrentLanguage();
      this.usuarioVo.persona = this.persona;
      this.usuarioVo.usuario = this.user;
      if (this.persona.id !== undefined) {
        this.personaService.create(this.persona).subscribe(
          () => {
            this.ventanaInicioSesion();
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          error => {
            alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo registro de usuario!');
          }
        );
      } else {
        this.personaService.crearUsuario(this.usuarioVo).subscribe(
          () => {
            this.ventanaInicioSesion();
          },
          error => {
            if (error.error?.errorKey === 'userexists') {
              alertify.set('notifier', 'position', 'top-right'), alertify.error('Usuario ya registrado!');
            } else {
              alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo registro de usuario!');
            }
          }
        );
      }
    }
  }

  ventanaInicioSesion(): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Ingresado correctamente!');
    alertify
      .alert()
      .setting({
        label: 'Entendido',
        title: '<b> INFORMACIÓN </b>',
        onok: () => {
          this.ventanaInicioSesionRegistrado();
        }
      })
      .setContent('<p>' + this.mensajeActivacionCuenta + '</p>')
      .show();
    // this.router.navigate(['/inicio-sesion']);
  }

  ventanaInicioSesionRegistrado(): void {
    this.router.navigate(['/inicio-sesion']);
  }

  openScrollableContent(longContent: any): void {
    const modalRef: NgbModalRef = this.modalService.open(longContent, { scrollable: true });
    modalRef.result.finally(() => (this.isOpen = false));
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

  crearCaptcha(): any {
    this.var1 = Math.floor(Math.random() * 100);
    this.var2 = Math.floor(Math.random() * 100);
    this.textoCaptcha = this.var1.toString() + ' + ' + this.var2.toString();
  }

  validarCaptcha(): any {
    this.datosCaptcha = new DatosCaptcha();
    this.datosCaptcha.var1 = this.var1;
    this.datosCaptcha.var2 = this.var2;
    this.datosCaptcha.result = parseInt(this.criterioCaptcha, 10);
    this.usuarioService.validarCaptcha(this.datosCaptcha).subscribe(response => {
      if (response.body === true) {
        this.captchaValidado = true;
        this.mensajeCaptcha = '';
      } else {
        this.mensajeCaptcha = '*Suma incorrecta';
        this.captchaValidado = false;
        this.crearCaptcha();
      }
    });
  }

  clicPrimerInput(): void {
    if (this.eyePrimero === '../../../content/images/eye.svg') {
      this.eyePrimero = '../../../content/images/eye-slash.svg';
      this.inputPrimero = 'text';
    } else {
      this.eyePrimero = '../../../content/images/eye.svg';
      this.inputPrimero = 'password';
    }
  }

  clicSegundoInput(): void {
    if (this.eyeSegundo === '../../../content/images/eye.svg') {
      this.eyeSegundo = '../../../content/images/eye-slash.svg';
      this.inputSegundo = 'text';
    } else {
      this.eyeSegundo = '../../../content/images/eye.svg';
      this.inputSegundo = 'password';
    }
  }
}
