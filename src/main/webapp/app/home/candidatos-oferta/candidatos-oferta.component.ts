import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { Archivo } from 'app/shared/model/archivo.model';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';

@Component({
  selector: 'jhi-candidatos-oferta',
  templateUrl: './candidatos-oferta.component.html',
  styleUrls: ['./candidatos-oferta.component.scss']
})
export class CandidatosOfertaComponent implements OnInit {
  public page = 1;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  imagen!: Archivo;
  ulrImgDefault = '';
  faUserCircle = faUserCircle;

  constructor(private router: Router, private informacionPersonalService: InformacionPersonalService) {}

  ngOnInit(): void {}

  volverOferta(): void {
    this.router.navigate(['primer-oferta']);
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

  getCandidatosOferta(): void {
    const params = new InformacionPersonal();
    // params.size = 5;
    // params.page = 0;
    params.ciudad = 100;
    // params.telefono = '123458';
    // this.informacionPersonalService.listar(params).subscribe(response=>{

    // })
  }
}
