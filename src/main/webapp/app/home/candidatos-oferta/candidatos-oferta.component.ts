import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Archivo } from 'app/shared/model/archivo.model';
import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { IRegiones } from 'app/shared/model/regiones.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo, IResultadoBusquedaAspirantes, IResultadoOfertas } from 'app/shared/vo/opcion-vo';

@Component({
  selector: 'jhi-candidatos-oferta',
  templateUrl: './candidatos-oferta.component.html',
  styleUrls: ['./candidatos-oferta.component.scss']
})
export class CandidatosOfertaComponent implements OnInit {
  public page = 1;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  imagen!: Archivo;
  ulrImgDefault = '';
  faUserCircle = faUserCircle;
  generoValue: any = null;
  salarioValue: any = null;
  experienciaValue: any = null;
  municipioValue: any = null;
  edadValue: any = null;
  labels = commonMessages;
  listaResultadoBusquedaAspirantes: Array<IResultadoBusquedaAspirantes> = [];
  listaResultadoOfertas: Array<IResultadoOfertas> = [];
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  edades: IOpcionVo[] = commonMessages.ARRAY_EDAD;
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  resultadoBusqueda: Array<IInformacionPersonal> | null = [];
  totalAspirantes = 0;
  idOferta = 0;
  oferta!: IOferta | null;
  mostrar = true;

  constructor(
    private router: Router,
    private informacionPersonalService: InformacionPersonalService,
    private regionService: RegionesService,
    private route: ActivatedRoute,
    private ofertaService: OfertaService
  ) {
    this.traerCiudad();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('oferta')!;
    this.idOferta = parseInt(param, 10);
    this.getOFerta(this.idOferta);
  }

