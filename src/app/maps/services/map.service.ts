import { Injectable } from '@angular/core';
import { LngLat, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature, Properties } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map:Map | undefined; //private map?:Map;
  private markers: Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  setMap(map:Map){
    this.map = map;
  }

  flyTo( coords: LngLatLike){
    if (!this.isMapReady) throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom:14,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[]){
    if(!this.map)  throw Error('Mapa no inicializaco');

    this.markers.forEach( marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = [place.properties['coordinates'].longitude,
                         place.properties['coordinates'].latitude];
      const popup = new Popup()
          .setHTML(`
          <h6>${ place.properties['name'] }</h6>
          <span> ${ place.properties['place_formatted'] } </span>
          `);
      const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map);

      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;
  }
  constructor() { }
}
