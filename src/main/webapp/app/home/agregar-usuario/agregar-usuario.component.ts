import { Component, OnInit } from '@angular/core';
import { Persona } from '../../shared/model/persona.model';
import { commonMessages } from '../../shared/constants/commonMessages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../core/user/user.model';
import { TipoUsuario } from '../../shared/model/tipo-usuario.model';
import { TipoDocumento } from '../../shared/model/tipo-documento.model';
import { UsuarioVo } from '../../shared/vo/usuario-vo';
import { PersonaService } from '../../entities/persona/persona.service';
import { Router } from '@angular/router';

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
  ConfirmarClave: String = '';
  mensajeNombre: any;
  mensajeApellido: any;
  mensajeEmail: any;
  mensajeNumDoc: any;
  mensajeClave: any;
  mensajeConfClave: any;
  validacionIncorrecta: any = false;
  condiciones: any;
  personaNatural: any;
  document = new Document();
  isOpen = false;

  constructor(private modalService: NgbModal, private personaService: PersonaService, private router: Router) {}

  ngOnInit(): void {
    this.user.password = '';
  }

  onCrearUsuario(): void {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.validacionIncorrecta = false;
    this.mensajeNombre = '';
    this.mensajeApellido = '';
    this.mensajeEmail = '';
    this.mensajeNumDoc = '';
    this.mensajeClave = '';
    this.mensajeConfClave = '';

    if (!this.persona.nombre) {
      this.mensajeNombre = commonMessages.CAMPO_REQUERIDO;
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

    if (this.validacionIncorrecta === false) {
      this.persona;
      this.personaNatural;
      this.user;
      this.tipoDocumento.id = 1;
      this.personaNatural;
      this.persona.tipoUsuario = this.tipoUsuario;
      this.persona.tipoDocumento = this.tipoDocumento;
      this.user.login = this.persona.email;
      this.user.email = this.persona.email;
      this.user.activated = true;
      this.user.createdBy = 'admin';
      this.usuarioVo.persona = this.persona;
      this.usuarioVo.usuario = this.user;
      if (this.persona.id !== undefined) {
        this.personaService.create(this.persona).subscribe(
          () => {
            this.ventanaInicioSesion();
          },
          () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Fallo registro de usuario!'))
        );
      } else {
        this.personaService.crearUsuario(this.usuarioVo).subscribe(() => {
          this.ventanaInicioSesion();
        });
      }
    }
  }

  ventanaInicioSesion(): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Ingresado correctamente!');
    this.router.navigate(['/inicio-sesion']);
  }

  ventanaInicioSesionRegistrado(): void {
    this.router.navigate(['/inicio-sesion']);
  }

  openScrollableContent(longContent: any): void {
    const modalRef: NgbModalRef = this.modalService.open(longContent, { scrollable: true });
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
