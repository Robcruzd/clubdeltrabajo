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

declare let alertify: any;

@Component({
  selector: 'jhi-controlar-ofertas',
  templateUrl: './controlar-ofertas.component.html',
  styleUrls: ['./controlar-ofertas.component.scss']
})
export class ControlarOfertasComponent implements OnInit {
  listaOFertasCreadas: Array<IlistarOfertas> = [];
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faTimes = faTimes;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  listaOfertas: Array<Oferta> = [];
  cambiarEstadoO = new Oferta();
  cambiarEstado1= true;
  listaAspirantes: Array<IAplicacionOferta> = [];
  listaAspirantes1: Array<IAplicacionOferta> = [];
  listaAspirantes2: Array<IAplicacionOferta> = [];
  listaAspirantes3: Array<IAplicacionOferta> = [];
  totalSeleccionado = 0;
  totalTodo = 0;
  totalNinguno = 0;

  constructor(
    private accountService: AccountService,
    private ofertaService: OfertaService,
    private aplicacionOfertaService: AplicacionOfertaService,
    private router: Router,
    private profesionService: ProfesionService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionCuenta();
    this.consultarInformacionGeografica();
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
              totalTodo: this.totalTodo,
        });           
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
    this.router.navigate(['club-empresas']);
  }

  editarOferta(id: any): void {
    this.router.navigate(['/crear-oferta', { oferta: id }]);
  }

  entrarOferta(id: any): void {
    this.router.navigate(['/candidatos-seleccionados', { oferta: id }]);
  }

  eliminarOfertaid(id: any): void{    
    Swal.fire({
      title: '¿Está seguro de que desea eliminar la oferta?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2699FB',
      confirmButtonText:'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then(result => { if (result.value){
      this.ofertaService.eliminarOferta(id).subscribe(()=>{}),
      Swal.fire('¡Listo!', 'Tu oferta fue eliminada')
    }});
  }

  cambiarEstado(evt : any, oferta: any): void {
    this.cambiarEstadoO = new Oferta();
    this.cambiarEstado1 = evt.target.checked;
    this.ofertaService.find(oferta.id).subscribe(response => {
      if (response.body !== null) {
        this.cambiarEstadoO = response.body;
        this.cambiarEstadoO.activado = this.cambiarEstado1;
        if (this.cambiarEstado1) {
          this.cambiarEstadoO.estado = "A";
        }
        else {
          this.cambiarEstadoO.estado = "D";
        }
        this.ofertaService.update(this.cambiarEstadoO).subscribe( () => { });
      }
    });
  };
  
  getAspirantes(oferta : any): Promise<any> {
    return new Promise(resolve => {
      this.aplicacionOfertaService.getOfertaFiltro(oferta).subscribe(response => {
        this.listaAspirantes = response.content;
        if (this.listaAspirantes){
          this.listaAspirantes.forEach(element => {
            if (element.estado === 'Seleccionado'){
              this.totalSeleccionado ++;
            }
            else if (element.estado === 'Ninguno'){
              this.totalNinguno ++;
            }
          });
          this.totalTodo = this.listaAspirantes.length;
          resolve(response);
        }
      })
    });
  }

  obtenerOfertasEmpresa(cuenta : any): Promise<any> {
    return new Promise(resolve => {
      this.ofertaService.getOfertasEmpresa(cuenta).subscribe(
        response => {
          resolve(response);
        },
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Ingresado correctamente'))
      );
    });
  }
}