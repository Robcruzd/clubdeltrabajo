import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { IlistarOfertas, IOpcionVo } from 'app/shared/vo/opcion-vo';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { Oferta } from 'app/shared/model/oferta.model';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { ApiService } from 'app/shared/services/api.service';

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
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  listaOfertas: Array<Oferta> = [];

  constructor(
    private accountService: AccountService,
    private ofertaService: OfertaService,
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
    this.ofertaService.getOfertasEmpresa(cuenta.userEmpresa).subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      this.listaOfertas = response;
      this.listaOfertas.forEach(element => {
        const salarioBD = this.aspiracionesSalariales.find(salario => salario.codigo === element.salario);
        const ciudadBD = this.municipiosPersonal.find(ciudad => ciudad.codigo === element.ciudad?.toString());
        this.profesionService.find(element.profesion).subscribe(PROFESIONES => {
          this.listaOFertasCreadas.push({
            id: element.id?.toString(),
            profesion: PROFESIONES.body?.profesion,
            salario: salarioBD?.nombre,
            ciudad: ciudadBD?.nombre,
            activado: element?.activado
          });
        });
      });
    });
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
    this.router.navigate(['/candidatos-oferta', { oferta: id }]);
  }
}
