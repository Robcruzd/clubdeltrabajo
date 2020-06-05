import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { commonMessages } from 'app/shared/constants/commonMessages';
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
      content: [
        { text: 'HOJA DE VIDA', style: 'header' },
        { text: 'DATOS DE CONTACTO', style: 'subheader', alignment: 'center' },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*'],
            body: [
              ['Teléfono', 'Dirección', 'Correo electrónico'],
              [
                this.hojaVidaVo?.informacionPersonal.telefono,
                this.hojaVidaVo?.informacionPersonal.direccionResidencia,
                this.hojaVidaVo?.persona.email
              ]
            ]
          }
        },
        { text: 'PERFIL LABORAL', style: 'subheader', alignment: 'center' },
        {
          style: 'tableExample',
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [[this.hojaVidaVo?.informacionPersonal.perfilProfesional]]
          }
        },
        this.cargarTablaInformacionAcademica(),
        this.cargarTablaInformacionLaboral()
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        alignment: 'justify'
      }
    };
  }

  cargarDatos(): void {
    // cargar informacion academica
    this.hojaVidaVo?.informacionAcademica.forEach(item => {
      this.informacionAcademica.push([item.institucion?.institucion, item.fechaFin, item.tituloOtorgado, item.estado]);
    });

    this.hojaVidaVo?.experienciaLaboral.forEach(item => {
      this.informacionLaboral.push([item.nombreEmpresa, item.cargo?.cargo, item.fechaFin, item.ciudad]);
    });
  }

  private cargarTablaInformacionAcademica(): Object {
    return {
      style: 'tableExample',
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{ text: 'EDUCACIÓN', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {}],
          [
            {
              text: 'Institución',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Fecha',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Titulo',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Ciudad',
              style: 'tableHeader',
              alignment: 'center'
            }
          ],
          ...this.informacionAcademica
        ]
      }
    };
  }

  private cargarTablaInformacionLaboral(): Object {
    return {
      style: 'tableExample',
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{ text: 'EXPERIENCIA', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {}],
          [
            {
              text: 'Empresa',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Cargo',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Fecha',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Ciudad',
              style: 'tableHeader',
              alignment: 'center'
            }
          ],
          ...this.informacionLaboral
        ]
      }
    };
  }
}
