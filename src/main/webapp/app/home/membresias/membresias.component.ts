import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  faStar,
  faAddressCard,
  faEllipsisH,
  faCommentDots,
  faAddressBook,
  faShareAlt,
  faServer,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MercadoPagoService } from 'app/entities/mercado-pago/mercado-pago.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumentoService } from '../../entities/tipo-documento/tipo-documento.service';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { HttpResponse } from '@angular/common/http';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { Empresa, IEmpresa } from 'app/shared/model/empresa.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

declare const MercadoPago: any;
declare let alertify: any;

@Component({
  selector: 'jhi-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  labels = commonMessages;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faAddressBook = faAddressBook;
  faShareAlt = faShareAlt;
  faServer = faServer;
  faBook = faBook;
  checkout: any;
  preferenceId = '';
  initPoint = '';
  isOpen = false;
  Politicas = commonMessages.POLITICAS;
  TCP = commonMessages.TERMINOS_CONDICIONES_POLITICAS;
  Aceptar = commonMessages.ACEPTAR;
  documentos: Array<ITipoDocumento> = [];
  modalRef!: NgbModalRef;
  formPayer!: FormGroup;
  nombre = '';
  apellidos = '';
  correo = '';
  telefono = '';
  identificacion = '';
  tipoIdentificacion = null;
  pago = 'bronce';
  empresaEnSesion!: IEmpresa | any;
  account!: Account | any;
  empresaUpdate!: Empresa | null;

  constructor(
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private mercadoPagoService: MercadoPagoService,
    private modalService: NgbModal,
    private tipoDocumentoService: TipoDocumentoService,
    private empresaService: EmpresaService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.crearFormularioPayer();
    this.cargarTipoDocumento();
    this.cargarCuentaUsuario();
    // this.goToMercadoPago('');
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.empresaService.find(this.account.userEmpresa).subscribe(response => {
        this.empresaEnSesion = response.body;
      });
    });
  }

  goToMercadoPago(): void {
    const payer = {
      nombre: this.formPayer.controls['nombre'].value,
      apellidos: this.formPayer.controls['apellidos'].value,
      correo: this.formPayer.controls['correo'].value,
      telefono: this.formPayer.controls['telefono'].value,
      tipoIdentificacion: this.formPayer.controls['tipoIdentificacion'].value.nombreTipo,
      identificacion: this.formPayer.controls['identificacion'].value,
      pago: this.pago,
      empresa: this.empresaEnSesion
    };
    this.mercadoPagoService.goToPayment(payer).subscribe((result: any) => {
      this.preferenceId = result.id;
      this.initPoint = result.initPoint;

      const mp = new MercadoPago('APP_USR-da329173-c59a-4362-a441-b16efc3dc9bc', {
        locale: 'es-CO'
      });
      this.checkout = mp.checkout({
        preference: {
          id: this.preferenceId
        }
      });
      // checkout.open();
      window.open(this.initPoint, '_blank');
    });
  }

  checkoutOpen(): void {
    this.checkout.open();
  }

  navigationUrl(): void {
    this.goToMercadoPago();
    this.modalRef.close('Close click');
  }

  onSubmit(): void {}

  pagoBronce(longContent: any): void {
    this.pago = 'bronce';
    this.openScrollableContent(longContent);
  }

  pagoPlata(longContent: any): void {
    this.pago = 'plata';
    this.openScrollableContent(longContent);
  }

  pagoOro(longContent: any): void {
    this.pago = 'oro';
    this.openScrollableContent(longContent);
  }

  pagoDiamante(longContent: any): void {
    this.pago = 'diamante';
    this.openScrollableContent(longContent);
  }

  openScrollableContent(longContent: any): void {
    this.modalRef = this.modalService.open(longContent, { scrollable: true });
    this.modalRef.result.finally(() => (this.isOpen = false));
  }

  getNoti(): void {
    this.mercadoPagoService.getNoti().subscribe((result: any) => {
      // eslint-disable-next-line no-console
      console.log(result);
    });
  }

  crearFormularioPayer(): void {
    this.formPayer = this.fb.group({
      nombre: [''],
      apellidos: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú0-9 ]{1,}$')]],
      identificacion: ['', [Validators.required]],
      tipoIdentificacion: [null, [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  cargarTipoDocumento(): void {
    this.tipoDocumentoService
      .query({
        page: 0,
        size: 20
      })
      .subscribe((res: HttpResponse<ITipoDocumento[]>) => {
        if (res.body !== null) {
          this.documentos = res.body
            .map(item => {
              return {
                id: item.id,
                nombreTipo: item.nombreTipo
              };
            })
            .sort((a: ITipoDocumento, b: ITipoDocumento) => (a.nombreTipo! > b.nombreTipo! ? 1 : b.nombreTipo! > a.nombreTipo! ? -1 : 0));
        }
      });
  }

  pagoUnaOferta(longContent: any): void {
    this.pago = 'unaOferta';
    this.openScrollableContent(longContent);
  }

  pagoDosOferta(longContent: any): void {
    this.pago = 'dosOferta';
    this.openScrollableContent(longContent);
  }

  pagoTresOferta(longContent: any): void {
    this.pago = 'tresOferta';
    this.openScrollableContent(longContent);
  }

  pagoFlexi(longContent: any): void {
    this.pago = 'flexi';
    this.openScrollableContent(longContent);
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
    this.empresaService.find(this.account.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.membresia === true &&
        this.empresaUpdate?.membresia !== undefined
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }
}
