/* eslint-disable @typescript-eslint/camelcase */
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
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

declare let alertify: any;

@Component({
  selector: 'jhi-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {
  cmPerfilEmpresa: any = null;
  imagen!: Archivo;
  urlImgDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';
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
  MembresiaLabel = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  PaginaServicios = commonMessages.PAGINA_SERVICIOS_LABEL;
  PaginaWeb = commonMessages.PAGINA_WEB_LABEL;
  Direccion = commonMessages.DIRECCION_LABEL;
  Telefono = commonMessages.TELEFONO;
  Descripcion = commonMessages.DESCRIPCION_LABEL;
  Facebook = commonMessages.FACEBOOK;
  Instagram = commonMessages.INSTAGRAM;
  LinkedIn = commonMessages.LINKEDIN;

  empresaUpdate!: Empresa | null;

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private accountService: AccountService,
    private archivoService: ArchivoService,
    private route: ActivatedRoute,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('general')!;
    if (param) {
      this.cargarCuentaEmpresa(parseInt(param, 10));
      this.showButton = false;
    } else {
      this.cargarCuentaUsuario();
    }
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmPerfilEmpresa'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmPerfilEmpresa = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmPerfilEmpresa = 0;
        }
      );
  }

  updateVariables(): void {
    this.Crear_Oferta = this.cmPerfilEmpresa.CREAR_OFERTA;
    this.Requisitos_Oferta = this.cmPerfilEmpresa.DETALLES_REQUISITOS_OFERTA;
    this.Controla_Ofertas = this.cmPerfilEmpresa.CONTROLA_TUS_OFERTAS;
    this.Controla_Todas_Ofertas = this.cmPerfilEmpresa.CONTROLA_TODAS_OFERTAS;
    this.Editar_Perfil = this.cmPerfilEmpresa.EDITAR_PERFIL;
    this.Correo_Electronico = this.cmPerfilEmpresa.CORREO_ELECTRONICO;
    this.Club_Empresas = this.cmPerfilEmpresa.CLUB_DE_EMPRESAS;
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
        this.empresaUpdate?.clubEmpresa !== undefined &&
        this.empresaUpdate?.clubEmpresa === true
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }

  juridica(): void {
    this.empresaService.find(this.account.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.juridica === true &&
        this.empresaUpdate?.juridica !== undefined
      ) {
        this.router.navigate(['preguntas-frecuentes']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
    });
  }
}
