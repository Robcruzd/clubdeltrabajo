import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IEmpresa } from 'app/shared/model/empresa.model';
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

@Component({
  selector: 'jhi-club-empresas',
  templateUrl: './club-empresas.component.html',
  styleUrls: ['./club-empresas.component.scss']
})
export class ClubEmpresasComponent implements OnInit {
  public page = 1;

  mostrar = false;

  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faSearch = faSearch;
  urlImgDefault = '../../../content/images/Image 28.png';
  totalEmpresas = 0;
  Resultados = commonMessages.RESULTADOS;
  valorBusqueda = '';
  account!: Account | any;
  empresaEnSesion!: IEmpresa | any;
  agregarEmpresaForm!: FormGroup;

  ListaEmpresas: Array<IEmpresa> | any = [];
  geografia: Array<GeografiaVo> = [];
  municipiosAcademica: Array<IOpcionVo> = [];

  constructor(
    private _location: Location,
    private router: Router,
    private empresaService: EmpresaService,
    private archivoService: ArchivoService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.agregarEmpresaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      direccion: [''],
      telefono: [''],
      correoElectronico: [''],
      pais: [''],
      ciudad: [''],
      codigoPostal: [''],
      urlProducto: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCuentaUsuario();
    this.getEmpresas();
    this.consultarInformacionGeografica();
  }

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
  }

  volver(): void {
    this.mostrar = false;
  }

  finalizar(): void {
    this.empresaEnSesion.pais = this.agregarEmpresaForm.get(['pais'])!.value;
    this.empresaEnSesion.codigoPostal = this.agregarEmpresaForm.get(['codigoPostal'])!.value;
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

  getEmpresas(): void {
    this.empresaService.query().subscribe(listEmpresa => {
      this.ListaEmpresas = listEmpresa.body;
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    });
    // eslint-disable-next-line no-console
    console.log(this.ListaEmpresas);
  }

  obtenerImagen(element: any): void {
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, element.id!).subscribe(
      response => {
        // eslint-disable-next-line no-console
        console.log('response:     ', element);
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
      this.empresaService.getByRazon(valor).subscribe(empresaResponse => {
        resolve(empresaResponse);
      });
    });
  }

  async cargarEmpresas(): Promise<any> {
    if (this.valorBusqueda === '') {
      this.ListaEmpresas = [];
      this.getEmpresas();
    } else {
      this.ListaEmpresas = [];

      this.ListaEmpresas = await this.listarEmpresas(this.valorBusqueda);
      // eslint-disable-next-line no-console
      console.log(this.listarEmpresas);
      this.totalEmpresas = this.ListaEmpresas.length;
      this.ListaEmpresas.forEach((element: any) => {
        this.obtenerImagen(element);
      });
    }
  }

  copiarLink(): void {
    // Crea un campo de texto "oculto"
    const aux = document.createElement('input');

    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute('value', this.agregarEmpresaForm.get(['urlProducto'])!.value);

    // Añade el campo a la página
    document.body.appendChild(aux);

    // Selecciona el contenido del campo
    aux.select();

    // Copia el texto seleccionado
    document.execCommand('copy');

    // Elimina el campo de la página
    document.body.removeChild(aux);
  }
}
