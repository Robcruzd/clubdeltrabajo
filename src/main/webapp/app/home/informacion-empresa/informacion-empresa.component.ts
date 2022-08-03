/* eslint-disable @typescript-eslint/camelcase */
import { AccountService } from './../../core/auth/account.service';
import { Router } from '@angular/router';
import { commonMessages } from './../../shared/constants/commonMessages';
import { InformacionEmpresaService } from './../../shared/services/informacion-empresa.service';
import { InformacionEmpresaVo } from './../../shared/vo/informacion-empresa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.scss']
})
export class InformacionEmpresaComponent implements OnInit {
  cmInformacionEmpresa: any = null;
  formulario!: FormGroup;
  informacionEmpresaVo!: InformacionEmpresaVo | null;

  Hablemos = commonMessages.HABLEMOS;
  Nombre = commonMessages.NOMBRE_LABEL;
  Danger_Campo_Obligatorio = commonMessages.DANGER_CAMPO_OBLIGATORIO;
  Apellidos = commonMessages.APELLIDOS;
  Email = commonMessages.CORREO_ELECTRONICO_LABEL;
  Danger_Correo = commonMessages.DANGER_CORREO;
  Tel = commonMessages.TELEFONO;
  Mensaje = commonMessages.MENSAJE;
  Enviar = commonMessages.ENVIAR;
  Telefonos = commonMessages.TELEFONOS;
  Correo_Info = commonMessages.CORREO_INFO;
  Tel_Club = commonMessages.TEL_CLUB;

  constructor(
    private fb: FormBuilder,
    private informacionEmpresaService: InformacionEmpresaService,
    private router: Router,
    private accountService: AccountService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmInformacionEmpresa'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmInformacionEmpresa = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmInformacionEmpresa = 0;
        }
      );
  }

  updateVariables(): void {
    this.Hablemos = this.cmInformacionEmpresa.HABLEMOS;
    this.Nombre = this.cmInformacionEmpresa.NOMBRE_LABEL;
    this.Danger_Campo_Obligatorio = this.cmInformacionEmpresa.DANGER_CAMPO_OBLIGATORIO;
    this.Apellidos = this.cmInformacionEmpresa.APELLIDOS;
    this.Email = this.cmInformacionEmpresa.CORREO_ELECTRONICO_LABEL;
    this.Danger_Correo = this.cmInformacionEmpresa.DANGER_CORREO;
    this.Tel = this.cmInformacionEmpresa.TELEFONO;
    this.Mensaje = this.cmInformacionEmpresa.MENSAJE;
    this.Enviar = this.cmInformacionEmpresa.ENVIAR;
    this.Telefonos = this.cmInformacionEmpresa.TELEFONOS;
    this.Correo_Info = this.cmInformacionEmpresa.CORREO_INFO;
    this.Tel_Club = this.cmInformacionEmpresa.TEL_CLUB;
  }

  crearFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.informacionEmpresaVo = new InformacionEmpresaVo();
    this.informacionEmpresaVo.nombre = this.formulario.get(['nombre'])!.value;
    this.informacionEmpresaVo.apellidos = this.formulario.get(['apellidos'])!.value;
    this.informacionEmpresaVo.email = this.formulario.get(['email'])!.value;
    this.informacionEmpresaVo.telefono = this.formulario.get(['telefono'])!.value;
    this.informacionEmpresaVo.mensaje = this.formulario.get(['mensaje'])!.value;
    this.informacionEmpresaService.send(this.informacionEmpresaVo).subscribe(
      response => {
        if (response.body !== null) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(commonMessages.ENVIO_DATOS_CORRECTO);
          this.informacionEmpresaVo = response.body;
          this.router.navigate(['/']);
        }
      },
      () => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(commonMessages.ENVIO_DATOS_ERROR);
      }
    );
  }
}
