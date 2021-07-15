import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MercadoPagoService } from 'app/entities/mercado-pago/mercado-pago.service';

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

  constructor(private _location: Location, private router: Router, private mercadoPagoService: MercadoPagoService) {}

  ngOnInit(): void {
    this.goToMercadoPago();
  }

  goToMercadoPago(): void {
    this.mercadoPagoService.goToPayment('probando').subscribe((result: any) => {
      // eslint-disable-next-line no-console
      console.log(result);
      this.preferenceId = result.id;

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
