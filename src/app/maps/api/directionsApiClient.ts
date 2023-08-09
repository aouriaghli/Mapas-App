import { HttpClient, HttpHandler } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/app/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {

  public base_Url:string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor( handler: HttpHandler){
    super(handler);
  }

  public override get<T>( url:string){
      url = this.base_Url + url;

      //los params los sacamos de la llamada desde postman
      return super.get<T>(
        url, {
        params: {
          alternatives: false,
          geometries : 'geojson',
          language: 'es',
          overview: 'simplified',
          steps: false,
          access_token: environment.apiKey,
        }

      }
      // `https://api.mapbox.com/directions/v5/mapbox/driving/-3.59551%2C37.165091%3B-3.59934%2C37.173285?alternatives=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiYW91cmlhZ2hsaSIsImEiOiJjbGttZzFhMm0wZXZjM3FwbHdtMWRwd2lvIn0.dr0ZtDVD14QyeTyX3UmeyA`
      );
  }
}
