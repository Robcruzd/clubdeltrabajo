/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';
import { IlistarOfertas, IOpcionVo } from 'app/shared/vo/opcion-vo';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { Oferta } from 'app/shared/model/oferta.model';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { ApiService } from 'app/shared/services/api.service';

import Swal from 'sweetalert2';
import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { Empresa } from 'app/shared/model/empresa.model';
import { FacebookService } from 'app/shared/services/facebook.service';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-controlar-ofertas',
  templateUrl: './controlar-ofertas.component.html',
  styleUrls: ['./controlar-ofertas.component.scss']
})
export class ControlarOfertasComponent implements OnInit {
  cmControlarOfertas: any = null;
  listaOFertasCreadas: Array<IlistarOfertas> = [];
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faTimes = faTimes;
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  listaOfertas: Array<Oferta> = [];
  cambiarEstadoO = new Oferta();
  cambiarEstado1 = true;
  listaAspirantes: Array<IAplicacionOferta> = [];
  listaAspirantes1: Array<IAplicacionOferta> = [];
  listaAspirantes2: Array<IAplicacionOferta> = [];
  listaAspirantes3: Array<IAplicacionOferta> = [];
  totalSeleccionado = 0;
  totalTodo = 0;
  totalNinguno = 0;
  showBtnArriba = false;

  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  CrearOfertaLabel = commonMessages.CREAR_OFERTA;
  EditarPerfilLabel = commonMessages.EDITAR_PERFIL;
  ClubEmpresasLabel = commonMessages.CLUB_DE_EMPRESAS;
  ControlaOfertasLabel = commonMessages.CONTROLA_TUS_OFERTAS;
  MembresiaLabel = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  Tus_Ofertas = commonMessages.TUS_OFERTAS;
  Oferta = commonMessages.OFERTA;
  Editar = commonMessages.EDITAR;
  A_oferta = commonMessages.ACTIVAR_OFERTA;
  D_oferta = commonMessages.DETENER_OFERTA;
  Entrar = commonMessages.ENTRAR;
  Volver_Perfil = commonMessages.VOLVER_A_PERFIL;
  Aspirantes = commonMessages.ASPIRANTES;
  Seleccionados = commonMessages.SELECCIONADOS;
  PorVer = commonMessages.POR_VER;

  empresaUpdate!: Empresa | null;
  codigoEmpresa: any;

