import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {
  nombre = '';
  mensajeNombre = '';
  password = '';
  confirmPassword = '';

  constructor() {}

  ngOnInit(): void {}
}
