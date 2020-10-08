import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'jhi-primer-oferta',
  templateUrl: './primer-oferta.component.html',
  styleUrls: ['./primer-oferta.component.scss']
})
export class PrimerOfertaComponent implements OnInit {
  constructor(private router: Router, private _location: Location) {}

  ngOnInit(): void {}

  crearOferta(): void {
    this.router.navigate(['crear-oferta']);
  }

  backClicked(): void {
    this._location.back();
  }
}
