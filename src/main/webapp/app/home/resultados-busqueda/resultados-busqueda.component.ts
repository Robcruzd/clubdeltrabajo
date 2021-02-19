import { FormBuilder } from '@angular/forms';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { OfertaService } from '../../entities/oferta/oferta.service';
import { Oferta } from '../../shared/model/oferta.model';

@Component({
  selector: 'jhi-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  lblResultados = commonMessages.RESULTADO_BUSQUEDA_LABEL;
  lblSalario = commonMessages.SALARIO_LABEL;
  lblCiudad = commonMessages.CIUDAD_LABEL;
  lblFechaPublicacion = commonMessages.FECHA_PUBLICACION_LABEL;
  lblAreaTrabajo = commonMessages.AREA_TRABAJO_LABEL;
  lblEmpresas = commonMessages.EMPRESAS_LABEL;
  // formBusqueda!: FormGroup;
  profesion: any;
  ubicacion: any;
  ofertaFiltro!: Oferta;

  resultadoBusqueda!: any;

  public page = 1;

  selec = ["1","2","3","4","5"]

  constructor(private dataService: DataService, private formBuilder: FormBuilder,
    private ofertaService: OfertaService) {}

  ngOnInit(): void {
    this.profesion = this.dataService.data.profesion;
    this.ubicacion = this.dataService.data.ubicacion;

    this.getOfertas();

    // this.formBusqueda = this.formBuilder.group({
    //   'campoBusqueda': ['']
    // });
    // this.formBusqueda.get('campoBusqueda')?.setValue(this.dataService.data.profesion);
  }

  getOfertas(): void {
    this.ofertaFiltro = new Oferta();
    this.ofertaFiltro.ciudad = 52001;
    this.ofertaFiltro.salario = 4;
    this.ofertaService.getOfertasFiltro(this.ofertaFiltro).subscribe(response =>{
      this.resultadoBusqueda = response.content;
    })
    // let params = {
    //   nombre: null,
    //   idUsuarioCreador : this.token.getUser().id
    // }

    // this._elementoPService.consultarPlantillasAll(params).subscribe(response => {
    //   this.plantillaConsulta = response;
    //   if(this.plantillaConsulta.length === 0){
    //     this.banderaFiltroTabla = true;
    //   }else{
    //     this.banderaFiltroTabla = false;
    //   }
    // });
    // this.ofertaFiltro.ciudad = 520001;
    // this.ofertaFiltro.experiencia = '1';
    // this.ofertaService.getOfertasFiltro(this.ofertaFiltro).subscribe(response =>{
    //   console.log("response oferta");
    //   console.log(response);

    // })
  }

}
