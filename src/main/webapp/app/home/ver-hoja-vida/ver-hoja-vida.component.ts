import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { LOCATION_BASE64, LOGO_BASE64, USER_DEFAULT } from 'app/shared/constants/constantes.constants';
import { Archivo } from 'app/shared/model/archivo.model';
import { HojaVidaVo } from 'app/shared/vo/hoja-vida-vo';
import { AccountService } from '../../core/auth/account.service';
import { INBOX_BASE64, PHONE_BASE64 } from '../../shared/constants/constantes.constants';
import { ApiService } from '../../shared/services/api.service';
import { HojaVidaService } from '../../shared/services/hoja-vida.service';

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
      this.archivos = this.hojaVidaVo?.archivos;
    });
  }

  descargar(): void {
    if (this.archivos?.length !== 0) {
      this.apiService.downloadFile(this.archivos![0].nombre, this.archivos![0].archivo);
    }
  }

  generatePdf(): void {
    this.apiService.pdfMake.createPdf(this.getContent()).open();
  }

  private getContent(): Object {
    this.cargarDatos();
    return {
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
      content: [
        {
          table: {
            widths: ['20%', '40%', '40%'],
            body: [
              [
                {
                  image: USER_DEFAULT,
                  width: 100,
                  height: 100
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
                  fillColor: '#1a9fff',
                  table: {
                    body: [
                      [
                        {
                          image: LOCATION_BASE64,
                          alignment: 'center',
                          fit: [25, 25]
                        },
                        {
                          text: this.hojaVidaVo?.informacionPersonal.direccionResidencia,
                          style: 'header'
                        }
                      ],
                      [
                        {
                          image: INBOX_BASE64,
                          alignment: 'center',
                          fit: [25, 25]
                        },
                        {
                          text: this.hojaVidaVo?.persona.email,
                          style: 'header'
                        }
                      ],
                      [
                        {
                          image: PHONE_BASE64,
                          alignment: 'center',
                          fit: [25, 25]
                        },
                        {
                          text: this.hojaVidaVo?.informacionPersonal.telefono,
                          style: 'header'
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
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          alignment: 'justify',
          margin: [0, 10, 0, 10]
        },
        headernames: {
          fontSize: 25,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]
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
    };
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
              text: `${item.fechaInicio} / ${item.fechaFin}`
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
              text: item.ciudad ? item.ciudad : item.ciudadExtranjera
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
              w: 80,
              h: 10,
              r: 6,
              color: '#1a9fff'
            }
          ]
        }
      ]);
    });
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
                      { text: '', style: 'header' }
                    ],
                    ...this.idiomas
                  ]
                }
              }
            ],
            {
              canvas: [
                {
                  type: 'line',
                  x1: 10,
                  y1: 0,
                  x2: 10,
                  y2: 500,
                  lineWidth: 2,
                  color: '#1a9fff'
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 35,
                  color: '#1a9fff',
                  r1: 10,
                  r2: 10
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 215,
                  color: '#1a9fff',
                  r1: 10,
                  r2: 10
                },
                {
                  type: 'ellipse',
                  x: 10,
                  y: 415,
                  color: '#1a9fff',
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
}
