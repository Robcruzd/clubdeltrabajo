import { FormBuilder } from '@angular/forms';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';

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

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profesion = this.dataService.data.profesion;
    this.ubicacion = this.dataService.data.ubicacion;

    // this.formBusqueda = this.formBuilder.group({
    //   'campoBusqueda': ['']
    // });
    // this.formBusqueda.get('campoBusqueda')?.setValue(this.dataService.data.profesion);
  }
}