  constructor(
    private accountService: AccountService,
    private ofertaService: OfertaService,
    private aplicacionOfertaService: AplicacionOfertaService,
    private router: Router,
    private profesionService: ProfesionService,
    private apiService: ApiService,
    private empresaService: EmpresaService,
    private facebookService: FacebookService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionCuenta();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmControlarOfertas'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmControlarOfertas = mensajes;
          this.cmControlarOfertas !== null ? this.updateVariables() : null;
          this.consultarInformacionGeografica();
        },
        err => {
          console.log(err);
          this.cmControlarOfertas = 0;
          this.consultarInformacionGeografica();
        }
      );

    if (window.screen.width <= 900) {
      this.showBtnArriba = false;
    }

    if (window.screen.width >= 900) {
      this.showBtnArriba = true;
    }
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.aspiracionesSalariales = commonData.ARRAY_ASPIRACION_SALARIAL;
    this.CrearOfertaLabel = this.cmControlarOfertas.CREAR_OFERTA;
    this.EditarPerfilLabel = this.cmControlarOfertas.EDITAR_PERFIL;
    this.ClubEmpresasLabel = this.cmControlarOfertas.CLUB_DE_EMPRESAS;
    this.ControlaOfertasLabel = this.cmControlarOfertas.CONTROLA_TUS_OFERTAS;
    this.MembresiaLabel = this.cmControlarOfertas.MEMBRESIA;
    this.AsesoriaJuridicaLabel = this.cmControlarOfertas.ASESORIA_JURIDICA;
    this.Tus_Ofertas = this.cmControlarOfertas.TUS_OFERTAS;
    this.Oferta = this.cmControlarOfertas.OFERTA;
    this.Editar = this.cmControlarOfertas.EDITAR;
    this.A_oferta = this.cmControlarOfertas.ACTIVAR_OFERTA;
    this.D_oferta = this.cmControlarOfertas.DETENER_OFERTA;
    this.Entrar = this.cmControlarOfertas.ENTRAR;
    this.Volver_Perfil = this.cmControlarOfertas.VOLVER_A_PERFIL;
  }

  signInWithFB(oferta: any): void {
    this.facebookService.publicarPost(oferta.id, this.codigoEmpresa).subscribe(
      response => {
        // eslint-disable-next-line no-console
        console.log('response:     ', response);
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
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

  async cargarInformacionCuenta(): Promise<any> {
    const cuenta = await this.obtenerIdUsuario();
    this.codigoEmpresa = cuenta.userEmpresa;
    this.listaOfertas = await this.obtenerOfertasEmpresa(cuenta.userEmpresa);
    for (let i = 0; i < this.listaOfertas.length; i++) {
      await this.getAspirantes(this.listaOfertas[i]);
      const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === this.listaOfertas[i].salario);
      const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.listaOfertas[i].ciudad?.toString());
      this.profesionService.find(this.listaOfertas[i].profesion).subscribe(PROFESIONES => {
        this.listaOFertasCreadas.push({
          id: this.listaOfertas[i].id?.toString(),
          profesion: PROFESIONES.body?.profesion,
          salario: salarioBD?.nombre,
          ciudad: ciudadBD?.nombre,
          activado: this.listaOfertas[i]?.activado,
          totalNinguno: this.totalNinguno,
          totalSeleccionado: this.totalSeleccionado,
          totalTodo: this.totalTodo
        });
        this.totalSeleccionado = 0;
        this.totalNinguno = 0;
        this.totalTodo = 0;
      });
    }
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

  volverCrearOferta(): void {
    this.router.navigate(['perfil-empresa']);
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  verOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }

  clubEmpresas(): void {
    this.empresaService.find(this.codigoEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.membresia === true &&
        this.empresaUpdate?.membresia !== undefined
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }

  juridica(): void {
    this.empresaService.find(this.codigoEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.juridica === true &&
        this.empresaUpdate?.juridica !== undefined
      ) {
        this.router.navigate(['asesoria-juridica']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
    });
  }

  editarOferta(id: any): void {
    this.router.navigate(['/crear-oferta'], { queryParams: { oferta: id } });
  }

  entrarOferta(id: any): void {
    this.router.navigate(['/candidatos-seleccionados'], { queryParams: { oferta: id } });
  }

  eliminarOfertaid(id: any): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar la oferta?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2699FB',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.ofertaService.eliminarOferta(id).subscribe(() => {});
        Swal.fire('¡Listo!', 'Tu oferta fue eliminada').then(result2 => {
          if (result2.value) {
            window.location.reload();
          }
        });
      }
    });
  }

  cambiarEstado(evt: any, oferta: any): void {
    this.cambiarEstadoO = new Oferta();
    this.cambiarEstado1 = evt.target.checked;
    this.ofertaService.find(oferta.id).subscribe(response => {
      if (response.body !== null) {
        this.cambiarEstadoO = response.body;
        this.cambiarEstadoO.activado = this.cambiarEstado1;
        if (this.cambiarEstado1) {
          this.cambiarEstadoO.estado = 'A';
        } else {
          this.cambiarEstadoO.estado = 'D';
        }
        this.ofertaService.update(this.cambiarEstadoO).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  getAspirantes(oferta: any): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.getOfertaFiltro(oferta).subscribe(response => {
        this.listaAspirantes = response;
        if (this.listaAspirantes) {
          this.listaAspirantes.forEach(element => {
            if (element.estado === 'Seleccionado') {
              this.totalSeleccionado++;
            } else if (element.estado === 'Ninguno') {
              this.totalNinguno++;
            }
          });
          this.totalTodo = this.listaAspirantes.length;
        }
        resolve(response);
      });
    });
  }

  obtenerOfertasEmpresa(cuenta: any): Promise<any> {
    return new Promise(resolve => {
      this.ofertaService.getOfertasEmpresa(cuenta).subscribe(
        response => {
          resolve(response);
        },
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Ingresado correctamente'))
      );
    });
  }

  // redes sociales
}
