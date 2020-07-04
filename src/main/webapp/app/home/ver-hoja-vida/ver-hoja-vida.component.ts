import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { LOCATION_BASE64, LOGO_BASE64, USER_DEFAULT } from 'app/shared/constants/constantes.constants';
import { Archivo } from 'app/shared/model/archivo.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { HojaVidaVo } from 'app/shared/vo/hoja-vida-vo';
import { IOpcionVo } from 'app/shared/vo/opcion-vo';
import { AccountService } from '../../core/auth/account.service';
import { INBOX_BASE64, PHONE_BASE64 } from '../../shared/constants/constantes.constants';
import { ApiService } from '../../shared/services/api.service';
import { HojaVidaService } from '../../shared/services/hoja-vida.service';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';

import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'jhi-ver-hoja-vida',
  templateUrl: './ver-hoja-vida.component.html',
  styleUrls: ['./ver-hoja-vida.component.scss']
})
export class VerHojaVidaComponent implements OnInit {
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
  urlImageDefault = '';
  imagen!: Archivo;
  pdfHojaVida64: any;
  pdfHojaVida64Render: any;
  pdfHojaVida64RenderDescarga: any;
  pdfGeneradoHojaVida: Archivo = new Archivo();
  cargado = false;
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
        this.hojaVidaVo?.informacionPersonal.genero === 'F'
          ? '../../../content/images/Image 28_F.png'
          : '../../../content/images/Image 28_M.png';
      this.qrCard = 'Perfil de presentación ' + this.account?.firstName + ' ' + this.account?.lastName;
      this.archivos = this.hojaVidaVo?.archivos;
      this.imagen = this.archivos?.find(item => item.tipo === TipoArchivo.IMAGEN_PERFIL) || new Archivo();
      this.visualizarArchivoPDF();
    });
  }

  descargarArchivoComprimido(): void {
    const zip = new JSZip();
    if (this.archivos?.length !== 0) {
      this.archivos?.forEach(item => {
        const nombreArchivo: any = item.nombre;
        const archivo: any = item.archivo;
        const i = archivo.indexOf('base64,');
        const archivo64 = archivo.slice(i + 7);
        zip.file(nombreArchivo, archivo64, { base64: true });
      });
    }
    zip.file('CV' + this.hojaVidaVo?.persona.nombre + this.hojaVidaVo?.persona.apellido + '.pdf', this.pdfHojaVida64RenderDescarga, {
      base64: true
    });
    zip.generateAsync({ type: 'blob' }).then((data: any) => {
      saveAs(data, this.hojaVidaVo?.persona.nombre + '' + this.hojaVidaVo?.persona.apellido + '.zip');
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
      const pdfGenerado64 = this.apiService.pdfMake.createPdf(this.getContent());
      pdfGenerado64.getBase64((data: any) => {
        this.pdfHojaVida64 = data;
        resolve(data);
      });
    });
  }

  private getContent(): Object {
    this.cargarDatos();
    const html = this.apiService.htmlToPdfmake(`
      <div>
      <table border="0">
        <tr>
          <td style="text-align:center; max-width: 150px; max-height: 150px;">
            <img src="${this.imagen?.archivo || USER_DEFAULT}">
          </td>
          <td>Cell</td>
          <td style="border:1px solid red; border-radius: 10px;">Cell with red borders</td>
        </tr>
      </table>


  <div style="width: 100px; height: 100px; 
border: solid 1px #ccc; display: inline-block;">
 <p>This is the first div element.</p>
 </div>

<div style="width: 100px; height: 100px; 
border: solid 1px #ccc; display: inline-block;">
<p>This is second div element.</p>
</div>
    <div style="max-width: 150px; max-height: 150px; display: inline-block;">
    </div>
    <div style="width: 200px; font-weight: bold; font-size: 30px; display: inline-block;">
      <p style="text-align: center;">${this.hojaVidaVo?.persona.nombre}</p>
      <p style="text-align: center;">${this.hojaVidaVo?.persona.apellido}</p> 
    </div>
    <div style="height: 150px; width: 100%; border-radius:10px; border: 1px black solid; display: inline-block;">
      <div style="background-color:#1A2050; border-radius:10px;">
        Blah
      </div>
    </div>
  </div>
  `);

    return {
      content: [html],
      styles: {}
    };

    /* {
      content: [
        {
          table: {
            widths: ['20%', '40%', 'auto'],
            body: [
              [
                {
                  image: this.imagen?.archivo || USER_DEFAULT,
                  width: 100,
                  height: 90
                },
                {
                  type: 'none',
                  ul: [
                    {
                      text: this.hojaVidaVo?.persona.nombre,
                      style: 'headernames'
                    },
                    {
                      text: this.hojaVidaVo?.persona.apellido,
                      style: 'headernames'
                    }
                  ]
                },
                {
                  fillColor: '#1A2050',
                  table: {
                    body: [
                      [
                        {
                          image: LOCATION_BASE64,
                          alignment: 'center',
                          fit: [20, 20],
                          margin: [0, 2]
                        },
                        {
                          text: this.hojaVidaVo?.informacionPersonal.direccionResidencia,
                          style: 'headerInfo'
                        }
                      ],
                      [
                        {
                          image: INBOX_BASE64,
                          alignment: 'center',
                          fit: [20, 20],
                          margin: [0, 2]
                        },
                        {
                          text: this.hojaVidaVo?.persona.email,
                          style: 'headerInfo',
                          margin: [0, 0, 12, 0]
                        }
                      ],
                      [
                        {
                          image: PHONE_BASE64,
                          alignment: 'center',
                          fit: [20, 20],
                          margin: [0, 2]
                        },
                        {
                          text: this.hojaVidaVo?.informacionPersonal.telefono,
                          style: 'headerInfo'
                        }
                      ]
                    ]
                  },
                  layout: 'noBorders'
                }
              ]
            ]
          },
          layout: 'noBorders'
        },
        this.cargarInformacionDinamica()
      ],
      footer: {
        columns: [
          '',
          {
            image: LOGO_BASE64,
            width: 150,
            height: 150,
            alignment: 'right',
            fit: [150, 150],
            pageBreak: 'after',
            margin: [0, -10, 10, 0]
          }
        ]
      },
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          alignment: 'justify',
          margin: [0, 10, 0, 0]
        },
        headerInfo: {
          fontSize: 15,
          bold: true,
          alignment: 'justify',
          margin: [0, 2, 0, 0]
        },
        headernames: {
          fontSize: 30,
          bold: true,
          alignment: 'center'
        },
        title: {
          fontSize: 15,
          bold: true,
          alignment: 'justify',
          margin: [0, 10, 0, 0]
        }
      },
      defaultStyle: {
        columnGap: 20,
        alignment: 'justify'
      }
    }; */
  }

  cargarDatos(): void {
    // cargar informacion academica

    this.hojaVidaVo?.informacionAcademica.forEach(item => {
      this.informacionAcademica.push([
        {
          stack: [
            {
              text: `${item.tituloOtorgado}`,
              style: 'title'
            },
            {
              text: `${item.institucion?.institucion}`
            },
            {
              text: `${item.fechaFin}`
            }
          ]
        }
      ]);
    });

    // Cargar informacion laboral
    this.hojaVidaVo?.experienciaLaboral.forEach(item => {
      this.informacionLaboral.push([
        {
          stack: [
            {
              text: item.nombreEmpresa,
              style: 'title'
            },
            {
              text: 'Puesto/cargo'
            },

            {
              text: item.cargo?.cargo
            },
            {
              text: `${item.fechaInicio} / ${item.fechaFin}`
            },
            {
              text: item.ciudad ? this.getCiudad(item.ciudad + '') : item.ciudadExtranjera
            }
          ]
        }
      ]);
    });

    // Cargar idiomas
    this.hojaVidaVo?.idiomas.forEach(item => {
      this.idiomas.push([
        {
          text: item.idIdioma?.idioma
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: this.getPorcentaje(item.nivel || 'BA'),
              h: 10,
              r: 6,
              color: '#1A2050'
            }
          ]
        }
      ]);
    });
  }

  private getPorcentaje(codigo: string): number {
    let porcentaje = 0;
    switch (codigo) {
      case 'CO':
        porcentaje = 50; // Nivel Conversacional
        break;
      case 'A':
        porcentaje = 75; // Nivel Avanzado
        break;
      case 'LN':
        porcentaje = 100; // Lengua Nativa
        break;
      default:
        porcentaje = 25; // Nivel Basico
    }
    return porcentaje;
  }

  private cargarInformacionDinamica(): Object {
    return {
      layout: 'noBorders',
      table: {
        widths: ['43%', '4%', '43%'],
        body: [
          [{ text: 'PERFIL LABORAL', style: 'header' }, '', { text: 'EXPERIENCIA LABORAL', style: 'header' }],
          [
            [
              this.hojaVidaVo?.informacionPersonal.perfilProfesional,
              {
                layout: 'noBorders',
                table: {
                  widths: ['*'],
                  body: [[{ text: 'FORMACIÓN ACADÉMICA', style: 'header' }], ...this.informacionAcademica]
                }
              },
              {
                layout: 'noBorders',
                table: {
                  widths: ['*', '*'],
                  body: [
                    [
                      { text: 'IDIOMAS', style: 'header' },
                      { text: '', style: 'header' } // columna para grafica
                    ],
                    ...this.idiomas
                  ]
                }
              }
            ],
            {
              canvas: [
                {
                  type: 'ellipse',
                  x: 10,
                  y: 280,
                  r1: 1,
                  r2: 280,
                  // lineWidth: 2,
                  color: '#1A2050'
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 10,
                  color: '#1A2050',
                  r1: 10,
                  r2: 10
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 200,
                  color: '#1A2050',
                  r1: 10,
                  r2: 10
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 405,
                  color: '#1A2050',
                  r1: 10,
                  r2: 10
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 560,
                  color: '#1A2050',
                  r1: 10,
                  r2: 10
                }
              ]
            },
            [
              {
                layout: 'noBorders',
                table: {
                  widths: ['*'],
                  body: [[''], ...this.informacionLaboral]
                }
              }
            ]
          ]
        ]
      }
    };
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

  private getCiudad(codigo: string): string {
    const ciudad = this.municipios.find(item => item.codigo === codigo);

    return ciudad?.nombre || '';
  }
}
