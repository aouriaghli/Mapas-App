import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

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

  constructor( private http:HttpClient) {
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

    this.isLoadingPlaces = true;
    this.http.get<PlacesResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&limit=5&proximity=-3.590124862853628%2C37.15708555526294&access_token=pk.eyJ1IjoiYW91cmlhZ2hsaSIsImEiOiJjbGttZzFhMm0wZXZjM3FwbHdtMWRwd2lvIn0.dr0ZtDVD14QyeTyX3UmeyA`)
          .subscribe( resp => {
            console.log( resp.features);
            this.isLoadingPlaces = false;
            this.places = resp.features;
          });
  }
}
