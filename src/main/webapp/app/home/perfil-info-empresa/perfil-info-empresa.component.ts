/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Archivo, IArchivo } from 'app/shared/model/archivo.model';
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
import { ApiService } from 'app/shared/services/api.service';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { IRegiones } from 'app/shared/model/regiones.model';
import { HttpResponse } from '@angular/common/http';

declare let alertify: any;

@Component({
  selector: 'jhi-perfil-info-empresa',
  templateUrl: './perfil-info-empresa.component.html',
  styleUrls: ['./perfil-info-empresa.component.scss']
})
export class PerfilInfoEmpresaComponent implements OnInit {
  center = { lat: 4.648, lng: -74.099 };
  zoom = 12;
  display?: google.maps.LatLngLiteral;

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
  imagenes_Productos: Array<IArchivo> = [];
  urls_Images: any = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  markerPosition = {};
  markerOptions: google.maps.MarkerOptions = { draggable: false };

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
    private commonMessagesService: CommonMessagesService,
    private regionService: RegionesService,
    private apiService: ApiService
  ) {
    const empresa = this.route.snapshot.queryParamMap.get('empresa')!;
    // this.empresaEnSesion = empresa;
    this.cargarCuentaEmpresa(parseInt(empresa, 10));
  }

  ngOnInit(): void {
    // const param = this.route.snapshot.queryParamMap.get('general')!;
    // if (param) {
    //   this.cargarCuentaEmpresa(parseInt(param, 10));
    //   this.showButton = false;
    // } else {
    //   this.cargarCuentaUsuario();
    // }
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

  cargarImagenesCatalogo(): void {
    console.log('cargar imagenes: ');
    this.archivoService.getArchivoByTipoAndEmpresa(TipoArchivo.IMAGENES_PRODUCTOS, this.empresaEnSesion).subscribe(response => {
      console.log('respo: ', response);
      if (response !== null && response !== undefined) {
        if (response.length !== 0) {
          this.imagenes_Productos = response;
          this.imagenes_Productos.forEach(archivo => {
            const url = { url: this.archivoService.getImageS3(archivo.archivo!.toString(), archivo.nombre!) };
            console.log('urltopush: ', url);
            this.urls_Images.push(url);
          });
          console.log('imagenes: ', this.urls_Images);
          // this.cargadoNit = true;
        }
      }
    });
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

  // cargarCuentaUsuario(): void {
  //   this.accountService.getAuthenticationState().subscribe(account => {
  //     this.account = account;
  //     this.empresaService.find(this.account.userEmpresa).subscribe(response => {
  //       this.empresaEnSesion = response.body;
  //       this.consultarImagen();
  //     });
  //   });
  // }

  cargarCuentaEmpresa(id: number): void {
    this.empresaService.find(id).subscribe(response => {
      this.empresaEnSesion = response.body;
      console.log('empresa: ', this.empresaEnSesion);
      this.consultarImagen();
      this.cargarImagenesCatalogo();
      this.traerCiudad();
    });
  }

  getCoordenadas(): void {
    const ciudadBD = this.municipiosPersonal.find((ciudad: { codigo: any }) => ciudad.codigo === this.empresaEnSesion.ciudad?.toString());
    this.apiService.geocodeGoogle(this.empresaEnSesion.direccion, ciudadBD?.nombre!, this.empresaEnSesion.pais).subscribe(res => {
      console.log('rescoords: ', res);
      if (res.results.length > 0) {
        const coords = res.results[0].geometry.location;
        this.markerPosition = coords;
        this.center = coords;
        console.log('coords: ', coords.results[0].geometry.location);
      }
    });
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
    this.getCoordenadas();
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
