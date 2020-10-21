import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CargoService } from '../../entities/cargo/cargo.service';
import { commonMessages } from '../../shared/constants/commonMessages';
import { ICargo } from 'app/shared/model/cargo.model';
import { HttpResponse } from '@angular/common/http';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { IdiomaService } from '../../entities/idioma/idioma.service';
import { IIdioma } from '../../shared/model/idioma.model';
import { FormControl } from '@angular/forms';
import { Oferta } from '../../shared/model/oferta.model';
import * as moment from 'moment';
import { OfertaService } from '../../entities/oferta/oferta.service';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import { AccountService } from '../../core/auth/account.service';
import { ApiService } from '../../shared/services/api.service';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { IProfesion } from '../../shared/model/profesion.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../core/user/user.model';
import { ProfesionService } from '../../entities/profesion/profesion.service';


@Component({
    selector: 'jhi-crear-oferta',
    templateUrl: './crear-oferta.component.html',
    styleUrls: ['./crear-oferta.component.scss']
  })
export class CrearOfertaComponent implements OnInit {

    formDatosBasicos!: FormGroup;
    labels = commonMessages;
    cargos: Array<ICargo> = [];
    aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
    idiomas: Array<IIdioma> = [];
    tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
    modalidadesLaborales: IOpcionVo[] =  commonMessages.ARRAY_MODALIDAD_LABORAL;
    nivelEducativoProfesion: IOpcionVo[] = commonMessages.ARRAY_NIVEL_EDUCATIVO_PROFESION;
    oferta!: Oferta;
    account!: Account | null;
    municipiosAcademica: Array<IOpcionVo> = [];
    geografia: Array<GeografiaVo> = [];
    myControlProfesiones = new FormControl();
    filteredOptionsProfesiones = new Observable<IProfesion[]>();
    profesiones: Array<IProfesion> = [];
    profesionState: Boolean = false;
    usuario!: User | null;
    lblSeleccioneProfesion = commonMessages.SELECCIONE_PROFESION_LABEL;
    nivelesLaborales: IOpcionVo[] = commonMessages.ARRAY_NIVEL_LABORAL;
    experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL; 

    constructor(
      private cargoService: CargoService,
      private idiomaService: IdiomaService,
      private ofertaService : OfertaService,
      private empresaService: EmpresaService,
      private accountService: AccountService,
      private apiService: ApiService, 
      private profesionService: ProfesionService,
      ) {}
    
    ngOnInit(): void {
      this.formDatosBasicos = new FormGroup({
        nombre: new FormControl(),
        experiencia: new FormControl(),
        areaTrabajo: new FormControl(),
        rangoSalarial: new FormControl(),
        idIdioma: new FormControl(),
        tipoContrato: new FormControl(),
        modalidadLAboral: new FormControl(),
        nivelEstudios: new FormControl(),
        requisitos: new FormControl(),
        ciudad: new FormControl()
      });
      this.cargarCargos();
      this.cargarIdiomas();
      this.consultarInformacionGeografica();
      this.cargarProfesiones();
      this.traerProfesiones();
      this.accountService.getAuthenticationState().subscribe(account => {     
        
        this.usuario = account;
      });
        
    }
    
    onSubmit(): void {
      this.oferta = new Oferta();
      this.oferta.estado = 'A';
      this.oferta.titulo = this.formDatosBasicos.controls['nombre'].value;
      this.oferta.descripcion = this.formDatosBasicos.controls['requisitos'].value;
      this.oferta.salario = this.formDatosBasicos.controls['rangoSalarial'].value;
      this.oferta.cargo = this.formDatosBasicos.controls['areaTrabajo'].value;
      this.oferta.experiencia = this.formDatosBasicos.controls['experiencia'].value;
      this.oferta.ciudad = this.formDatosBasicos.controls['ciudad'].value;
      this.oferta.area = this.formDatosBasicos.controls['areaTrabajo'].value;
      this.oferta.fechaPublicacion = moment(new Date(), "YYYY-MMM-DD"); 

      if(this.usuario?.userEmpresa){
        this.empresaService.find(this.usuario.userEmpresa).subscribe((response)=>{
          this.oferta.usuario = response.body;
          this.ofertaService.create(this.oferta).subscribe(()=>{
          })
        })
      }      
    }

    cargarCargos(): void {
      this.cargoService
        .query({
          page: 0,
          size: 250
        })
        .subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
    }

    cargarIdiomas(): void {
      this.idiomaService
        .query({
          page: 0,
          size: 20
        })
        .subscribe((res: HttpResponse<IIdioma[]>) => {
          if (res.body !== null) {
            this.idiomas = res.body
              .map(item => {
                return {
                  id: item.id,
                  idioma: item.idioma
                };
              })
              .sort((a: IIdioma, b: IIdioma) => (a.idioma! > b.idioma! ? 1 : b.idioma! > a.idioma! ? -1 : 0));
          }
        });
    }

    cargarMunicipiosAcademica(): void {
      this.municipiosAcademica = [];
      this.municipiosAcademica = this.geografia
        .map(item => {
          return {
            codigo: item.codigoMpio,
            nombre: item.nombreMpio
          };
        })
        .sort((a: IOpcionVo, b: IOpcionVo) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
    }

    consultarInformacionGeografica(): void {
      this.apiService.getInformacionGeografica().subscribe(geografia => {
        this.geografia = geografia;
        const bogota = { codigoDpto: '100', nombreDpto: 'Bogotá D.C.', codigoMpio: '100000', nombreMpio: 'Bogotá D.C.' };
        this.geografia.push(bogota);
        this.cargarMunicipiosAcademica();
      });
    }

    traerProfesiones(): void {
      this.filteredOptionsProfesiones = this.myControlProfesiones.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProfesiones(value))
      );
    }

    private _filterProfesiones(value: string): IProfesion[] {
      const filterValue = value.toLowerCase();
      return this.profesiones.filter(option => option.profesion?.toLowerCase().includes(filterValue));
    }

    onSelectionChanged(event: any): void {
      this.profesionState = false;
      this.profesiones.map(option => {
        if (option.profesion === event) {
          this.profesionState = true;
        }
      });
    }

    cargarProfesiones(): void {
      this.profesionService
        .query({
          page: 0,
          size: 550
        })
        .subscribe((res: HttpResponse<IProfesion[]>) => (this.profesiones = res.body || []));
    }

}