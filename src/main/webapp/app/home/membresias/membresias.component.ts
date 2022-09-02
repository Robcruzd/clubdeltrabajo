/* eslint-disable @typescript-eslint/camelcase */
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
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { MembresiasService } from 'app/entities/membresias/membresias.service';
import { IMembresias } from 'app/shared/model/membresias.model';

declare const MercadoPago: any;
declare let alertify: any;

@Component({
  selector: 'jhi-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  cmMembresias: any = null;
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
  dataMembre: Array<IMembresias> = [];

  labels = commonMessages;
  Aceptar = commonMessages.ACEPTAR;
  CrearOfertaLabel = commonMessages.CREAR_OFERTA;
  EditarPerfilLabel = commonMessages.EDITAR_PERFIL;
  ClubEmpresasLabel = commonMessages.CLUB_DE_EMPRESAS;
  ControlaOfertasLabel = commonMessages.CONTROLA_TUS_OFERTAS;
  MembresiaLabel = commonMessages.MEMBRESIA;
  AsesoriaJuridicaLabel = commonMessages.ASESORIA_JURIDICA;
  UnaOferta = commonMessages.UNA_OFERTA;
  DosOfertas = commonMessages.DOS_OFERTAS;
  TresOfertas = commonMessages.TRES_OFERTAS;
  Flexi = commonMessages.FLEXI;
  Comprar = commonMessages.COMPRAR;
  BronceTitulo = commonMessages.BRONCE_TITULO;
  BronceDescrip1 = commonMessages.BRONCE_DESCRIP1;
  BronceDescrip2 = commonMessages.BRONCE_DESCRIP2;
  BronceDescrip3 = commonMessages.BRONCE_DESCRIP3;
  BronceDescrip4 = commonMessages.BRONCE_DESCRIP4;
  BronceDescrip5 = commonMessages.BRONCE_DESCRIP5;
  BronceDescrip6 = commonMessages.BRONCE_DESCRIP6;
  BronceValorLabel = commonMessages.BRONCE_VALOR;
  PlataTitulo = commonMessages.PLATA_TITULO;
  PlataDescrip1 = commonMessages.PLATA_DESCRIP1;
  PlataDescrip2 = commonMessages.PLATA_DESCRIP2;
  PlataDescrip3 = commonMessages.PLATA_DESCRIP3;
  PlataDescrip4 = commonMessages.PLATA_DESCRIP4;
  PlataDescrip5 = commonMessages.PLATA_DESCRIP5;
  PlataDescrip6 = commonMessages.PLATA_DESCRIP6;
  PlataValorLabel = commonMessages.PLATA_VALOR;
  OroTitulo = commonMessages.ORO_TITULO;
  OroDescrip1 = commonMessages.ORO_DESCRIP1;
  OroDescrip2 = commonMessages.ORO_DESCRIP2;
  OroDescrip3 = commonMessages.ORO_DESCRIP3;
  OroDescrip4 = commonMessages.ORO_DESCRIP4;
  OroDescrip5 = commonMessages.ORO_DESCRIP5;
  OroDescrip6 = commonMessages.ORO_DESCRIP6;
  OroValorLabel = commonMessages.ORO_VALOR;
  DiamanteTitulo = commonMessages.DIAMANTE_TITULO;
  DiamanteDescrip1 = commonMessages.DIAMANTE_DESCRIP1;
  DiamanteDescrip2 = commonMessages.DIAMANTE_DESCRIP2;
  DiamanteDescrip3 = commonMessages.DIAMANTE_DESCRIP3;
  DiamanteDescrip4 = commonMessages.DIAMANTE_DESCRIP4;
  DiamanteDescrip5 = commonMessages.DIAMANTE_DESCRIP5;
  DiamanteDescrip6 = commonMessages.DIAMANTE_DESCRIP6;
  DiamanteValorLabel = commonMessages.DIAMANTE_VALOR;
  Volver = commonMessages.VOLVER;
  InfoComprador = commonMessages.INFO_COMPRADOR;
  Nombres = commonMessages.NOMBRES;
  Apellidos = commonMessages.APELLIDOS;
  EmailLabel = commonMessages.EMAIL_LABEL;
  Telefono = commonMessages.TELEFONO;
  TipoDocumento = commonMessages.TIPO_DOCUMENTO;
  Identificacion = commonMessages.IDENTIFICACION;

  constructor(
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private mercadoPagoService: MercadoPagoService,
    private modalService: NgbModal,
    private tipoDocumentoService: TipoDocumentoService,
    private empresaService: EmpresaService,
    private accountService: AccountService,
    private commonMessagesService: CommonMessagesService,
    private membresiaService: MembresiasService
  ) {}

  ngOnInit(): void {
    this.crearFormularioPayer();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmMembresias'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmMembresias = mensajes;
          this.updateVariables();
          this.traerMembresias();
          this.cargarTipoDocumento();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmMembresias = 0;
          this.cargarTipoDocumento();
        }
      );
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

  updateVariables(): void {
    this.labels = this.cmMembresias;
    // this.Aceptar = this.cmMembresias.ACEPTAR;
  }

  traerMembresias(): void {
    this.membresiaService
      .query({
        page: 0,
        size: 550,
        sort: ['id,asc']
      })
      .subscribe((res: HttpResponse<IMembresias[]>) => {
        this.dataMembre = res.body!;
        console.log(this.dataMembre);
        console.log(this.dataMembre[0].precioMembresia);
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

      const mp = new MercadoPago('APP_USR-85a7a00d-9e64-4775-985e-9d3eea930cd1', {
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
        alertify.error('No cuenta con la membresia para club de empresas!. Debe contratar un plan!');
      }
    });
  }

  juridica(): void {
    this.empresaService.find(this.account.userEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.juridica === true &&
        this.empresaUpdate?.juridica !== undefined
      ) {
        this.router.navigate(['preguntas-frecuentes']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
    });
  }

  controlaOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }
}
