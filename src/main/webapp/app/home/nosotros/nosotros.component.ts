import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';

@Component({
  selector: 'jhi-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  Nosotros = commonMessages.NOSOTROS;
  Texto_1 = commonMessages.NOSOTROS_1;
  Texto_2 = commonMessages.NOSOTROS_2;
  
  constructor() { }

  ngOnInit(): void {
  }

}
