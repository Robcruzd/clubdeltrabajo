/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Empresa, IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from 'app/shared/vo/tipo-archivo.enum';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { IRegiones } from 'app/shared/model/regiones.model';
import { HttpResponse } from '@angular/common/http';
import { RegionesService } from 'app/entities/regiones/regiones.service';

declare let alertify: any;

@Component({
  selector: 'jhi-club-empresas',
  templateUrl: './club-empresas.component.html',
  styleUrls: ['./club-empresas.component.scss']
})
export class ClubEmpresasComponent implements OnInit {
  public page = 1;

  cmClubEmpresas: any = null;
  mostrar = false;

  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faSearch = faSearch;
  urlImgDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28.png';
  totalEmpresas = 0;
  valorBusqueda = '';
  account!: Account | any;
  empresaEnSesion!: IEmpresa | any;
  agregarEmpresaForm!: FormGroup;
  empresaUpdate!: Empresa | null;

  ListaEmpresas: Array<IEmpresa> | any = [];
  ListaEmpresasFiltro: Array<IEmpresa> | any = [];
  geografia: Array<GeografiaVo> = [];
  municipiosAcademica: Array<IOpcionVo> = [];

  Resultados = commonMessages.RESULTADOS;
  CrearOfertaLabel = commonMessages.CREAR_OFERTA;
  EditarPerfilLabel = commonMessages.EDITAR_PERFIL;
  ClubEmpresasLabel = commonMessages.CLUB_DE_EMPRESAS;
  ControlaOfertasLabel = commonMessages.CONTROLA_TUS_OFERTAS;
  MembresiaLabel = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  ClubEmpresasTitulo = commonMessages.CLUB_EMPRESAS_TITULO;
  AgregaTuEmpresa = commonMessages.AGREGA_TU_EMPRESA;
  EmpresasTitulo = commonMessages.EMPRESAS_TITULO;
  EmailLabel = commonMessages.EMAIL_LABEL;
  PaginaWeb = commonMessages.PAGINA_WEB_LABEL;
  Direccion = commonMessages.DIRECCION_LABEL;
  Telefono = commonMessages.TELEFONO;
  Descripcion = commonMessages.DESCRIPCION_LABEL;
  PaginaServicios = commonMessages.PAGINA_SERVICIOS_LABEL;
  AgregaEmpresaDirectorio = commonMessages.AGREGA_EMPRESA_DIRECTORIO;
  Nombre = commonMessages.NOMBRE_LABEL;
  Pais = commonMessages.PAIS_LABEL;
  Ciudad = commonMessages.CIUDAD_LABEL;
  Direccion2 = commonMessages.DIRECCION_LABEL2;
  CodigoPostal = commonMessages.CODIGO_POSTAL_LABEL;
  Telefono2 = commonMessages.TELEFONO2;
  Email2 = commonMessages.EMAIL_LABEL2;
  AgregaProductos = commonMessages.AGREGA_PRODUCTOS_LABEL;
  EscribeLink = commonMessages.ESCRIBE_LINK_TEXTO;
  CopiarLink = commonMessages.COPIAR_LINK;
  Volver = commonMessages.VOLVER;
  Finalizar = commonMessages.FINALIZAR;
  Facebook = commonMessages.FACEBOOK;
  Instagram = commonMessages.INSTAGRAM;
  LinkedIn = commonMessages.LINKEDIN;
  labels = commonMessages;
  municipioValue: any = null;
  municipiosPersonal: Array<IOpcionVo> = [];

