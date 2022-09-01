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
      pregunta: '¿QUÉ TIPOS DE CONTRATOS LABORALES EXISTEN?',
      respuesta:
        '<b style={font-weight:bold}>1. Contrato de trabajo a término fijo:</b> Se caracteriza por tener una fecha de inicio y de terminación que no puede superar 3 años, es fundamental que sea por escrito. Puede ser prorrogado indefinidamente cuando su vigencia sea superior a un (1) año, o cuando siendo inferior, se haya prorrogado hasta por tres (3) veces.' +
        '\n<strong style={font-weight:bold}>2. Contrato de trabajo a término indefinido:</strong> Este contrato indica la fecha de inicio del trabajador, pero no tiene fecha de finalización determinada, aquí el empleador se compromete a pagar prestaciones sociales, prima de servicio, vacaciones remuneradas e impuestos que correspondan. El contrato se puede finalizar por acuerdo de las partes o por decisión de una sola.' +
        ' DEBES SABER: Si el empleado desea terminar el contrato a término indefinido podrá hacerlo a través de un aviso escrito con una anticipación mínimo de 30 días para que el empleador pueda buscarle un reemplazo, pero sí es el empleador quien lo finaliza sin una causa justa, el trabajador tendrá el derecho a exigir el pago de una indemnización por despido injustificado. Así como también se puede incurrir por parte del empleado en alguna causal que implique un despido con una justa causa.' +
        '\n3. Contrato por obra o labor: En este caso, la persona es contratada para realizar una actividad específica, no se sabe con exactitud la fecha de terminación del contrato y podrá finalizar una vez el trabajador culmine la labor para la cual se contrató.' +
        ' El trabajador cuenta con todas las prestaciones sociales y también puede pasar por un periodo de prueba, que no debe ser mayor a dos meses, la terminación sin justa causa tiene lugar a una indemnización que no puede ser inferior a 15 días de trabajo.' +
        '\n4. Contrato de aprendizaje: Este tipo de contrato se realiza entre el empleador, una institución educativa y un aprendiz. El objetivo de este, es que el aspirante obtenga formación práctica sobre su profesión y no puede ser mayor a dos años. La remuneración es llamada auxilio de sostenimiento y depende completamente de un convenio entre ambas partes, donde el estudiante no tiene prestaciones sociales y el valor de la remuneración depende de si el aprendiz es universitario o no, si es profesional tiene derecho a un salario superior o igual al mínimo y si no lo es, tendrá como base de pago, un salario inferior al mínimo.' +
        '\n5. Contrato temporal, ocasional o accidental: Este tipo de contrato no debe ser superior a un mes y las actividades que se desempeñan no pertenecen a las rutinarias de la empresa, así el contrato tenga una corta duración, el empleado tiene derecho al pago de las prestaciones sociales por parte de su empleador.',
      activa: false
    },
    {
      id: 2,
      pregunta: '¿QUÉ ES LA ESTABILIDAD REFORZADA?',
      respuesta:
        'El estado de embarazo reviste a la trabajadora de la estabilidad laboral reforzada que la protege de cualquier despido que pudiera tener origen en su condición de embarazada o lactante.' +
        ' La protección especial reforzada cubre el periodo de embarazo y las 18 semanas posteriores al parto, y de forma limitada desde las 18 semanas posteriores al parto, hasta los 6 meses posteriores al parto.' +
        ' Esta protección especial está contemplada en los artículos 239 y 240 del código sustantivo del trabajo.' +
        '\n1.	No se puede despedir durante el embarazo ni dentro de las 18 semanas posteriores al parto.' +
        '\n2.	Se requiere autorización para despedir a la trabajadora en caso que esta incurra en una justa causa para ser despedida.' +
        '\n3.	De no observarse lo anterior se ha de pagar una indemnización equivalente a 60 días de salario que es adicional a las indemnizaciones que pudieran causarse por un despido injustificado.' +
        '\n4.	Si como consecuencia del despido la trabajadora no alcanza a disfrutar de la licencia de maternidad o parte de ella, el empleador tendrá que pagarle lo equivalente en dinero.',
      activa: false
    },
    {
      id: 3,
      pregunta: '¿CUÁLES SON LAS PRESTACIONES SOCIALES QUE TIENE DERECHO UN TRABAJADOR?',
      respuesta:
        'La prestación social es una especie de adicional que el trabajador recibe, que no hace parte de su remuneración, y por tanto no constituye salario.' +
        'Las prestaciones sociales están conformadas por los siguientes conceptos:' +
        '\n•	Prima de servicios.' +
        '\n•	Auxilio de cesantías' +
        '\n•	Intereses sobre cesantías.' +
        '\n•	Dotación.' +
        '\nLas vacaciones no son una prestación social sino un descanso remunerado de carácter salarial, por tanto, no se incluye aquí.' +
        'Prima de servicios.' +
        'El artículo 306 del código sustantivo del trabajo dispone que toda empresa debe pagar a cada empleado un salario mensual, del cual, quince días se deben pagar por tardar el último día del mes de junio y los restantes quince días en los primeros 20 días del mes de diciembre.' +
        '\n•	Cesantías.' +
        '\nDe acuerdo al artículo 249 del código sustantivo del trabajo, el trabajador tiene derecho a que se le pague un salario mensual por cada año de trabajo o proporcionalmente a la fracción de año trabajado por concepto de auxilio de cesantías.' +
        'En este caso también se tiene en cuenta el auxilio de transporte como base para el cálculo de las cesantías.' +
        'La liquidación de las cesantías se hará el último día de cada año o al finalizar el contrato, pero se provisiona mensual o quincenalmente a una tarifa del 8.33% sobre el la base de liquidación.' +
        '\n•	Intereses sobre las cesantías.' +
        '\nEl empleador debe pagar a sus empleados intereses sobre las cesantías que tenga acumuladas a 31 de diciembre de cada año, a una tasa del 12% anual, y en proporción con el tiempo que se lleve laborando si este es menor a un año.' +
        'Los intereses se deben pagar a más tardar al 31 de enero, y se pagan directamente al empleado, pues no se deben consignar al fondo de cesantías.' +
        '\n•	Dotación.' +
        '\nTodo empleador debe suministrar al empleado como dotación cada cuatro meses un par de zapatos y un vestido.' +
        'Esta obligación es para con los empleados que devenguen un sueldo de hasta dos salarios mínimos, y tendrán derecho los trabajadores que a la fecha de la entrega de la dotación lleven laborando en la empresa como mínimo 4 meses.' +
        'Las fechas de entrega de la dotación serán el 30 de abril, el 31 de agosto y el 20 de diciembre de cada año.',
      activa: false
    },
    {
      id: 4,
      pregunta: '¿QUÉ DEBO HACER PARA AFILIARME?',
      respuesta:
        '1.	El/la empleador/a es el encargado/a de aﬁliar a sus trabajadores/as a la seguridad social.' +
        '\n2.	Él/ella debe diligenciar los formularios de aﬁliación a pensiones, salud, riesgos laborales y cajas de compensación familiar.' +
        '\n3.	Como trabajador/a debo aportar mis datos tales como cedula de ciudadanía  y documentos de identidad de los beneﬁciarios e informar a que fondo de pensiones y a que EPS me quiero aﬁliar.' +
        '\n4.	El/la empleador/a debe registrarse ante  la EPS, en la ARL y en las cajas de compensación familiar.' +
        '\n5.	Posteriormente deberá diligenciar los datos del trabajador/a en los formularios correspondientes y radicarlos.+',
      activa: false
    },
    {
      id: 5,
      pregunta: '¿CÓMO SON LOS APORTES AL SISTEMA DE SEGURIDAD SOCIAL?',
      respuesta: '',
      activa: false
    },
    {
      id: 6,
      pregunta: '¿QUÉ ES SALARIO?',
      respuesta:
        'El salario es el pago que recibe un trabajador por los servicios que presta a su empleador, por los que fue contratado.' +
        '\nEl salario es el nombre que se le da a la remuneración del trabajo desarrollado por una persona en favor del empresario o empleador que lo contrata.' +
        '\nEn el sentido más estricto, el salario es la denominación que se la da a la remuneración de los trabajadores vinculados mediante contrato de trabajo únicamente, puesto que si se utiliza otra figura contractual se denomina honorarios.' +
        '\nElementos que integran el salario:' +
        '\nA manera de resumen, y con base a lo señalado anteriormente, podemos afirmar que los siguientes pagos o elementos integran o constituyen salario:' +
        '\n5.	Comisiones de cualquier tipo.' +
        '\n6.	Horas extras.' +
        '\n7.	Recargos nocturnos.' +
        '\n8.	Remuneración por trabajo dominical y festivo.' +
        '\n9.	Bonificaciones regulares.' +
        '\n10.	Viáticos permanentes por manutención y alojamiento.',
      activa: false
    },
    {
      id: 7,
      pregunta: '¿Qué clases, tipos o modalidades de salario existen?',
      respuesta:
        'El salario puede tener formas, clases o modalidades según lo que las partes acuerden, como por pasamos a ver.' +
        '\n•	Salario en especie.' +
        '\nLas partes pueden acordar que parte del salario se pague en especie, siempre que ese pago no supere el 30% del salario.' +
        '\nNo es posible pagar la totalidad del salario en especie y la ley impone restricciones para evitar que el trabajador se vea perjudicado.' +
        '\n•	Salario integral.' +
        '\nTodo salario implica una serie de pagos adicionales conocidos como prestacionales, pero las partes pueden acordar que esos pagos se incluyan en el salario.' +
        '\nn el salario integral, como su nombre lo indica, se integra el factor salarial y prestacional en un solo pago.' +
        '\n•	Salario fijo y variable.' +
        '\nEl salario que se pague al trabajador puede ser fijo o variable. En el primar caso todos los meses el trabajador recibe el mismo salario, y en el segundo caso el monto varía dependiendo de lo que se gane el trabajador en función de la forma en que se le paga.' +
        '\nEs el caso del trabajador al que se le paga comisiones por ventas, o se le paga en función de las unidades producidas. En tal caso el salario depende no del tiempo laborado sino el esfuerzo y la productividad del trabajador.' +
        '\n•	Periodo de pago del salario.Las partes pueden acordar el periodo de pago del salario que no puede ser superior a un mes.',
      activa: false
    },
    {
      id: 8,
      pregunta: '¿Cómo se liquidan las incapacidades laborales?',
      respuesta:
        'La incapacidad laboral de origen común tiene su origen en una enfermado o accidente que no tiene relación con la actividad laboral desempeñada por el trabajador.' +
        '\nLas incapacidades laborales se liquidan sobre el salario cotizado, es decir, se toma como referencia el salario sobre que el empleador utilizó para pagar las cotizaciones a seguridad social, o ingreso base de cotización (IBC).' +
        '\nEl porcentaje de liquidación de las incapacidades laborales depende de la duración de la incapacidad.' +
        '\nEn primer lugar, hagamos un recuento de quién debe pagar las incapacidades laborales según su duración:',
      activa: false
    },
    {
      id: 9,
      pregunta: '¿Qué son los permisos de trabajo y cómo se diferencian de las licencias?',
      respuesta:
        'Los permisos de trabajo son las autorizaciones dadas por el empleador a sus empleados para que se puedan ausentar de su lugar de trabajo por un tiempo determinado. Por su parte, las licencias de trabajo son permisos concedidos por el empleador, cuyo efecto es la suspensión provisional del contrato. Existen diferentes tipos de licencias laborales, dependiendo del caso.',
      activa: false
    },
    {
      id: 10,
      pregunta: '¿Qué es una licencia por calamidad doméstica?',
      respuesta:
        'Puedes entender por calamidad doméstica todos aquellos sucesos familiares o personales que afecten el eje interno del trabajador y su normal rendimiento en el área de trabajo.',
      activa: false
    },
    {
      id: 11,
      pregunta: '¿Cuándo se puede solicitar una licencia por calamidad doméstica?',
      respuesta:
        'En tragedias familiares, en las que sea indispensable que el trabajador este presente, como por ejemplo la enfermedad grave de un familiar o la misma muerte, es posible pedir una licencia laboral por calamidad doméstica. Además de esto, también en caso de catástrofes naturales, incendios de vivienda, robos o inundaciones. Esta licencia tiene una duración de cinco días hábiles, que siempre son remunerados.',
      activa: false
    },
    {
      id: 12,
      pregunta: '¿Qué son las licencias sindicales?',
      respuesta:
        'Es un permiso exclusivo para quienes estén inscritos en el sindicato, que busca que su permiso sea remunerado  por el cumplimiento de su gestión, pero dicho proceso no puede conllevar un empobrecimiento del funcionamiento normal de la empresa.',
      activa: false
    },
    {
      id: 13,
      pregunta: '¿Qué es la licencia por entierro de un compañero de trabajo?',
      respuesta:
        'Es un permiso que te otorgan para que en caso de que alguno de tus compañeros llegase a fallecer, puedas acompañarlo en su entierro. Sobre este permiso laboral, es necesario aclarar que se otorga únicamente si tu inasistencia no debilita el funcionamiento de la empresa.',
      activa: false
    },
    {
      id: 14,
      pregunta: '¿Qué es la licencia por luto?',
      respuesta:
        'El Art. 57 establece que la licencia por luto se le concede al trabajador en caso de fallecimiento de su cónyuge, compañero o compañera permanente, o de un familiar hasta el grado segundo de consanguinidad, primero de afinidad y primero civil. Corresponde a una licencia laboral de cinco días hábiles.',
      activa: false
    },
    {
      id: 15,
      pregunta: '¿Cuáles son las licencias no reglamentarias?',
      respuesta:
        'Cuando hablamos de licencias no reglamentarias, hacemos referencia a los permisos que no están establecidos dentro del Código Sustantivo del Trabajo, pero que se encuentran descritas directamente en el reglamento interno de trabajo. Estos permisos pueden ser o no remunerados dependiendo del criterio propio de cada empleador.',
      activa: false
    },
    {
      id: 16,
      pregunta: 'licencias de maternidad y paternidad',
      respuesta:
        'Son permisos especiales que se les reconocen a los padres y madres de familia al momento de dar a luz a su hijo.' +
        '\nEs preciso aclarar que tanto la licencia de trabajo por maternidad como la licencia laboral por paternidad cuentan con permisos diferentes para el efectivo goce del tiempo con su hijo.',
      activa: false
    },
    {
      id: 17,
      pregunta: '¿Qué es el despido?',
      respuesta:
        'El despido es la decisión extintiva del empresario por la cual se finaliza la relación laboral. A grandes rasgos puede ser:' +
        '\n•	Causal o no, dependiendo de si se fundamenta en un motivo (objetivo o subjetivo) o en la mera voluntad del empresario. Cabe señalar que la ley solo reconoce el despido causal, como se señalará más adelante.' +
        '\n•	Procedente, improcedente o nulo, dependiendo de los efectos jurídicos que le otorgue nuestro ordenamiento.',
      activa: false
    },
    {
      id: 18,
      pregunta: '¿Qué características tiene el despido?',
      respuesta:
        'A diferencia de otras formas de extinción de la relación laboral, el despido cuenta con los siguientes caracteres:' +
        '\n1.	Unilateral. Es el empresario quien toma la decisión extintiva, sin concurso del trabajador. Así, lo único que puede hacer el empleado es aceptar o impugnar el despido.' +
        '\n2.	Extintivo. El objetivo del despido es extinguir la relación laboral. Por tanto, y al margen de las otras formas de extinción que tiene esta relación, el despido es un acto extintivo.' +
        '\n3.	Receptivo. El trabajador debe conocer su despido para que el acto tenga efectos.',
      activa: false
    },
    {
      id: 19,
      pregunta: 'Tipos de despido',
      respuesta:
        'En función del origen de la extinción de la relación laboral, el despido puede ser causal o no.' +
        '\nEl despido causal es el que trae motivo de un elemento externo, sea objetivo o subjetivo tal motivo. Cuando el despido no sea causal se considerará improcedente, lo que elevará la cuantía de la indemnización o supondrá la readmisión del trabajador.' +
        '\nPor tanto, salvo en los casos en que el despido esté prohibido (resulte nulo), el empresario podrá despedir a sus trabajadores siempre que asuma las consecuencias.' +
        '\nDentro de los despidos causales podríamos analizar el motivo en el que se fundamenta la decisión extintiva. En concreto existen el despido por causas objetivas y el despido disciplinario.',
      activa: false
    },
    {
      id: 20,
      pregunta: '¿Cómo se procede al despido?',
      respuesta:
        'El despido debe ser comunicado por el trabajador al empresario, incluyendo:' +
        '\n•	Una carta de despido, donde se consignarán las razones del mismo. Esta carta es fundamental, ya que en caso de impugnación judicial el empresario solo podrá esgrimir los motivos consignados en la misma.' +
        '\n•	Un finiquito o documento de liquidación. En él constarán las cantidades adeudadas al trabajador por diferentes conceptos (salario debido, horas extraordinarias, suplidos…). Debe ser firmado por el trabajador en presencia de un representante legal, aunque el empleado puede firmarla como “no conforme”.',
      activa: false
    },
    {
      id: 21,
      pregunta: '¿Qué es la liquidación en un contrato de trabajo?',
      respuesta:
        'La liquidación laboral hace referencia a la liquidación de los conceptos laborales a favor del trabajador cuando termina el contrato de trabajo.' +
        '\nUna vez finaliza la relación laboral, el empleador debe proceder a liquidar salarios, prestaciones y demás conceptos derivados del contrato del trabajo a que tiene derecho el trabajador.' +
        '\nA la finalización de la relación laboral el empleador no debe adeudarle nada al trabajador, pues si no hace la liquidación y pago correspondiente, se expone a la indemnización moratoria.',
      activa: false
    },
    {
      id: 22,
      pregunta: '¿En que casos se liquida un contrato de trabajo?',
      respuesta:
        'La liquidación del contrato de trabajo se debe hacer en los siguientes casos:' +
        '\n1.	Cuando finaliza el termino de duración en contratos de trabajo a término fijo.' +
        '\n2.	Cuando el trabajador renuncia con o sin justa causa.' +
        '\n3.	Cuando el empleador despide al trabajador con o sin justa causa.' +
        '\n4.	Cuando el contrato termina por mutuo acuerdo.' +
        '\nCualquiera sea la causa o razón que lleve a la terminación del contrato de trabajo, da lugar a su liquidación.',
      activa: false
    },
    {
      id: 23,
      pregunta: 'Conceptos que se deben liquidar al terminar el contrato de trabajo',
      respuesta:
        'Al momento de liquidar el contrato de trabajo se deben liquidar los siguientes conceptos:' +
        '\n1.	Salarios adeudados.' +
        '\n2.	Prestaciones sociales.' +
        '\n3.	Vacaciones a compensar.' +
        '\n4.	Aportes parafiscales a que haya lugar.' +
        '\n5.	Aportes a seguridad social.' +
        '\n6.	Indemnizaciones si hubiere lugar a ellas.' +
        '\nDentro de salario se deben liquidar conceptos como horas extras, recargo por trabajo nocturno, dominical y festivo, en caso que existan.',
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
