import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';
import { Router } from '@angular/router';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {
  imagen!: Archivo;
  ulrImgDefault = '../../../content/images/Image 28_M.png';
  faStar = faStar;
  faEllipsisH = faEllipsisH;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  verOferta(): void {}

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }
}