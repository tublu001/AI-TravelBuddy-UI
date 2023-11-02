import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelSearchRequest } from 'src/models/touristPlace';

@Injectable({
  providedIn: 'root'
})
export class TouristSearchService {

  private URL = "http://localhost:8080/travel_assistant/api/v1/";

  constructor(private httpClient: HttpClient) { }

  public planYourTour(travelSearchRequest: TravelSearchRequest): Observable<any> {
    return this.httpClient.post(this.URL + 'planYourTour/json', travelSearchRequest);
  }

  getCountriesAndCities(): Observable<Map<string, string[]>> {
    return this.httpClient.get<Map<string, string[]>>(`${this.URL}/getCountriesAndCities`);
  }

}
