import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-solicitar-registro',
  templateUrl: './solicitar-registro.component.html',
  styleUrls: ['./solicitar-registro.component.scss']
})
export class SolicitarRegistroComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  registrarHojaVida(): void {
    this.router.navigate(['/agregar-usuario']);
  }
}