  constructor(
    private _location: Location,
    private router: Router,
    private empresaService: EmpresaService,
    private archivoService: ArchivoService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private commonMessagesService: CommonMessagesService,
    private regionService: RegionesService
  ) {
    this.agregarEmpresaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      direccion: [''],
      telefono: [''],
      correoElectronico: [''],
      pais: [''],
      ciudad: [''],
      codigoPostal: [''],
      urlProducto: [''],
      urlFacebook: [''],
      urlInstagram: [''],
      urlLinkedIn: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCuentaUsuario();
    this.getEmpresas();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmClubEmpresas'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmClubEmpresas = mensajes;
          this.updateVariables();
          this.getEmpresas();
          this.consultarInformacionGeografica();
        },
        err => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.cmClubEmpresas = 0;
          this.getEmpresas();
          this.consultarInformacionGeografica();
        }
      );
    this.traerCiudad();
  }

  updateVariables(): void {}

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      this.cargarMunicipiosAcademica();
    });
  }

  cargarMunicipiosAcademica(): void {
    this.municipiosAcademica = [];
    this.municipiosAcademica = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.empresaService.find(this.account.userEmpresa).subscribe(response => {
        this.empresaEnSesion = response.body;
      });
    });
  }

  agregarEmpresa(): void {
    this.mostrar = true;
    this.agregarEmpresaForm.get('nombre')?.setValue(this.empresaEnSesion.razonSocial);
    this.agregarEmpresaForm.get('direccion')?.setValue(this.empresaEnSesion.direccion);
    this.agregarEmpresaForm.get('telefono')?.setValue(this.empresaEnSesion.telefonoEmpresa);
    this.agregarEmpresaForm.get('correoElectronico')?.setValue(this.empresaEnSesion.email);
    this.agregarEmpresaForm
      .get('ciudad')
      ?.setValue(this.municipiosAcademica.find(ciudad => ciudad.codigo === this.empresaEnSesion.ciudad.toString())?.nombre);
    this.agregarEmpresaForm.get('pais')?.setValue(this.empresaEnSesion.pais);
    this.agregarEmpresaForm.get('codigoPostal')?.setValue(this.empresaEnSesion.codigoPostal);
    this.agregarEmpresaForm.get('urlProducto')?.setValue(this.empresaEnSesion.link);
    this.agregarEmpresaForm.get('urlFacebook')?.setValue(this.empresaEnSesion.urlFacebook);
    this.agregarEmpresaForm.get('urlInstagram')?.setValue(this.empresaEnSesion.urlInstagram);
    this.agregarEmpresaForm.get('urlLinkedIn')?.setValue(this.empresaEnSesion.urlLinkedIn);
  }

  volver(): void {
    this.mostrar = false;
  }

  finalizar(): void {
    this.empresaEnSesion.pais = this.agregarEmpresaForm.get(['pais'])!.value;
    this.empresaEnSesion.codigoPostal = this.agregarEmpresaForm.get(['codigoPostal'])!.value;
    this.empresaEnSesion.link = this.agregarEmpresaForm.get(['urlProducto'])!.value;
    this.empresaEnSesion.urlFacebook = this.agregarEmpresaForm.get(['urlFacebook'])!.value;
    this.empresaEnSesion.urlInstagram = this.agregarEmpresaForm.get(['urlInstagram'])!.value;
    this.empresaEnSesion.urlLinkedIn = this.agregarEmpresaForm.get(['urlLinkedIn'])!.value;
    this.empresaEnSesion.clubEmpresa = true;
    this.empresaService.update(this.empresaEnSesion).subscribe(() => {});
    this.mostrar = false;
  }

  backClicked(): void {
    this._location.back();
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  verOferta(): void {
    this.router.navigate(['oferta-publicada']);
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

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
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

  getEmpresas(): void {
    this.empresaService.getByClubEmpresa().subscribe(listEmpresa => {
      this.ListaEmpresas = listEmpresa;
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    });
    // eslint-disable-next-line no-console
    // console.log(this.ListaEmpresas);
  }

  obtenerImagen(element: any): void {
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.id!).subscribe(
      response => {
        // eslint-disable-next-line no-console
        // console.log('response:     ', element);
        if (response.body !== null) {
          element['imagen'] = response.body?.archivo;
        }
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
        element['imagen'] = this.urlImgDefault;
      }
    );
  }

  listarEmpresas(valor: string): Promise<any> {
    return new Promise(resolve => {
      this.empresaService.getBySector(valor).subscribe(empresaResponse => {
        resolve(empresaResponse);
      });
    });
  }

  listarEmpresasCiudad(valor: number): Promise<any> {
    return new Promise(resolve => {
      this.empresaService.getByCiudad(valor).subscribe(empresaResponse => {
        resolve(empresaResponse);
      });
    });
  }

  listarEmpresasCiudadAndSector(valor: number, empresas: Array<IEmpresa>): Promise<any> {
    return new Promise(resolve => {
      empresas.forEach(element => {
        if (Number(element.ciudad) === Number(valor)) {
          this.ListaEmpresasFiltro.push(element);
        }
      });
      setTimeout(() => {
        resolve(this.ListaEmpresasFiltro);
      }, 200);
    });
  }

  async cargarEmpresas(): Promise<any> {
    if (this.valorBusqueda === '' && !this.municipioValue) {
      this.ListaEmpresas = [];
      this.getEmpresas();
    } else if (this.valorBusqueda !== '' && this.municipioValue) {
      this.ListaEmpresas = [];
      this.ListaEmpresasFiltro = [];
      this.ListaEmpresas = await this.listarEmpresas(this.valorBusqueda);
      this.ListaEmpresas = await this.listarEmpresasCiudadAndSector(this.municipioValue, this.ListaEmpresas);
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    } else if (this.valorBusqueda !== '') {
      this.ListaEmpresas = [];
      this.ListaEmpresas = await this.listarEmpresas(this.valorBusqueda);
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    } else if (this.municipioValue) {
      this.ListaEmpresas = [];
      this.ListaEmpresas = await this.listarEmpresasCiudad(this.municipioValue);
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    }
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
}
