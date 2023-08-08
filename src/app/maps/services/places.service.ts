import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

   //Sirve cualquiera de estas formas : public userLocation?: [number,number]; public userLocation: [number,number] = undefined;
  public userLocation: [number,number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady():boolean{
    return !!this.userLocation; //(para decir que si tiene valor doble negacion !!)
  }

  constructor( private placesApiClient: PlacesApiClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise( (resolve, reject) => {
       navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = ([ coords.longitude, coords.latitude]) // longitud y luego latitud, pq vamos a usar mapbox
          resolve(this.userLocation);
        },
        ( error) => {
          alert('No se pudo obtener la geolocalización')
          console.log(error)
          reject();
        });
    });
  }

  getPlacesByQuery(query:string = ''){
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    };
    if (!this.userLocation) throw Error('No hay user location');

    this.isLoadingPlaces = true;
    this.placesApiClient.get<PlacesResponse>(`${query}`,{ params:{
      proximity : this.userLocation!.join(',')
    }
    })
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}
