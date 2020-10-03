import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';

@Component({
  selector: 'jhi-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {
  imagen!: Archivo;
  ulrImgDefault = '../../../content/images/Image 28_M.png';

  constructor() {}

  ngOnInit(): void {}

  crearOferta(): void {}

  verOferta(): void {}

  membresia(): void {}

  editarPerfil(): void {}
}
