import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'jhi-solicitar-registro',
  templateUrl: './solicitar-registro.component.html',
  styleUrls: ['./solicitar-registro.component.scss']
})
export class SolicitarRegistroComponent implements OnInit {

  Para_Ofrecer = commonMessages.PARA_OFRECER;
  Empresa_Registrada = commonMessages.EMPRESA_DEBE_REGISTRADA;
  Registra_Empresa = commonMessages.REGISTRA_EMPRESA;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  registrarHojaVida(): void {
    this.router.navigate(['/agregar-usuario']);
  }
}
