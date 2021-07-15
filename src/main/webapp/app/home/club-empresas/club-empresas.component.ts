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

  ListaEmpresas: Array<IEmpresa> | any = [];

  constructor(
    private _location: Location,
    private router: Router,
    private empresaService: EmpresaService,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.getEmpresas();
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
}
