import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { commonMessages } from '../../shared/constants/commonMessages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  labels = commonMessages;
  faStar = faStar;
  faEllipsisH = faEllipsisH;
  formEmpresa!: FormGroup;

  constructor(private _location: Location, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.crearFormularioEmpresa();
  }

  crearFormularioEmpresa(): void {
    this.formEmpresa = this.fb.group({
      id: [''],
      razonSocial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      razonComercial: ['', [Validators.required, Validators.pattern('^[A-Za-zÑÁÉÍÓÚ ]{1,}$')]],
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú#. -]{0,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      ciudad: ['', [Validators.required, Validators.pattern('^[0-9A-Za-zÑÁÉÍÓÚñáéíóú ]{0,}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  backClicked(): void {
    this._location.back();
  }
}
