import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { OfertaService } from 'app/entities/oferta/oferta.service';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { AplicacionOferta, IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { IOferta } from 'app/shared/model/oferta.model';
import { IRegiones } from 'app/shared/model/regiones.model';
import { GeografiaVo } from 'app/shared/vo/geografia-vo';
import { IOpcionVo, IResultadoOfertas } from 'app/shared/vo/opcion-vo';
import * as moment from 'moment';
import { Account } from 'app/core/user/account.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IPersona } from 'app/shared/model/persona.model';
import { AplicacionOfertaService } from 'app/entities/aplicacion-oferta/aplicacion-oferta.service';

declare let alertify: any;

@Component({
  selector: 'jhi-oferta-publica',
  templateUrl: './oferta-publica.component.html',
  styleUrls: ['./oferta-publica.component.scss']
})
export class OfertaPublicaComponent implements OnInit {

  idOferta = 0;
  listaResultadoOfertas: Array<IResultadoOfertas> = [];
  oferta!: IOferta | null;
  aspiracionesSalariales: IOpcionVo[] = commonMessages.ARRAY_ASPIRACION_SALARIAL;
  experienciasLaborales: IOpcionVo[] = commonMessages.ARRAY_EXPERIENCIA_LABORAL;
  tiposContrato: IOpcionVo[] = commonMessages.ARRAY_TIPO_CONTRATO;
  municipiosPersonal: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  aplicacionOferta = new AplicacionOferta();
  ofertaAplicar!:IOferta | null;
  account!: Account | null;
  personaInicial!: number;
  personaAplicar!:IPersona | null;
  aplicacionOfertaFiltro : Array<IAplicacionOferta> = [];
  general = "";
  
  constructor(private router: Router,private route: ActivatedRoute, private accountService:AccountService,
    private ofertaService: OfertaService, private regionService: RegionesService,
    private personaService: PersonaService, private aplicacionOfertaService : AplicacionOfertaService) {this.traerCiudad();}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('oferta')!;
    this.idOferta = parseInt(param, 10);
    this.general = this.route.snapshot.paramMap.get('general')!;
    this.cargarCuentaUsuario();
  }

  cargarCuentaUsuario(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.personaInicial = this.account?.user || 0;
    });
  }

  getOFerta(id: number): void {
    this.listaResultadoOfertas = [];
    this.ofertaService.find(id).subscribe(response => {
      this.oferta = response.body;
      const tipoContratoDB = this.tiposContrato.find(tipo => tipo.codigo === this.oferta?.tipoContrato);
      const experienciaDB = this.experienciasLaborales.find(item => item.codigo === this.oferta?.experiencia?.toString());
      const ciudadDB = this.municipiosPersonal.find(ciudad => ciudad.codigo === this.oferta?.ciudad?.toString());
      const aspiracionDB = this.aspiracionesSalariales.find(item => item.codigo === this.oferta?.salario);
      this.listaResultadoOfertas.push({
        titulo: this.oferta?.titulo,
        descripcion: this.oferta?.descripcion,
        tipoContrato: tipoContratoDB?.nombre,
        publicado: this.oferta?.fechaPublicacion?.format('YYYY-MM-DD'),
        experiencia: experienciaDB?.nombre,
        ciudad: ciudadDB?.nombre,
        salario: aspiracionDB?.nombre
      });
    });
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
    this.getOFerta(this.idOferta);
  }

  aplicarOferta(): void{
    this.ofertaService.find(this.idOferta).subscribe(ofertaResponse => {
      this.ofertaAplicar = ofertaResponse.body;
      if(this.ofertaAplicar){
        this.aplicacionOferta.oferta = this.ofertaAplicar;
      }
      this.personaService.find(this.personaInicial).subscribe(personaResponse => {
        this.personaAplicar = personaResponse.body;
        this.aplicacionOferta.estado = "Ninguno";
        this.aplicacionOferta.fechaPostulacion = moment(new Date(), 'YYYY-MMM-DD');
        if(this.personaAplicar){
          this.aplicacionOferta.usuario = this.personaAplicar;
          this.aplicacionOfertaService.getByOfertaAndPersonaFiltro(this.ofertaAplicar, this.personaAplicar).subscribe(ofertaFiltro =>{
            this.aplicacionOfertaFiltro = ofertaFiltro;
            if(this.aplicacionOfertaFiltro.length === 0){
              this.aplicacionOfertaService.create(this.aplicacionOferta).subscribe(()=>{
                this.router.navigate(['resultados-busqueda']);
              });
            }else{
              alertify.set('notifier', 'position', 'top-right');
              alertify.error("Usted ya aplico a esta oferta!");
            }
          })
          
        }
      });
    });
  }

  volver(): void {
    this.router.navigate(['resultados-busqueda', { general: this.general}]);
  }
}
