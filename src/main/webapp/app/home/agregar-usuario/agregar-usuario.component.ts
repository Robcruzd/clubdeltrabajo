/* eslint-disable @typescript-eslint/camelcase */
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
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumentoService } from '../../entities/tipo-documento/tipo-documento.service';
import { HttpResponse } from '@angular/common/http';
import { UsuarioService } from '../../entities/usuario/usuario.service';
import { DatosCaptcha } from '../../shared/vo/datos-captcha';
import { Empresa } from '../../shared/model/empresa.model';
import { EmpresaVo } from '../../shared/vo/empresa-vo';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { ISector, Sector } from 'app/shared/model/sector.model';
import { SectorService } from 'app/shared/services/sector.service';
declare let alertify: any;

@Component({
  selector: 'jhi-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  cMAgregarUsuario: any = null;
  persona = new Persona();
  empresa = new Empresa();
  user = new User();
  tipoUsuario = new TipoUsuario();
  natural: Boolean = true;
  juridico: Boolean = false;
  tipoDocumento = new TipoDocumento();
  sector = new Sector();
  usuarioVo = new UsuarioVo();
  empresaVo = new EmpresaVo();
  datosCaptcha = new DatosCaptcha();
  ConfirmarClave: String = '';
  mensajeNombre: any;
  mensajeRSocial: any;
  mensajeApellido: any;
  mensajeRComercial: any;
  mensajeEmail: any;
  mensajeNumDoc: any;
  mensajeNIT: any;
  mensajeClave: any;
  mensajeConfClave: any;
  mensajeTipoPersona: any;
  mensajeTerminos: any;
  mensajeRazon: any;
  mensajeSector: any;
  validacionIncorrecta: any = true;
  condiciones: any;
  personaNatural: any;
  document = new Document();
  isOpen = false;
  documentos: Array<ITipoDocumento> = [];
  sectores: Array<ISector> = [];
  criterioCaptcha = '';
  textoCaptcha = '';
  var1 = 0;
  var2 = 0;
  captchaValidado = false;
  mensajeCaptcha: any;
  mensajeActivacionCuenta = commonMessages.ACTIVACION_CUENTA_LABEL;
  Politicas = commonMessages.POLITICAS;
  TCP = commonMessages.TERMINOS_CONDICIONES_POLITICAS;
  Aceptolos = commonMessages.ACEPTO_LOS;
  Registrarme = commonMessages.REGISTRARME;
  resol = commonMessages.RESOLVER;
  captchaCuanto = commonMessages.CAPTCHA_CUANTO_ES;
  ConfirContra = commonMessages.CONFIRMAR_PASSWORD;
  Contra = commonMessages.PASSWORD;
  email = commonMessages.CORREO_ELECTRONICO;
  nit = commonMessages.NIT;
  SelecTipo = commonMessages.SELECCIONE_TIPO;
  SelectSector = commonMessages.SELECCIONE_SECTOR;
  NumDoc = commonMessages.NUMERO_DOCUMENTO_LABEL;
  RazonSocial = commonMessages.RAZON_SOCIAL;
  Apellidos = commonMessages.APELLIDOS;
  Sector = commonMessages.SECTOR;
  Nombres = commonMessages.NOMBRES;
  PersonaNatural = commonMessages.TIPO_USUARIO_1;
  PersonaJuridica = commonMessages.TIPO_USUARIO_2;
  YaRegistrado = commonMessages.YA_REGISTRADO;
  Aceptar = commonMessages.ACEPTAR;
  RegistroEntra = commonMessages.REGISTRATE;

  eyePrimero = '../../../content/images/eye.svg';
  eyeSegundo = '../../../content/images/eye.svg';
  inputPrimero = 'password';
  inputSegundo = 'password';

  constructor(
    private modalService: NgbModal,
    private personaService: PersonaService,
    private empresaService: EmpresaService,
    private languageService: JhiLanguageService,
    private router: Router,
    private tipoDocumentoService: TipoDocumentoService,
    private sectorService: SectorService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('userType') === 'juridico') {
      this.tipoUsuario.nombre = 'juridico';
      this.tipoUsuario.id = 2;
      this.natural = false;
      this.juridico = true;
    } else {
      this.tipoUsuario.nombre = 'natural';
      this.tipoUsuario.id = 1;
      this.natural = true;
      this.juridico = false;
    }
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmAgregarUsuario'
      })
      .subscribe(
        res => {
          if (res !== null && res.body !== null) {
            const body: any = res.body;
            const mensajes = JSON.parse(body[0].mensajes);
            this.cMAgregarUsuario = mensajes;
          }
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cMAgregarUsuario = 0;
          this.cargarTipoDocumento();
          this.cargarSector();
          this.crearCaptcha();
        }
      );
    this.user.password = '';
  }

  updateVariables(): void {
    this.mensajeActivacionCuenta = this.cMAgregarUsuario.ACTIVACION_CUENTA_LABEL;
    this.Politicas = this.cMAgregarUsuario.POLITICAS;
    this.TCP = this.cMAgregarUsuario.TERMINOS_CONDICIONES_POLITICAS;
    this.Aceptolos = this.cMAgregarUsuario.ACEPTO_LOS;
    this.Registrarme = this.cMAgregarUsuario.REGISTRARME;
    this.resol = this.cMAgregarUsuario.RESOLVER;
    this.captchaCuanto = this.cMAgregarUsuario.CAPTCHA_CUANTO_ES;
    this.ConfirContra = this.cMAgregarUsuario.CONFIRMAR_PASSWORD;
    this.Contra = this.cMAgregarUsuario.PASSWORD;
    this.email = this.cMAgregarUsuario.CORREO_ELECTRONICO;
    this.nit = this.cMAgregarUsuario.NIT;
    this.SelecTipo = this.cMAgregarUsuario.SELECCIONE_TIPO;
    this.NumDoc = this.cMAgregarUsuario.NUMERO_DOCUMENTO_LABEL;
    this.RazonSocial = this.cMAgregarUsuario.RAZON_SOCIAL;
    this.Apellidos = this.cMAgregarUsuario.APELLIDOS;
    this.Sector = this.cMAgregarUsuario.SECTOR;
    this.Nombres = this.cMAgregarUsuario.NOMBRES;
    this.PersonaNatural = this.cMAgregarUsuario.TIPO_USUARIO_1;
    this.PersonaJuridica = this.cMAgregarUsuario.TIPO_USUARIO_2;
    this.YaRegistrado = this.cMAgregarUsuario.YA_REGISTRADO;
    this.Aceptar = this.cMAgregarUsuario.ACEPTAR;
    this.RegistroEntra = this.cMAgregarUsuario.REGISTRATE;
    this.cargarTipoDocumento();
    this.cargarSector();
    this.crearCaptcha();
  }

  deleteSpace(variable: string): void {
    // eslint-disable-next-line no-console
    console.log(this.persona[variable]);
    if (this.persona[variable] !== undefined) {
      this.persona[variable] = this.persona[variable]!.trim();
    }
  }

  deleteSpace2(variable: string): void {
    // eslint-disable-next-line no-console
    console.log(this.empresa[variable]);
    if (this.persona[variable] !== undefined) {
      this.empresa[variable] = this.empresa[variable]!.trim();
    }
  }

  changeTipoUsuario(tipo: string): void {
    if (tipo === 'juridico') {
      this.tipoUsuario.nombre = 'juridico';
      this.tipoUsuario.id = 2;
      this.natural = false;
      this.juridico = true;
    } else {
      this.tipoUsuario.nombre = 'natural';
      this.tipoUsuario.id = 1;
      this.natural = true;
      this.juridico = false;
    }
  }

  onCrearUsuario(): void {
    this.empresa.sector = this.sector.sector;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const NOMBRE_REGEX = /^[a-zA-ZÑÁÉÍÓÚñáéíóú ]{1,}$/;
    const NOMBRE2_REGEX = /^[a-zA-ZÑÁÉÍÓÚñáéíóú0-9 ]{1,}$/;
    const CONTRASENA_REGEX = /.*(?=.{8,20})(?=..*[0-9]).*/;
    const PASAPORTE_REGEX = /^[0-9A-Za-z]{6,18}$/;
    const CEDULA_REGEX = /^[0-9]{5,18}$/;
    const NIT_REGEX = /^[0-9-]{5,18}$/;
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
    if (this.natural) {
      if (!this.persona.nombre?.match(NOMBRE_REGEX)) {
        this.mensajeNombre = 'El nombre contiene carácteres no permitidos';
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
      // eslint-disable-next-line no-console
      console.log(
        'tipo:---',
        this.tipoDocumento.nombreTipo === 'NIT',
        this.persona.numeroDocumento,
        !this.persona.numeroDocumento?.toString()?.match(NIT_REGEX)
      );
      if (
        this.tipoDocumento.nombreTipo === 'NIT' &&
        this.persona.numeroDocumento &&
        !this.persona.numeroDocumento.toString()?.match(NIT_REGEX)
      ) {
        this.mensajeNumDoc = '*El documento solo puede tener de 6 a 18 carácteres';
        this.validacionIncorrecta = true;
      }
      if (
        this.tipoDocumento.nombreTipo !== 'Pasaporte' &&
        this.tipoDocumento.nombreTipo !== 'NIT' &&
        this.persona.numeroDocumento &&
        !this.persona.numeroDocumento.toString()?.match(CEDULA_REGEX)
      ) {
        this.mensajeNumDoc = '*El documento debe contener de 5 a 18 números';
        this.validacionIncorrecta = true;
      }
      if (this.tipoDocumento.id === undefined) {
        this.mensajeNumDoc = '*Seleccione un tipo de Documento';
        this.validacionIncorrecta = true;
      }
    } else {
      if (!this.empresa.razonSocial?.match(NOMBRE2_REGEX)) {
        this.mensajeRazon = 'La razón social contiene carácteres no permitidos';
        this.validacionIncorrecta = true;
      }
      if (!this.empresa.razonSocial) {
        this.mensajeRazon = commonMessages.CAMPO_REQUERIDO;
        this.validacionIncorrecta = true;
      }
      if (this.sector.sector === undefined) {
        this.mensajeSector = commonMessages.CAMPO_REQUERIDO;
        this.validacionIncorrecta = true;
      }
      if (!this.empresa.email?.match(EMAIL_REGEX)) {
        this.mensajeEmail = commonMessages.FORMATO_EMAIL_INVALIDO;
        this.validacionIncorrecta = true;
      }
      if (!this.empresa.email) {
        this.mensajeEmail = commonMessages.CAMPO_REQUERIDO;
        this.validacionIncorrecta = true;
      }
      if (!this.empresa.numeroDocumento) {
        this.mensajeNumDoc = commonMessages.CAMPO_REQUERIDO;
        this.validacionIncorrecta = true;
      }
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
      // this.tipoUsuario.id = 1;
      // this.persona;
      // this.personaNatural;
      // this.user;
      if (this.tipoUsuario.id === 1) {
        this.persona.tipoUsuario = this.tipoUsuario;
        this.persona.tipoDocumento = this.tipoDocumento;
        this.user.login = this.persona.email;
        this.user.email = this.persona.email;
        this.user.firstName = this.persona.nombre;
        this.user.lastName = this.persona.apellido;
        this.user.activated = false;
        this.user.createdBy = 'admin';
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
              this.validacionIncorrecta = true;
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
                this.validacionIncorrecta = true;
                alertify.set('notifier', 'position', 'top-right'), alertify.error('Usuario ya registrado!');
              } else {
                this.validacionIncorrecta = true;
                alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo registro de usuario!');
              }
            }
          );
        }
      } else {
        this.empresa.descargasHv = 0;
        this.empresa.publicacionesOferta = 1;
        this.empresa.membresia = false;
        this.empresa.replicasOferta = 0;
        this.empresa.visualizacionesHv = 0;
        this.empresa.clubEmpresa = false;
        const tipodoc = { id: 5, nombreTipo: 'NIT' };
        this.empresa.tipoUsuario = this.tipoUsuario;
        this.empresa.tipoDocumento = tipodoc;
        this.empresa.ofertaVip = 0;
        this.user.login = this.empresa.email;
        this.user.email = this.empresa.email;
        this.user.firstName = this.empresa.razonSocial;
        this.user.lastName = ' ';
        this.user.activated = false;
        this.user.createdBy = 'admin';
        this.user.langKey = this.languageService.getCurrentLanguage();
        this.empresaVo.empresa = this.empresa;
        this.empresaVo.usuario = this.user;
        if (this.empresa.id !== undefined) {
          this.empresaService.create(this.empresa).subscribe(
            () => {
              this.ventanaInicioSesion();
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            error => {
              alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo registro de usuario!');
            }
          );
        } else {
          this.empresaService.crearUsuario(this.empresaVo).subscribe(
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
  }

  ventanaInicioSesion(): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Ingresado correctamente!');
    this.validacionIncorrecta = true;
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

  cargarSector(): void {
    this.sectorService.getSector().subscribe(res => {
      if (res !== null) {
        this.sectores = res;
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
