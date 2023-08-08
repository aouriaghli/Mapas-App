import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

   //Sirve cualquiera de estas formas : public userLocation?: [number,number]; public userLocation: [number,number] = undefined;
  public userLocation: [number,number] | undefined;

  get isUserLocationReady():boolean{
    return !!this.userLocation; //(para decir que si tiene valor doble negacion !!)
  }

  constructor() {
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
}