  getOFerta(id: number): void {
    this.listaResultadoOfertas = [];
    this.ofertaService.find(id).subscribe(response => {
      this.oferta = response.body;
      const tipoContratoDB = this.tiposContrato.find(tipo => tipo.codigo === this.oferta?.tipoContrato);
      const experienciaDB = this.experienciasLaborales.find(item => item.codigo === this.oferta?.experiencia?.toString());
      const ciudadDB = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.oferta?.ciudad?.toString());
      const aspiracionDB = this.aspiracionesSalariales.find(item => item.codigo === this.oferta?.salario);
      this.listaResultadoOfertas.push({
        titulo: this.oferta?.titulo,
        descripcion: this.oferta?.descripcion,
        tipoContrato: tipoContratoDB?.nombre,
        publicado: this.oferta?.fechaPublicacion?.format('YYYY-MM-DD'),
        experiencia: experienciaDB?.nombre,
        ciudad: ciudadDB?.nombre,
        salario: aspiracionDB?.nombre
      });
    });
  }

  volverOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  getCandidatosOferta(): void {
    const params = new InformacionPersonal();
    // params.size = 5;
    // params.page = 0;
    params.ciudad = 100;
    // params.telefono = '123458';
    // this.informacionPersonalService.listar(params).subscribe(response=>{

    // })
  }

  cargarAspirantes(): void {
    this.listaResultadoBusquedaAspirantes = [];
    const params = new InformacionPersonal();
    params.genero = this.generoValue;
    params.aspiracionSalarial = this.salarioValue;
    params.ciudad = this.municipioValue;
    this.informacionPersonalService.listar(params).subscribe(response => {
      this.resultadoBusqueda = response.content;
      if (this.resultadoBusqueda) {
        this.resultadoBusqueda.forEach(element => {
          const edadBD = this.obtenerEdad(element);
          const experienciaBD = this.obtenerExperiencia(element);
          const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
          const edadEncontrada = this.validarEdadSeleccionada(edadBD);
          const experienciaEncontrada = this.validarExperienciaSeleccionada(experienciaBD);
          if (edadEncontrada && experienciaEncontrada) {
            this.listaResultadoBusquedaAspirantes.push({
              nombre: element.usuario?.nombre,
              apellido: element.usuario?.apellido,
              profesion: element.profesion?.profesion,
              edad: edadBD,
              ciudad: ciudadBD?.nombre,
              experiencia: experienciaBD,
              titulo: element.profesion?.profesion,
              fechaPostulacion: 'g',
              idPersona: element.usuario?.id,
              idOferta: 1
            });
            this.totalAspirantes = this.listaResultadoBusquedaAspirantes.length;
          }
        });
      }
    });
  }

  validarExperienciaSeleccionada(experiencia: string): boolean {
    let experienciaReturn = false;
    if (this.experienciaValue === null) {
      experienciaReturn = true;
    } else if (this.experienciaValue === '1') {
      if (this.experienciasLaborales[0].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '2') {
      if (this.experienciasLaborales[1].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '3') {
      if (this.experienciasLaborales[2].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '4') {
      if (this.experienciasLaborales[3].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '5') {
      if (this.experienciasLaborales[4].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '6') {
      if (this.experienciasLaborales[5].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '7') {
      if (this.experienciasLaborales[6].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '8') {
      if (this.experienciasLaborales[7].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '9') {
      if (this.experienciasLaborales[8].nombre === experiencia) {
        experienciaReturn = true;
      }
    } else if (this.experienciaValue === '10') {
      if (this.experienciasLaborales[9].nombre === experiencia) {
        experienciaReturn = true;
      }
    }
    return experienciaReturn;
  }

  validarEdadSeleccionada(edad: number): boolean {
    let edadReturn = false;
    if (this.edadValue === null) {
      edadReturn = true;
    } else if (this.edadValue === 1) {
      if (edad >= 14 && edad < 18) {
        edadReturn = true;
      }
    } else if (this.edadValue === 2) {
      if (edad >= 19 && edad <= 25) {
        edadReturn = true;
      }
    } else if (this.edadValue === 3) {
      if (edad >= 26 && edad <= 30) {
        edadReturn = true;
      }
    } else if (this.edadValue === 4) {
      if (edad >= 31 && edad <= 40) {
        edadReturn = true;
      }
    } else if (this.edadValue === 5) {
      if (edad >= 41 && edad <= 60) {
        edadReturn = true;
      }
    } else if (this.edadValue === 6) {
      if (edad > 60) {
        edadReturn = true;
      }
    }
    return edadReturn;
  }

  obtenerEdad(element: any): number {
    const hoy = new Date();
    let edad = 0;
    if (element !== undefined && element.fechaNacimiento !== undefined) {
      const fechaBandera = element.fechaNacimiento?.toString();
      const fechaDate = Date.parse(fechaBandera);
      const cumpleanos = new Date(fechaDate);
      edad = hoy.getFullYear() - cumpleanos.getFullYear();
      const m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
    }
    return edad;
  }

  obtenerExperiencia(element: any): string {
    let resultado = '';
    if (element.anioExperiencia == null && element.mesExperiencia == null) {
      resultado = this.experienciasLaborales[0].nombre;
    }
    if (element.anioExperiencia == null && element.mesExperiencia > 0) {
      resultado = this.experienciasLaborales[1].nombre;
    }
    if (element.anioExperiencia >= 1 && element.anioExperiencia < 2) {
      resultado = this.experienciasLaborales[2].nombre;
    }
    if (element.anioExperiencia >= 2 && element.anioExperiencia < 3) {
      resultado = this.experienciasLaborales[3].nombre;
    }
    if (element.anioExperiencia >= 3 && element.anioExperiencia < 4) {
      resultado = this.experienciasLaborales[4].nombre;
    }
    if (element.anioExperiencia >= 4 && element.anioExperiencia < 5) {
      resultado = this.experienciasLaborales[5].nombre;
    }
    if (element.anioExperiencia >= 5 && element.anioExperiencia < 7) {
      resultado = this.experienciasLaborales[6].nombre;
    }
    if (element.anioExperiencia >= 7 && element.anioExperiencia < 10) {
      resultado = this.experienciasLaborales[7].nombre;
    }
    if (element.anioExperiencia >= 10 && element.anioExperiencia < 15) {
      resultado = this.experienciasLaborales[8].nombre;
    }
    if (element.anioExperiencia >= 15) {
      resultado = this.experienciasLaborales[9].nombre;
    }
    return resultado;
  }

  traerCiudad(): void {
    this.regionService
      .query({
        page: 0,
        size: 1150
      })
      .subscribe((res: HttpResponse<IRegiones[]>) => {
        this.geografia = res.body!.map(
          item =>
            new GeografiaVo(
              item.codigoDaneDelDepartamento?.toString()!,
              item.departamento!,
              item.codigoDaneDelMunicipio?.toString()!,
              item.municipio!
            )
        );
        this.cargarMunicipiosPersonal();
      });
  }

  cargarMunicipiosPersonal(): void {
    this.municipiosPersonal = [];
    this.municipiosPersonal = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
  }

  verAspirante(item: any): void {
    this.router.navigate(['hoja-candidato', { usuario: item.idPersona, oferta: this.idOferta }]);
  }

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }

  clubEmpresas(): void {
    this.router.navigate(['club-empresas']);
  }
}
