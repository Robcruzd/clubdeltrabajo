import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faUserCircle, faCheck, faTimes, faPaperPlane, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { Archivo } from 'app/shared/model/archivo.model';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';

@Component({
  selector: 'jhi-candidatos-seleccionados',
  templateUrl: './candidatos-seleccionados.component.html',
  styleUrls: ['./candidatos-seleccionados.component.scss']
})
export class CandidatosSeleccionadosComponent implements OnInit {

  public page=1;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faCheck = faCheck;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faArrowDown = faArrowDown;
  imagen!: Archivo;
  ulrImgDefault = '';
  faUserCircle = faUserCircle;
  
  estado = "Seleccionado";
  
  backcolor = "";
  btnestado = true;
  verh = false;
  verche = false;
  verno = false;


  constructor(private router: Router,
    private informacionPersonalService: InformacionPersonalService) { }

  ngOnInit(): void {
    this.backColor();
  }

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

  getCandidatosOferta(): void{
    const params = new InformacionPersonal();
    // params.size = 5;
    // params.page = 0;
    params.ciudad=100;
    // params.telefono = '123458';
    // this.informacionPersonalService.listar(params).subscribe(response=>{
      
    // })
  }
  backColor(): void{
    if (this.estado === "Descartado") {
      this.backcolor = "#FFC1C1"
      this.btnestado = false
      this.verno = true
    };
    if (this.estado === "Seleccionado") {
      this.backcolor = "#BAFFE3"
      this.btnestado = true
      this.verche = true
    };
    if (this.estado === "Ninguno") {
      this.backcolor = "#EFEFEF"
      this.btnestado = false
      this.verh = true
    };
  }
}
