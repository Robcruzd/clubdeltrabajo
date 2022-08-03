/* eslint-disable @typescript-eslint/camelcase */
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
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { Persona } from 'app/shared/model/persona.model';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

const { exportPDF } = pdf;

@Component({
  selector: 'jhi-visualizar-hoja-vida',
  templateUrl: './visualizar-hoja-vida.component.html',
  styleUrls: ['./visualizar-hoja-vida.component.scss']
})
export class VisualizarHojaVidaComponent implements OnInit {
  @ViewChild('pdf') pdfExport: any;

  cmVisualizarHV: any = null;
  imagen!: Archivo;
  archivoHv!: Archivo;
  urlImageDefault = '';
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
  archivoBase64: any;
  pdfGeneradoHojaVida: Archivo = new Archivo();
  cargado = false;
  showElement = true;
  qrCard: any;
  personaDatos!: Persona | null;

  Loading = commonMessages.LOADING;
  SOBRE_MI = commonMessages.SOBRE_MI;
  CONTACTO = commonMessages.CONTACTO;
  Exp_Profesional = commonMessages.EXPERIENCIA_PROFESIONAL;
  Actualidad = commonMessages.ACTUALIDAD;
  FORMACION = commonMessages.FORMACION;
  lblDescargar = commonMessages.DESCARGAR_HOJAVIDA_LABEL;
  estadoNivelEstudio: IOpcionVo[] = commonMessages.ARRAY_ESTADO_NIVEL_ESTUDIO;
  nivelIdioma: Array<IOpcionVo> = commonMessages.ARRAY_NIVEL_IDIOMA;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private hojaVidaService: HojaVidaService,
    private apiService: ApiService,
    private regionService: RegionesService,
    private personaService: PersonaService,
    private archivoService: ArchivoService,
    private commonMessagesService: CommonMessagesService
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmVisualizarHV'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmVisualizarHV = mensajes;
          this.updateVariables();
          this.consultarInformacionGeografica();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmVisualizarHV = 0;
          this.consultarInformacionGeografica();
        }
      );
  }

  updateVariables(): void {
    const commonData: any = JSON.parse(sessionStorage.getItem('commonData')!);
    this.Loading = this.cmVisualizarHV.LOADING;
    this.SOBRE_MI = this.cmVisualizarHV.SOBRE_MI;
    this.CONTACTO = this.cmVisualizarHV.CONTACTO;
    this.Exp_Profesional = this.cmVisualizarHV.EXPERIENCIA_PROFESIONAL;
    this.Actualidad = this.cmVisualizarHV.ACTUALIDAD;
    this.FORMACION = this.cmVisualizarHV.FORMACION;
    this.lblDescargar = this.cmVisualizarHV.DESCARGAR_HOJAVIDA_LABEL;
    this.estadoNivelEstudio = commonData.ARRAY_ESTADO_NIVEL_ESTUDIO;
    this.nivelIdioma = commonData.ARRAY_NIVEL_IDIOMA;
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
      // // eslint-disable-next-line no-console
      // console.log('profesion: ', this.hojaVidaVo?.informacionPersonal.profesion);
      this.urlImageDefault =
        this.hojaVidaVo?.informacionPersonal && this.hojaVidaVo?.informacionPersonal.genero === 'F'
          ? 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_F.png'
          : 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';
      this.qrCard = 'Perfil de presentación ' + this.account?.firstName + ' ' + this.account?.lastName;
      this.archivos = this.hojaVidaVo?.archivos;
      this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
      this.visualizarArchivoPDF();
      console.log(this.hojaVidaVo?.idiomas);
    });
  }

  descargarPDF(): void {
    this.archivoService.get(this.persona, TipoArchivo.ARCHIVO_HV).subscribe(response => {
      if (response === null || response === undefined) {
        saveAs(this.pdfHojaVida64RenderDescarga, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
      } else {
        this.archivoBase64 = response.body?.archivo;
        saveAs(this.archivoBase64, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.pdf');
      }
    });
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
      this.generarHvComoArchivo(archivo.archivo, data64, this.pdfGeneradoHojaVida.nombre);
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

  generarHvComoArchivo(archivo: any, data: any, nombre: any): void {
    this.personaService.find(this.persona).subscribe(response => {
      this.personaDatos = response.body;
      if (this.personaDatos?.estadohv === true) {
        if (this.personaDatos !== null) {
          this.personaDatos.estadohv = false;
          this.personaService.update(this.personaDatos).subscribe(() => {
            this.cargarArchivoHv(archivo, this.personaDatos, nombre);
          });
        }
      }
    });
  }

  cargarArchivoHv(archivo: any, persona: any, nombre: any): void {
    this.archivoHv = this.archivoHv || new Archivo();
    this.archivoHv.tipo = TipoArchivo.ARCHIVO_HV;
    this.archivoHv.nombre = nombre;
    this.archivoHv.extension = 'pdf';
    this.archivoHv.usuario = persona;
    this.archivoHv.archivo = archivo;
    if (this.archivoHv.id !== undefined) {
      this.archivoService.update(this.archivoHv).subscribe(() => {});
    } else {
      this.archivoService.create(this.archivoHv).subscribe(() => {});
    }
  }

  subirArchivoHv(): void {}

  consultarInformacionGeografica(): void {
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
        this.cargarMunicipios();
        this.cargarCuentaUsuario();
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

  public getEstado(codigo: number): string {
    const estado = this.estadoNivelEstudio.find(item => item.codigo === codigo);

    return estado?.nombre || '';
  }

  public getIdioma(codigo: string): string {
    const nivelIdioma = this.nivelIdioma.find(item => item.codigo === codigo);

    return nivelIdioma?.nombre || '';
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
//       const base64 = dataUri.replace('data:application/pdf;base64,', '');
//       processedUri = dataUri
//     });
//   }
// }
// https://stackblitz.com/edit/angular-to-pdf-vfdx7m?file=app%2Fapp.component.ts
