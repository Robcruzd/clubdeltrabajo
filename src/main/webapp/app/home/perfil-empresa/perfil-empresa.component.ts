import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { Empresa, IEmpresa } from 'app/shared/model/empresa.model';
import { AccountService } from 'app/core/auth/account.service';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Account } from 'app/core/user/account.model';

declare let alertify: any;

@Component({
  selector: 'jhi-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {
  imagen!: Archivo;
  urlImgDefault = '../../../content/images/Image 28_M.png';
  faStar = faStar;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  empresaEnSesion!: IEmpresa | any;
  account!: Account | any;
  tipoArchivo = TipoArchivo;
  showButton = true;

  Crear_Oferta = commonMessages.CREAR_OFERTA;
  Requisitos_Oferta = commonMessages.DETALLES_REQUISITOS_OFERTA;
  Controla_Ofertas = commonMessages.CONTROLA_TUS_OFERTAS;
  Controla_Todas_Ofertas = commonMessages.CONTROLA_TODAS_OFERTAS;
  Editar_Perfil = commonMessages.EDITAR_PERFIL;
  Correo_Electronico = commonMessages.CORREO_ELECTRONICO;
  Club_Empresas = commonMessages.CLUB_DE_EMPRESAS;
  empresaUpdate!: Empresa | null;

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private accountService: AccountService,
    private archivoService: ArchivoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('general')!;
    if (param) {
      this.cargarCuentaEmpresa(parseInt(param, 10));
      this.showButton = false;
    } else {
      this.cargarCuentaUsuario();
    }
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.empresaService.find(this.account.userEmpresa).subscribe(response => {
        this.empresaEnSesion = response.body;
        this.consultarImagen();
      });
    });
  }

  cargarCuentaEmpresa(id: number): void {
    this.empresaService.find(id).subscribe(response => {
      this.empresaEnSesion = response.body;
      this.consultarImagen();
    });
  }

  consultarImagen(): void {
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, this.empresaEnSesion.id).subscribe(response => {
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
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
    this.empresaService.find(this.account.userEmpresa).subscribe(empresa => {
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
}
