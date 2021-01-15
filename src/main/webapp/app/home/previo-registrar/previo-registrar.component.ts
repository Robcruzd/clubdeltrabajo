import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-previo-registrar',
  templateUrl: './previo-registrar.component.html',
  styleUrls: ['./previo-registrar.component.scss']
})
export class PrevioRegistrarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  crearOferta(): void {
    this.router.navigate(['/agregar-usuario', { userType: 'natural' }]);
  }
}
