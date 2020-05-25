import { Component, OnInit } from '@angular/core';
import { Persona } from 'app/shared/model/persona.model';
import { Usuario } from 'app/shared/model/usuario.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  persona = new Persona();
  usuario = new Usuario();
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

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.usuario.clave = '';
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
    if (!this.usuario.clave) {
      this.mensajeClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }
    if (!this.ConfirmarClave && !this.usuario.clave) {
      this.mensajeConfClave = commonMessages.CAMPO_REQUERIDO;
      this.validacionIncorrecta = true;
    }

    if (this.usuario.clave !== this.ConfirmarClave) {
      this.mensajeConfClave = commonMessages.CONTRASENA_NO_COINCIDEN;
      this.validacionIncorrecta = true;
    }

    if (this.validacionIncorrecta === false) {
      this.persona;
      this.personaNatural;
      this.usuario;
    }
  }

  openScrollableContent(longContent: any): void {
    const modalRef: NgbModalRef = this.modalService.open(longContent, { scrollable: true });
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
