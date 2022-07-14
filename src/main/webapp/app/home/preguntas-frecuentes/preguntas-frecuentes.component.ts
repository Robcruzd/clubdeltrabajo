import { AccountService } from './../../core/auth/account.service';
import { Router } from '@angular/router';
import { commonMessages } from './../../shared/constants/commonMessages';
import { InformacionEmpresaService } from './../../shared/services/informacion-empresa.service';
import { InformacionEmpresaVo } from './../../shared/vo/informacion-empresa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'jhi-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class PreguntasFrecuentesComponent implements OnInit {
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
  clicked = false;

  listaPreguntas = [
    {
      id: 1,
      pregunta: '¿Que metodos de pago disponibles tienen?',
      respuesta:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum laborum porro voluptates, sequi aliquam mollitia! Nostrum eius iure sapiente, voluptates soluta adipisci, perferendis voluptatibus eligendi vel saepe harum. Consectetur, doloribus.adipisicing elit.',
      activa: false
    },
    {
      id: 2,
      pregunta: '¿Que metodos de pago disponibles tienen?',
      respuesta:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum laborum porro voluptates, sequi aliquam mollitia! Nostrum eius iure sapiente, voluptates soluta adipisci, perferendis voluptatibus eligendi vel saepe harum. Consectetur, doloribus.adipisicing elit.',
      activa: false
    },
    {
      id: 3,
      pregunta: '¿Que metodos de pago disponibles tienen?',
      respuesta:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum laborum porro voluptates, sequi aliquam mollitia! Nostrum eius iure sapiente, voluptates soluta adipisci, perferendis voluptatibus eligendi vel saepe harum. Consectetur, doloribus.adipisicing elit.',
      activa: false
    }
  ];

  constructor(
    private fb: FormBuilder,
    private informacionEmpresaService: InformacionEmpresaService,
    private router: Router,
    private accountService: AccountService,
    private elem: ElementRef
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

  abrirPregunta(pregunta: any): void {
    this.listaPreguntas.forEach((preg: any) => {
      if (preg.id === pregunta.id) {
        if (preg.activa === true) {
          preg.activa = false;
        } else {
          preg.activa = true;
        }
      } else {
        preg.activa = false;
      }
    });
    // const preguntas = this.elem.nativeElement.querySelectorAll('.preguntas .contenedor-pregunta');
    // preguntas.forEach((pregunta: any) => {
    //   pregunta.addEventListener('click', (e: any) => {
    //     e.currentTarget.classList.toggle('activa');

    //     const respuesta = pregunta.querySelector('.respuesta');
    //     const alturaRealRespuesta = respuesta.scrollHeight;

    //     if(!respuesta.style.maxHeight){
    //       // Si esta vacio el maxHeight entonces ponemos un valor.
    //       respuesta.style.maxHeight = alturaRealRespuesta + 'px';
    //     } else {
    //       respuesta.style.maxHeight = null;
    //     }

    //     // [Opcional] Reiniciamos las demas preguntas
    //     preguntas.forEach((elemento: any) => {
    //       // Solamente queremos ejecutar el codigo para las preguntas que no
    //       // sean la pregunta a la que le dimos click.
    //       if(pregunta !== elemento){
    //         elemento.classList.remove('activa');
    //         elemento.querySelector('.respuesta').style.maxHeight = null;
    //       }
    //     });

    //   });
    // });
  }

  // unsetAllOptions(): void{
  //   const preguntas = this.elem.nativeElement.querySelectorAll('.option_input');
  //   preguntas.forEach((pregunta: any) => {
  //     pregunta.addEventListener('click', (e: any) => {
  //       e.currentTarget.classList.toggle('activa');

  //       const respuesta = pregunta.querySelector('.respuesta');
  //       const alturaRealRespuesta = respuesta.scrollHeight;

  //       if(!respuesta.style.maxHeight){
  //         // Si esta vacio el maxHeight entonces ponemos un valor.
  //         respuesta.style.maxHeight = alturaRealRespuesta + 'px';
  //       } else {
  //         respuesta.style.maxHeight = null;
  //       }

  //       // [Opcional] Reiniciamos las demas preguntas
  //       preguntas.forEach((elemento: any) => {
  //         // Solamente queremos ejecutar el codigo para las preguntas que no
  //         // sean la pregunta a la que le dimos click.
  //         if(pregunta !== elemento){
  //           elemento.classList.remove('activa');
  //           elemento.querySelector('.respuesta').style.maxHeight = null;
  //         }
  //       });

  //     });
  //   });
  //   }

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
