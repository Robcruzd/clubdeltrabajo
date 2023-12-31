/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { commonMessages } from '../../shared/constants/commonMessages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../core/auth/account.service';
import { User } from '../../core/user/user.model';
import { EmpresaService } from '../../entities/empresa/empresa.service';
import { Empresa } from '../../shared/model/empresa.model';
import { IOpcionVo } from '../../shared/vo/opcion-vo';
import { GeografiaVo } from '../../shared/vo/geografia-vo';
import { ApiService } from '../../shared/services/api.service';
import { faStar, faAddressCard, faEllipsisH, faCommentDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Archivo, IArchivo } from 'app/shared/model/archivo.model';
import { ArchivoService } from 'app/entities/archivo/archivo.service';
import { TipoArchivo } from '../../shared/vo/tipo-archivo.enum';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
import { ISector } from 'app/shared/model/sector.model';
import { SectorService } from 'app/shared/services/sector.service';
import Swal from 'sweetalert2';
import { RegionesService } from 'app/entities/regiones/regiones.service';
import { HttpResponse } from '@angular/common/http';
import { IRegiones } from 'app/shared/model/regiones.model';
// import { Persona } from 'app/shared/model/persona.model';

declare let alertify: any;

@Component({
  selector: 'jhi-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  cmEditarEmpresa: any = null;
  faStar = faStar;
  faAddressCard = faAddressCard;
  faEllipsisH = faEllipsisH;
  faCommentDots = faCommentDots;
  faTrash = faTrash;
  formEmpresa!: FormGroup;
  usuario!: User | null;
  datosEmpresa!: Empresa | null;
  municipiosAcademica: Array<IOpcionVo> = [];
  geografia: Array<GeografiaVo> = [];
  sectores: Array<ISector> = [];
  empresa: any;
  imagen!: Archivo;
  persona: any;
  tipoArchivo = TipoArchivo;
  cargadoNit = false;
  archivoNit = new Archivo();
  archivosaws: any = [];
  empresaUpdate!: Empresa | null;
  imagenes_Productos: Array<IArchivo> = [];
  // ciudad: Array<IOpcionVoMunicipio> = [];

  labels = commonMessages;
  Crear_Oferta = commonMessages.CREAR_OFERTA;
  Editar_Perfil = commonMessages.EDITAR_PERFIL;
  Club_Empresas = commonMessages.CLUB_DE_EMPRESAS;
  Controla_Ofertas = commonMessages.CONTROLA_TUS_OFERTAS;
  Membresia = commonMessages.MEMBRESIA;
  AsesoriaJuridica = commonMessages.ASESORIA_JURIDICA;
  Razon_Social = commonMessages.RAZON_SOCIAL;
  Nombre_Comercial = commonMessages.NOMBRE_COMERCIAL_EMPRESA;
  Nit = commonMessages.NIT;
  Telefono = commonMessages.TELEFONO;
  Sector_Empresa = commonMessages.SECTOR_EMPRESA;
  Subsector_Empresa = commonMessages.SUBSECTOR_EMPRESA;
  Web = commonMessages.PAGINA_WEB;
  Cantidad_Empleados = commonMessages.CANTIDAD_EMPLEADOS;
  Descrip_Empresa = commonMessages.DESCRIPCION_EMPRESA;
  Mision_Empresa = commonMessages.MISION_EMPRESA;
  Vision_Empresa = commonMessages.VISION_EMPRESA;
  Images_Produc = commonMessages.IMAGES_PRODUC;
  Catalogo = commonMessages.CATALOGO;
  Nombre_Representante = commonMessages.NOMBRE_REPRESENTANTE_LEGAL;
  Apellidos_Representante = commonMessages.APELLIDOS_REPRESENTANTE_LEGAL;
  Mail = commonMessages.CORREO_ELECTRONICO;
  Telefono_Representante = commonMessages.TELEFONO_REPRESENTANTE_LEGAL;
  Direccion = commonMessages.DIRECCION_LABEL;
  Finalizar = commonMessages.FINALIZAR;
  Id_Label = commonMessages.ID_LABEL;
  NIT = commonMessages.NIT;
  Sector = commonMessages.SECTOR;
  Subsector = commonMessages.SUBSECTOR;
  codigoEmpresa: any;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private accountService: AccountService,
    private empresaService: EmpresaService,
    private apiService: ApiService,
    private router: Router,
    private archivoService: ArchivoService,
    private commonMessagesService: CommonMessagesService,
    private sectorService: SectorService,
    private regionService: RegionesService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionCuenta();
    this.cargarSector();
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmEditarEmpresa'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmEditarEmpresa = mensajes;
          this.updateVariables();
          this.crearFormularioEmpresa();
          this.accountService.getAuthenticationState().subscribe(account => {
            this.usuario = account;
            this.cargarFormularioEmpresa();
          });
          this.consultarInformacionGeografica();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmEditarEmpresa = 0;
          this.crearFormularioEmpresa();
          this.accountService.getAuthenticationState().subscribe(account => {
            this.usuario = account;
            this.cargarFormularioEmpresa();
          });
          this.consultarInformacionGeografica();
        }
      );
  }

  updateVariables(): void {
    this.labels = this.cmEditarEmpresa;
    this.Crear_Oferta = this.cmEditarEmpresa.CREAR_OFERTA;
    this.Editar_Perfil = this.cmEditarEmpresa.EDITAR_PERFIL;
    this.Club_Empresas = this.cmEditarEmpresa.CLUB_DE_EMPRESAS;
    this.Controla_Ofertas = this.cmEditarEmpresa.CONTROLA_TUS_OFERTAS;
    this.Membresia = this.cmEditarEmpresa.MEMBRESIA;
    this.AsesoriaJuridica = this.cmEditarEmpresa.ASESORIA_JURIDICA;
    this.Razon_Social = this.cmEditarEmpresa.RAZON_SOCIAL;
    this.Nombre_Comercial = this.cmEditarEmpresa.NOMBRE_COMERCIAL_EMPRESA;
    this.Nit = this.cmEditarEmpresa.NIT;
    this.Telefono = this.cmEditarEmpresa.TELEFONO;
    this.Sector_Empresa = this.cmEditarEmpresa.SECTOR_EMPRESA;
    this.Subsector_Empresa = this.cmEditarEmpresa.SUBSECTOR_EMPRESA;
    this.Web = this.cmEditarEmpresa.PAGINA_WEB;
    this.Cantidad_Empleados = this.cmEditarEmpresa.CANTIDAD_EMPLEADOS;
    this.Descrip_Empresa = this.cmEditarEmpresa.DESCRIPCION_EMPRESA;
    this.Nombre_Representante = this.cmEditarEmpresa.NOMBRE_REPRESENTANTE_LEGAL;
    this.Apellidos_Representante = this.cmEditarEmpresa.APELLIDOS_REPRESENTANTE_LEGAL;
    this.Mail = this.cmEditarEmpresa.CORREO_ELECTRONICO;
    this.Telefono_Representante = this.cmEditarEmpresa.TELEFONO_REPRESENTANTE_LEGAL;
    this.Direccion = this.cmEditarEmpresa.DIRECCION_LABEL;
    this.Finalizar = this.cmEditarEmpresa.FINALIZAR;
  }

  obtenerIdUsuario(): Promise<any> {
    return new Promise(resolve => {
      this.accountService.getAuthenticationState().subscribe(
        response => {
          resolve(response);
        },
        () => (alertify.set('notifier', 'position', 'top-right'), alertify.error('Ingresado correctamente'))
      );
    });
  }

  async cargarInformacionCuenta(): Promise<any> {
    const cuenta = await this.obtenerIdUsuario();
    this.codigoEmpresa = cuenta.userEmpresa;
    const idEmpresa = cuenta.userEmpresa;
    this.empresaService.find(idEmpresa).subscribe(
      response => {
        this.empresa = response.body;
        console.log('empresaaa: ', this.empresa);
        this.cargarArchivoNit(this.empresa);
        this.consultarImagen();
        this.cargarImagenesCatalogo();
      },
      () => (alertify.set('notifier', 'position', 'top-right'), alertify.error(commonMessages.HTTP_ERROR_LABEL))
    );
  }

  consultarImagen(): void {
    // eslint-disable-next-line no-console
    // console.log('consultar imagennnnnnn ', this.empresa);
    this.archivoService.getEmp(TipoArchivo.IMAGEN_PERFIL, this.empresa.id).subscribe(response => {
      // eslint-disable-next-line no-console
      // console.log('response:     ', response);
      if (response.body !== null) {
        this.imagen = response.body;
      }
    });
  }

  cargarImagenesCatalogo(): void {
    console.log('email: ', this.empresa.email);
    this.archivoService.getArchivoByTipoAndEmpresa(TipoArchivo.IMAGENES_PRODUCTOS, this.empresa).subscribe(response => {
      console.log('respo: ', response);
      if (response !== null && response !== undefined) {
        if (response.length !== 0) {
          this.imagenes_Productos = response;
          // this.cargadoNit = true;
        }
      }
    });
  }

  crearFormularioEmpresa(): void {
    this.formEmpresa = this.fb.group({
      id: [''],
      razonSocial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú0-9 ]{1,}$')]],
      razonComercial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú0-9 ]{1,}$')]],
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      ciudad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sector: ['', [Validators.required]],
      subsector: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{1,}$')]],
      webPage: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú.:/ ]{1,}$')]],
      catalogo: ['', [Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú.:/ ]{1,}$')]],
      cantidadEmpleados: ['', [Validators.required, Validators.pattern('^[0-9]{0,}$')]],
      descripcion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      mision: ['', [Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      vision: ['', [Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú,;.:\n ]{0,}$')]],
      nombreRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú ]{1,}$')]],
      apellidosRepresentante: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚñáéíóú ]{1,}$')]],
      telefonoRep: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]]
    });
  }

  cargarFormularioEmpresa(): void {
    if (this.usuario?.userEmpresa) {
      this.empresaService.find(this.usuario.userEmpresa).subscribe(response => {
        this.datosEmpresa = response.body;
        console.log('datos: ', this.datosEmpresa);
        this.formEmpresa.patchValue({
          razonSocial: this.datosEmpresa!.razonSocial,
          razonComercial: this.datosEmpresa!.razonComercial,
          numeroDocumento: this.datosEmpresa!.numeroDocumento,
          direccion: this.datosEmpresa!.direccion,
          telefono: this.datosEmpresa!.telefonoEmpresa,
          ciudad: this.datosEmpresa!.ciudad?.toString(),
          email: this.datosEmpresa!.email,
          sector: this.datosEmpresa!.sector,
          subsector: this.datosEmpresa!.subsector,
          webPage: this.datosEmpresa!.paginaWeb,
          cantidadEmpleados: this.datosEmpresa!.cantidadEmpleados,
          descripcion: this.datosEmpresa!.descripcionEmpresa,
          mision: this.datosEmpresa!.misionEmpresa,
          vision: this.datosEmpresa!.visionEmpresa,
          catalogo: this.datosEmpresa!.catalogo,
          nombreRepresentante: this.datosEmpresa!.nombreRepresentanteLegal,
          apellidosRepresentante: this.datosEmpresa!.apellidosRepresentanteLegal,
          telefonoRep: this.datosEmpresa!.telefono
        });
        console.log('empresa: ', this.formEmpresa);
      });
    }
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
        this.cargarMunicipiosAcademica();
      });
  }
  // consultarInformacionGeografica(): void {
  //   this.apiService.getInformacionGeografica().subscribe(geografia => {
  //     this.geografia = geografia;
  //     // const bogota = { codigoDpto: '100', nombreDpto: 'Bogotá D.C.', codigoMpio: '100000', nombreMpio: 'Bogotá D.C.' };
  //     // this.geografia.push(bogota);
  //     this.cargarMunicipiosAcademica();
  //     console.log('this.municipiosAcademica: ', this.municipiosAcademica);
  //   });
  // }

  backClicked(): void {
    this._location.back();
  }

  onSubmit(): void {
    if (this.archivoNit.archivo === undefined) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Debe adjuntar un documento del NIT');
    } else {
      this.datosEmpresa!.razonSocial = this.formEmpresa.controls['razonSocial'].value;
      this.datosEmpresa!.razonComercial = this.formEmpresa.controls['razonComercial'].value;
      this.datosEmpresa!.numeroDocumento = this.formEmpresa.controls['numeroDocumento'].value;
      this.datosEmpresa!.direccion = this.formEmpresa.controls['direccion'].value;
      this.datosEmpresa!.telefonoEmpresa = this.formEmpresa.controls['telefono'].value;
      this.datosEmpresa!.ciudad = this.formEmpresa.controls['ciudad'].value;
      this.datosEmpresa!.email = this.formEmpresa.controls['email'].value;
      this.datosEmpresa!.sector = this.formEmpresa.controls['sector'].value;
      this.datosEmpresa!.subsector = this.formEmpresa.controls['subsector'].value;
      this.datosEmpresa!.paginaWeb = this.formEmpresa.controls['webPage'].value;
      this.datosEmpresa!.cantidadEmpleados = this.formEmpresa.controls['cantidadEmpleados'].value;
      this.datosEmpresa!.descripcionEmpresa = this.formEmpresa.controls['descripcion'].value;
      this.datosEmpresa!.misionEmpresa = this.formEmpresa.controls['mision'].value;
      this.datosEmpresa!.visionEmpresa = this.formEmpresa.controls['vision'].value;
      this.datosEmpresa!.catalogo = this.formEmpresa.controls['catalogo'].value;
      this.datosEmpresa!.nombreRepresentanteLegal = this.formEmpresa.controls['nombreRepresentante'].value;
      this.datosEmpresa!.apellidosRepresentanteLegal = this.formEmpresa.controls['apellidosRepresentante'].value;
      this.datosEmpresa!.telefono = this.formEmpresa.controls['telefonoRep'].value;
      console.log('empresa upd: ', this.datosEmpresa);
      this.empresaService.update(this.datosEmpresa).subscribe(
        response => {
          if (response.body !== null) {
            this.imagenes_Productos.push(this.archivoNit);
            this.imagenes_Productos.forEach(archivo => {
              if (archivo.id !== undefined) {
                this.archivoService.update(archivo).subscribe(
                  archivoResponse => {
                    if (archivoResponse.body !== null) {
                      alertify.set('notifier', 'position', 'top-right');
                      alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                      this.router.navigate(['/perfil-empresa']);
                    }
                  },
                  () => {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(commonMessages.HTTP_ERROR_LABEL);
                  }
                );
              } else {
                this.archivoService.create(archivo).subscribe(
                  archivoResponse => {
                    if (archivoResponse.body !== null) {
                      alertify.set('notifier', 'position', 'top-right');
                      alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                      this.router.navigate(['/perfil-empresa']);
                    }
                  },
                  () => {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(commonMessages.HTTP_ERROR_LABEL);
                  }
                );
              }
              this.archivosaws.forEach((element: { file: File; name: string }) => {
                const formData = new FormData();
                formData.append('file', element.file, element.name);
                this.archivoService.uploadS3(formData).subscribe(() => {});
              });
            });
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    }
  }

  crearOferta(): void {
    this.router.navigate(['primer-oferta']);
  }

  verOferta(): void {
    this.router.navigate(['controlar-ofertas']);
  }

  membresia(): void {
    this.router.navigate(['membresias']);
  }

  editarPerfil(): void {
    this.router.navigate(['editar-empresa']);
  }

  clubEmpresas(): void {
    this.empresaService.find(this.codigoEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.clubEmpresa !== undefined &&
        this.empresaUpdate?.clubEmpresa === true
      ) {
        this.router.navigate(['club-empresas']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para acceder al club de empresas!. Debe contratar un plan!');
      }
    });
  }

  juridica(): void {
    this.empresaService.find(this.codigoEmpresa).subscribe(empresa => {
      this.empresaUpdate = empresa.body;
      if (
        empresa !== undefined &&
        empresa !== null &&
        this.empresaUpdate?.juridica === true &&
        this.empresaUpdate?.juridica !== undefined
      ) {
        this.router.navigate(['preguntas-frecuentes']);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No cuenta con la membresia para asesoría jurídica!. Debe contratar un plan!');
      }
    });
  }

  addCiudad(): void {}

  cargarImagen(event: any, tipoDocumento: number): void {
    const file: File = event.target.files[0];
    const extension = file.name.split('.').pop() || '';

    if (file.size > commonMessages.TAMANO_MAXIMO_PERMITIDO) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_TAMANO_EXCEDIDO);
      return;
    }
    if (!commonMessages.IMAGENES_SOPORTADAS.includes(extension)) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_IMAGEN_NO_SOPORTADA);
      return;
    }

    this.imagen = this.imagen || new Archivo();
    this.imagen.tipo = tipoDocumento;
    this.imagen.nombre = file.name;
    this.imagen.extension = extension;
    this.imagen.empresa = this.empresa;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagen.archivo = reader.result;
      this.subirImagen();
    };
  }

  subirImagen(): void {
    if (this.imagen.id !== undefined) {
      this.archivoService.update(this.imagen).subscribe(
        response => {
          if (response.body !== null) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    } else {
      this.archivoService.create(this.imagen).subscribe(
        response => {
          if (response.body !== null) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
          }
        },
        () => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.error(commonMessages.HTTP_ERROR_LABEL);
        }
      );
    }
  }

  // cargar archivos
  addArchivo(event: any, tipoDocumento: number): void {
    const file: File = event.target.files[0];
    if (file.size > commonMessages.TAMANO_MAXIMO_PERMITIDO) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_TAMANO_EXCEDIDO);
      return;
    }
    const extension = file.name.split('.').pop() || '';
    if (!commonMessages.ARCHIVOS_PERMITIDOS.includes(extension) && !commonMessages.IMAGENES_SOPORTADAS.includes(extension)) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(commonMessages.ERROR_ARCHIVO_NO_SOPORTADO);
      return;
    }

    if (tipoDocumento === TipoArchivo.IMAGENES_PRODUCTOS) {
      // index = this.imagenes_Productos.findIndex(item => item.tipo === tipoDocumento);
      if (this.imagenes_Productos.length >= 5) {
        this.imagenes_Productos[5].nombre = file.name;
        this.imagenes_Productos[5].extension = extension;
        this.imagenes_Productos[5].empresa = this.empresa;

        const fileaws = {};
        fileaws['file'] = file;
        fileaws['name'] = this.imagenes_Productos[5].archivo;

        this.archivosaws.push(fileaws);
        this.imagenes_Productos.shift();
        // this.cargadoDocumento = true;
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Archivo cargado, se guardará al continuar al finalizar');
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Archivo cargado, se guardará al continuar al finalizar');

        const archivo = new Archivo();
        archivo.tipo = tipoDocumento;
        archivo.nombre = file.name;
        archivo.extension = extension;
        archivo.empresa = this.empresa;
        archivo.archivo = '' + this.empresa.email + new Date().getTime();
        const fileaws = {};
        fileaws['file'] = file;
        fileaws['name'] = archivo.archivo;
        this.archivosaws.push(fileaws);
        this.imagenes_Productos.push(archivo);
        console.log(this.imagenes_Productos);
        // this.cargadoDocumento = true;
      }
    } else {
      this.archivoNit = this.archivoNit || new Archivo();
      this.archivoNit.nombre = file.name;
      this.archivoNit.extension = extension;
      this.archivoNit.empresa = this.empresa;
      this.archivoNit.tipo = tipoDocumento;
      this.archivoNit.archivo = '' + this.empresa.email + new Date().getTime();

      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.archivoNit.archivo = reader.result;
      // };
      const fileaws = {};
      fileaws['file'] = file;
      fileaws['name'] = this.archivoNit.archivo;

      this.archivosaws.push(fileaws);
      this.cargadoNit = true;
    }
  }

  cargarArchivoNit(empresa: any): void {
    this.archivoService.getArchivoByTipoAndEmpresa(this.tipoArchivo.RUT, empresa).subscribe(response => {
      if (response !== null && response !== undefined) {
        if (response.length !== 0) {
          this.archivoNit = response[0];
          this.cargadoNit = true;
        }
      }
    });
  }

  deleteArchivo(tipoArchivo: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar el archivo?',
      icon: 'question',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2699FB',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        if (TipoArchivo.RUT === tipoArchivo) {
          if (this.archivoNit && this.archivoNit.id) {
            this.archivoService.delete(this.archivoNit.id).subscribe(
              () => {
                if (this.archivoNit && this.archivoNit.archivo)
                  this.archivoService.deleteS3(this.archivoNit.archivo.toString()).subscribe(() => {});
                alertify.set('notifier', 'position', 'top-right');
                alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                this.archivoNit.archivo = undefined;
                this.cargadoNit = false;
              },
              () => {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error(commonMessages.HTTP_ERROR_LABEL);
              }
            );
          }
        } else {
          this.imagenes_Productos.forEach(archivo => {
            if (archivo.id !== undefined && archivo.id !== null) {
              this.archivoService.delete(archivo.id).subscribe(
                () => {
                  if (archivo && archivo.archivo) this.archivoService.deleteS3(archivo.archivo.toString()).subscribe(() => {});
                  alertify.set('notifier', 'position', 'top-right');
                  alertify.success(commonMessages.HTTP_SUCCESS_LABEL);
                  archivo.archivo = undefined;
                },
                () => {
                  alertify.set('notifier', 'position', 'top-right');
                  alertify.error(commonMessages.HTTP_ERROR_LABEL);
                }
              );
            }
          });
          this.imagenes_Productos = [];
        }
      }
    });
  }

  descargarArchivo(tipoArchivo: number): void {
    if (TipoArchivo.RUT === tipoArchivo) {
      if (this.cargadoNit && this.archivoNit.archivo) {
        this.archivoService.getS3(this.archivoNit.archivo.toString(), this.archivoNit.nombre!);
        // const a = document.createElement('a');
        // a.href = this.archivoNit.archivo.toString();
        // a.download = this.archivoNit.nombre!;
        // a.click();
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No se ha cargado el NIT');
      }
    } else {
      this.imagenes_Productos.forEach(archivo => {
        this.archivoService.getS3(archivo.archivo!.toString(), archivo.nombre!);
      });
    }
  }

  cargarSector(): void {
    this.sectorService.getSector().subscribe(res => {
      if (res !== null) {
        this.sectores = res;
      }
    });
  }
}
