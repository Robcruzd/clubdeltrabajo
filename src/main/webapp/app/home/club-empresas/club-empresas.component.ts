import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

@Component({
  selector: 'jhi-club-empresas',
  templateUrl: './club-empresas.component.html',
  styleUrls: ['./club-empresas.component.scss']
})
export class ClubEmpresasComponent implements OnInit {
  public page = 1;

  mostrar = false;

  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;

  ListaEmpresas: Array<IEmpresa> | any = [];

  constructor(private _location: Location, private router: Router, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.getEmpresas();
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

  getEmpresas(): void {
    this.empresaService.query().subscribe(listEmpresa => {
      this.ListaEmpresas = listEmpresa.body;
    });
  }
}
