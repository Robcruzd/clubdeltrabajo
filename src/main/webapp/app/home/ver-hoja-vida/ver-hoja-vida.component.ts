import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { LOGO_BASE64, USER_DEFAULT } from 'app/shared/constants/constantes.constants';
import { Archivo } from 'app/shared/model/archivo.model';
import { HojaVidaVo } from 'app/shared/vo/hoja-vida-vo';
import { AccountService } from '../../core/auth/account.service';
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
                  // color: 'white',
                  fillColor: '#0070C0',
                  type: 'none',
                  ul: [
                    {
                      text: this.hojaVidaVo?.informacionPersonal.direccionResidencia,
                      style: 'header'
                    },
                    {
                      text: this.hojaVidaVo?.persona.email,
                      style: 'header'
                    },
                    {
                      text: this.hojaVidaVo?.informacionPersonal.telefono,
                      style: 'header'
                    }
                  ]
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
              style: 'header'
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
              style: 'header'
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
  }

  private cargarInformacionDinamica(): Object {
    return {
      layout: 'noBorders',
      table: {
        widths: ['*', '*'],
        body: [
          [
            { text: 'PERFIL LABORAL', style: 'header' },
            { text: 'EXPERIENCIA LABORAL', style: 'header' }
          ],
          [
            [
              this.hojaVidaVo?.informacionPersonal.perfilProfesional,
              {
                layout: 'noBorders',
                table: {
                  widths: ['*'],
                  body: [[{ text: 'FORMACIÓN ACADEMICA', style: 'header' }], ...this.informacionAcademica]
                }
              },
              {
                layout: 'noBorders',
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'IDIOMAS',
                        style: 'header'
                      }
                    ],
                    ['Idioma 1'],
                    ['Idioma 2']
                  ]
                }
              }
            ],
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
