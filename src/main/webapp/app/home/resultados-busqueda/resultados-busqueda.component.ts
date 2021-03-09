import { FormBuilder } from '@angular/forms';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { OfertaService } from '../../entities/oferta/oferta.service';
import { IOferta, Oferta } from '../../shared/model/oferta.model';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo, IResultadoBusquedaOfertas } from 'app/shared/vo/opcion-vo';
import { IProfesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from 'app/entities/profesion/profesion.service';
import { Router } from '@angular/router';

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
  geografia: Array<GeografiaVo> = [];
  municipiosPersonal: Array<IOpcionVo> = [];
  labels = commonMessages;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  municipioValue:any = null;
  salarioValue:any = null;
  fechaValue:any = null;
  listaResultadoBusquedaOfertas: Array<IResultadoBusquedaOfertas> = [];
  profesiones: Array<IProfesion> = [];
  fechaFiltro: IOpcionVo[] = commonMessages.ARRAY_FECHA_FILTRO;
  resultadoBusqueda: Array<IOferta> | null = [];
  totalEmpresas = 0;

  public page = 1;
  constructor(private dataService: DataService, private formBuilder: FormBuilder,
    private ofertaService: OfertaService,private regionService: RegionesService,
    private profesionService: ProfesionService, private router: Router) {
      this.traerCiudad();
      this.cargarProfesiones();
    }

  ngOnInit(): void {
    this.profesion = this.dataService.data.profesion;
    this.ubicacion = this.dataService.data.ubicacion;
  }

  cargarProfesiones(): void {
    this.profesionService
      .query({
        page: 0,
        size: 550
      })
      .subscribe((res: HttpResponse<IProfesion[]>) => (this.profesiones = res.body || []));
  }

  traerCiudad(): void {
    this.regionService
      .query({
        page: 0,
        size: 1150
      })
      .subscribe((res: HttpResponse<IRegiones[]>) => {
        this.geografia = res.body!.map(
          item =>
            new GeografiaVo(
              item.codigoDaneDelDepartamento?.toString()!,
              item.departamento!,
              item.codigoDaneDelMunicipio?.toString()!,
              item.municipio!
            )
        );
        this.cargarMunicipiosPersonal();
      });
  }

  cargarMunicipiosPersonal(): void {
    this.municipiosPersonal = [];
    this.municipiosPersonal = this.geografia
      .map(item => {
        return {
          codigo: item.codigoMpio,
          nombre: item.nombreMpio
        };
      })
      .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0)); 
    setTimeout(() => {
      this.getOfertas()
     }, 500);
  }

  getOfertas(): void {
    this.ofertaService.query().subscribe(response =>{
      this.resultadoBusqueda = response.body;
      if(this.resultadoBusqueda){
        this.resultadoBusqueda.forEach(element => {
          const salarioBD = this.aspiracionesSalariales.find( salario => salario.codigo === element.salario );
          const ciudadBD = this.municipiosPersonal.find( ciudad => ciudad.codigo === element.ciudad?.toString() );
          const profesionBD = this.profesiones.find( profesion => profesion.id === element.profesion );
          // this.empresaService.find(element.usuario).subscribe(empresa =>{
            this.listaResultadoBusquedaOfertas.push({
              profesion: profesionBD?.profesion,
              salario: salarioBD?.nombre,
              ciudad: ciudadBD?.nombre,
              fechaPublicacion: element.fechaPublicacion?.format("YYYY-MM-DD"),
              empresa:element.usuario?.razonSocial,
              idEmpresa:element.usuario?.id,
              idOferta:element.id
            });
            this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
          // });
        });
      }
    })
    // let params = {
    //   nombre: null,
    //   idUsuarioCreador : this.token.getUser().id
    // }
  }

  cargarOfertar(): void{
    this.listaResultadoBusquedaOfertas = [];
    const params = new Oferta();
    // if(this.municipioValue == null && this.salarioValue == null && this.fechaValue == null){
    //   this.getOfertas();
    // }
    if(this.fechaValue == null){
      if(this.municipioValue != null){
        params.ciudad = this.municipioValue;
      }
      if(this.salarioValue != null){
        params.salario = this.salarioValue;
      } 
      this.ofertaService.listar(params).subscribe(response=>{
        this.resultadoBusqueda = response.content;
        if(this.resultadoBusqueda){
          this.resultadoBusqueda.forEach(element => {
            const salarioBD = this.aspiracionesSalariales.find( salario => salario.codigo === element.salario );
            const ciudadBD = this.municipiosPersonal.find( ciudad => ciudad.codigo === element.ciudad?.toString() );
            const profesionBD = this.profesiones.find( profesion => profesion.id === element.profesion );
            // this.empresaService.find(element.usuario).subscribe(empresa =>{
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: element.fechaPublicacion?.toString(),
                empresa:element.usuario?.razonSocial,
                idEmpresa:element.usuario?.id,
                idOferta:element.id
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            // });
          });
        }
        
      })
    }
    else{
      if(this.municipioValue != null){
        params.ciudad = this.municipioValue;
      }else{
        params.ciudad = 0;
      }
      if(this.salarioValue != null){
        params.salario = this.salarioValue;
      }else{
        params.salario = 0;
      }
      params.fecha = this.fechaValue;
      this.ofertaService.getOfertasFiltro(params).subscribe(response =>{
        this.resultadoBusqueda = response;
        if(this.resultadoBusqueda){
          this.resultadoBusqueda.forEach(element => {
            const salarioBD = this.aspiracionesSalariales.find( salario => salario.codigo === element.salario );
            const ciudadBD = this.municipiosPersonal.find( ciudad => ciudad.codigo === element.ciudad?.toString() );
            const profesionBD = this.profesiones.find( profesion => profesion.id === element.profesion );
            // this.empresaService.find(element.usuario).subscribe(empresa =>{
              this.listaResultadoBusquedaOfertas.push({
                profesion: profesionBD?.profesion,
                salario: salarioBD?.nombre,
                ciudad: ciudadBD?.nombre,
                fechaPublicacion: element.fechaPublicacion?.toString(),
                empresa:element.usuario?.razonSocial,
                idEmpresa:element.usuario?.id,
                idOferta:element.id
              });
              this.totalEmpresas = this.listaResultadoBusquedaOfertas.length;
            // });
          });
        }
      })
    }
  }

  verOferta(oferta: any):void{
    this.router.navigate(['/oferta-publica', { oferta: oferta.idOferta }]);
  }

}
