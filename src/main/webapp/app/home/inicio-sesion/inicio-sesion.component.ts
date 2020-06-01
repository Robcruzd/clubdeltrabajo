import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ventanaRegistrar(): void{
    this.router.navigate(['/agregar-usuario']);
  }

  ventanaPerfil(): void{
    this.router.navigate(['/perfil']);
  }

  ventanaRecuperar(): void{
    this.router.navigate(['/restaurar-contrasena']);
  }

}
