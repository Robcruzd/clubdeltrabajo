import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  username = '';
  password = '';

  constructor() {}

  ngOnInit(): void {}
}
