import { Component, OnInit, ViewChild } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';
import { Group, pdf } from '@progress/kendo-drawing';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { AccountService } from '../../core/auth/account.service';
import { ApiService } from '../../shared/services/api.service';
import { HojaVidaService } from '../../shared/services/hoja-vida.service';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { HojaVidaVo } from 'app/shared/vo/hoja-vida-vo';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { commonMessages } from 'app/shared/constants/commonMessages';

const { exportPDF } = pdf;

@Component({
  selector: 'jhi-visualizar-hoja-vida',
  templateUrl: './visualizar-hoja-vida.component.html',
  styleUrls: ['./visualizar-hoja-vida.component.scss']
})
export class VisualizarHojaVidaComponent implements OnInit {
  @ViewChild('pdf') pdfExport: any;

  imagen!: Archivo;
  urlImageDefault = '';
  lblDescargar = commonMessages.DESCARGAR_HOJAVIDA_LABEL;

  hojaVidaVo!: HojaVidaVo | null;
  account!: Account | null;
  persona!: number;
  archivos!: Array<Archivo> | undefined;
  archivo!: File;
  informacionAcademica: any[] = [];
  idiomas: any[] = [];
  informacionLaboral: any[] = [];
  geografia: Array<GeografiaVo> = [];
  municipios: Array<IOpcionVo> = [];
  pdfHojaVida64: any;
  pdfHojaVida64Render: any;
  pdfHojaVida64RenderDescarga: any;
  pdfGeneradoHojaVida: Archivo = new Archivo();
  cargado = false;
  showElement = true;
  qrCard: any;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private hojaVidaService: HojaVidaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }
    this.cargarCuentaUsuario();
    this.consultarInformacionGeografica();
  }

  regresarPerfil(): void {
    this.router.navigate(['perfil']);
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.persona = this.account?.user || 0;
      this.getHojaVida();
    });
  }

  getHojaVida(): void {
    this.hojaVidaService.find(this.persona).subscribe(response => {
      this.hojaVidaVo = response.body;
      this.urlImageDefault =
        this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
          ? '../../../content/images/Image 28_F.png'
          : '../../../content/images/Image 28_M.png';
      this.qrCard = 'Perfil de presentación ' + this.account?.firstName + ' ' + this.account?.lastName;
      this.archivos = this.hojaVidaVo?.archivos;
      this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
      this.visualizarArchivoPDF();
    });
  }

  descargarPDF(): void {
    saveAs(this.pdfHojaVida64RenderDescarga, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
  }

  base64ToUint8Array(base64: any): any {
    const raw = atob(base64);
    const uint8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
  }

  async visualizarArchivoPDF(): Promise<any> {
    const data64 = await this.generarPdf();
    this.showElement = false;
    this.pdfGeneradoHojaVida.nombre = 'CV' + this.hojaVidaVo?.persona.nombre + this.hojaVidaVo?.persona.apellido + '.pdf';
    this.pdfGeneradoHojaVida.extension = 'pdf';
    this.pdfGeneradoHojaVida.usuario = this.hojaVidaVo?.persona;
    this.pdfGeneradoHojaVida.tipo = 100;
    this.pdfGeneradoHojaVida.archivo = 'data:application/pdf;base64,' + data64;
    this.hojaVidaService.createPDFHojaVida(this.pdfGeneradoHojaVida).subscribe((response: any) => {
      const archivo = response.body;
      const i = archivo.archivo.indexOf('base64,');
      const archivo64 = archivo.archivo.slice(i + 7);
      this.pdfHojaVida64RenderDescarga = archivo.archivo;
      this.pdfHojaVida64Render = this.base64ToUint8Array(archivo64);
      this.cargado = true;
    });
  }

  async generarPdf(): Promise<any> {
    return new Promise(resolve => {
      this.pdfExport
        .export()
        .then((group: Group) => exportPDF(group))
        .then((dataUri: any) => {
          const base64 = dataUri.replace('data:application/pdf;base64,', '');
          this.pdfHojaVida64 = base64;
          resolve(this.pdfHojaVida64);
        });
    });
  }

  consultarInformacionGeografica(): void {
    this.apiService.getInformacionGeografica().subscribe(geografia => {
      this.geografia = geografia;
      this.cargarMunicipios();
    });
  }

  private cargarMunicipios(): void {
    this.municipios = this.geografia.map(item => {
      return {
        codigo: item.codigoMpio,
        nombre: item.nombreMpio
      };
    });
  }

  public getCiudad(codigo: string): string {
    const ciudad = this.municipios.find(item => item.codigo === codigo);

    return ciudad?.nombre || '';
  }
}

// ---------------------------
// import { Component } from '@angular/core';
// import { InvoiceRow } from './invoice-row';
// import { invoiceData } from './invoice-data';
// import { Path, Text, Group, pdf } from '@progress/kendo-drawing';
// import { saveAs } from '@progress/kendo-file-saver';

// const { exportPDF } = pdf;

// @Component({
//   selector: 'my-app',
//   template: `
//     <div class="example-config">
//       <button kendo-button (click)="export(pdf)">
//         Save As PDF...
//       </button>
//     </div>

//     <kendo-pdf-export #pdf paperSize="A4" margin="2cm">
//       <my-invoice [data]="data"></my-invoice>
//     </kendo-pdf-export>
//   `,
//   styles: [`
//     kendo-pdf-export {
//       font-family: "DejaVu Sans", "Arial", sans-serif;
//       font-size: 12px;
//     }
//   `]
// })
// export class AppComponent {
//   public data: InvoiceRow[] = invoiceData;
//   prueba(test : any) : void {

//   }
//   export(pdfComponent: any) {
//     let processedUri: any
//     let baseprocess = pdfComponent.export().then((group: Group) => exportPDF(group)).then((dataUri) => {
//       console.log("base 64");
//       console.log(dataUri);
//       const base64 = dataUri.replace('data:application/pdf;base64,', '');
//       processedUri = dataUri
//       console.log("base 64");
//       console.log(base64);
//     });
//   }
// }
// https://stackblitz.com/edit/angular-to-pdf-vfdx7m?file=app%2Fapp.component.ts