// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'jhi-asesoria-juridica',
//   templateUrl: './asesoria-juridica.component.html',
//   styleUrls: ['./asesoria-juridica.component.scss']
// })
// export class AsesoriaJuridicaComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { AccountService } from './../../core/auth/account.service';
import { Router } from '@angular/router';
import { commonMessages } from './../../shared/constants/commonMessages';
import { InformacionEmpresaService } from './../../shared/services/informacion-empresa.service';
import { InformacionEmpresaVo } from './../../shared/vo/informacion-empresa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare let alertify: any;

@Component({
  selector: 'jhi-asesoria-juridica',
  templateUrl: './asesoria-juridica.component.html',
  styleUrls: ['./asesoria-juridica.component.scss']
})
export class AsesoriaJuridicaComponent implements OnInit {
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
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
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
          this.router.navigate(['/perfil']);
        }
      },
      () => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(commonMessages.ENVIO_DATOS_ERROR);
      }
    );
  }
}
