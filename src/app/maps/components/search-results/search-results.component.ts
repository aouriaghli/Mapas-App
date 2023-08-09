import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature, Coordinates } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(private placesServices:PlacesService,
              private mapService: MapService){
  }

  get isLoadingPlaces(): boolean{
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesServices.places;
  }

  flyTo( place: Feature){
    const [lng, lat] = [place.properties['coordinates'].longitude,
                       place.properties['coordinates'].latitude];
    this.selectedId = place.id;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place:Feature){

    if(!this.placesServices.userLocation) throw Error('No hay userLocation');

    this.placesServices.deletePlaces();
    const start = this.placesServices.userLocation!;
    const end : [number, number] = [place.properties['coordinates'].longitude, place.properties['coordinates'].latitude];
    this.mapService.getRouteBetweenPoints(start, end);
  }
}
