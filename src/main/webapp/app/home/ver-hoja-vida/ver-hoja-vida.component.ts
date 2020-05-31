import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-ver-hoja-vida',
  templateUrl: './ver-hoja-vida.component.html',
  styleUrls: ['./ver-hoja-vida.component.scss']
})
export class VerHojaVidaComponent implements OnInit {
  lblDescargar = commonMessages.DESCARGAR_HOJAVIDA_LABEL;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  regresarPerfil(): void{
    this.router.navigate(['perfil']);
  }
}
