import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MercadoPagoService } from 'app/entities/mercado-pago/mercado-pago.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare const MercadoPago: any;

@Component({
  selector: 'jhi-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  checkout: any;
  preferenceId = '';
  initPoint = '';
  isOpen = false;
  Politicas = commonMessages.POLITICAS;
  TCP = commonMessages.TERMINOS_CONDICIONES_POLITICAS;
  Aceptar = commonMessages.ACEPTAR;
  modalRef!: NgbModalRef;

  constructor(
    private _location: Location,
    private router: Router,
    private mercadoPagoService: MercadoPagoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.goToMercadoPago('');
  }

  goToMercadoPago(membresia: String): void {
    this.mercadoPagoService.goToPayment(membresia).subscribe((result: any) => {
      // eslint-disable-next-line no-console
      console.log('preference: ', result);
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
    });
  }

  checkoutOpen(): void {
    this.checkout.open();
  }

  navigationUrl(): void {
    this.modalRef.close('Close click');
    window.open(this.initPoint, '_blank'); // in new tab
  }

  pagoBronce(longContent: any): void {
    this.goToMercadoPago('bronce');
    this.openScrollableContent(longContent);
  }

  pagoPlata(longContent: any): void {
    this.goToMercadoPago('plata');
    this.openScrollableContent(longContent);
  }

  pagoOro(longContent: any): void {
    this.goToMercadoPago('oro');
    this.openScrollableContent(longContent);
  }

  pagoDiamante(longContent: any): void {
    this.goToMercadoPago('diamante');
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
}
