import { Component, OnInit, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent {

  //private placesSerivce = inject(PlacesService);

  constructor(private placesService: PlacesService){}

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }

}
