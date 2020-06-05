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
    return {
      content: [
        { text: 'HOJA DE VIDA', style: 'header' },
        { text: 'DATOS DE CONTACTO', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
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
        { text: 'PERFIL LABORAL', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [[this.hojaVidaVo?.informacionPersonal.perfilProfesional]]
          }
        }
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
        // alignment: 'justify'
      }
    };
  }
}
