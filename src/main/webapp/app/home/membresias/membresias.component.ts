import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faStar, faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  faStar = faStar;
  faAddressCard = faAddressCard;

  constructor(private _location: Location) {}

  ngOnInit(): void {}

  backClicked(): void {
    this._location.back();
  }
}
