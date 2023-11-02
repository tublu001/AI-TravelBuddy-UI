import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faMapMarker,
  faCalendar,
  faStar,
  faUtensils,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';
import {
  TouristPlace,
  TouristPlaces,
  TravelSearchRequest,
} from 'src/models/touristPlace';
import { AuthService } from 'src/services/auth-service';
import { NotificationService } from 'src/services/notification.service';
import { TouristSearchService } from 'src/services/tourist-service.service';
import { Observable, Subscription, of } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.css'],
})
export class TourDashboardComponent {
  isLoading: boolean = false;
  touristPlacesData: TouristPlaces;
  touristPlace: TouristPlace;
  isLoadingObserver$?: Observable<boolean>;
  travelSearchRequest: TravelSearchRequest;
  index: number;
  size: number;
  currentIndex: number = 0;

  selectedSourceCountry: string = '';
  selectedSourceCity: string = '';
  selectedDestinationCountry: string = '';
  selectedDestinationCity: string = '';

  countryOptions: string[] = [];
  cityOptions: string[] = [];
  debounceTime = 200;

  searchForm: FormGroup;
  myForm: FormGroup;
  countriesAndCities: Map<string, string[]>;

  private dataSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private touristSearchService: TouristSearchService,
    private routeService: Router
  ) {
    this.myForm = this.fb.group({
      searchInput: [''],
      sourceCountryDropdown: [''],
      sourceCityDropdown: [''],
      destinationCountryDropdown: [''],
      destinationCityDropdown: [''],
    });
  }

  ngOnInit(): void {
    this.dataSubscription = this.touristSearchService
      .getCountriesAndCities()
      .subscribe({
        next: (data) => {
          if (data) {
            this.countriesAndCities = data;
            console.log('Response IF:', this.countriesAndCities);
            if (this.countriesAndCities !== undefined && this.countriesAndCities instanceof Map) {

              let countries = this.getValueForKey("countries");
              let cities = this.getValueForKey("cities");

              if (countries !== undefined) {
                this.countryOptions = countries;
              }

              if (cities !== undefined) {
                this.cityOptions = cities;
              }
              console.log('Country Options:', this.countryOptions);
              console.log('City Options:', this.cityOptions);
            }
          } else {
            console.log('Response Else:', this.countryOptions);
          }
        },
        error: (error) => {
          // Handle errors
          console.error('Error:', error);
          this.notificationService.showWarning(
            'Something went wrong!!',
            'Try after sometime'
          );
        },
      });
  }

 // Function to retrieve the value for a specific key
 getValueForKey(key: string): string[] | undefined {
  if (this.countriesAndCities && this.countriesAndCities.has(key)) {
    return this.countriesAndCities.get(key);
  }
  return undefined; // Key not found
}

  // Function to filter autocomplete options
  filterOptions = (term: string, options: string[]): string[] => {
    return options.filter((option) =>
      option.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Typeahead function for Source Country
  searchSourceCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map((term) => this.filterOptions(term, this.countryOptions))
    );

  // Typeahead function for Source City
  searchSourceCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map((term) => this.filterOptions(term, this.cityOptions))
    );

  // Typeahead function for Destination Country
  searchDestinationCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map((term) => this.filterOptions(term, this.countryOptions))
    );

  // Typeahead function for Destination City
  searchDestinationCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map((term) => this.filterOptions(term, this.cityOptions))
    );

  // Function to handle selection events
  selectSourceCountry(event: NgbTypeaheadSelectItemEvent): void {
    this.selectedSourceCountry = event.item;
  }

  selectSourceCity(event: NgbTypeaheadSelectItemEvent): void {
    this.selectedSourceCity = event.item;
  }

  selectDestinationCountry(event: NgbTypeaheadSelectItemEvent): void {
    this.selectedDestinationCountry = event.item;
  }

  selectDestinationCity(event: NgbTypeaheadSelectItemEvent): void {
    this.selectedDestinationCity = event.item;
  }

  search() {
    this.isLoading = true;
    const formValues = this.myForm.value;
    console.log('Search Form Values:', formValues);
    this.travelSearchRequest = new TravelSearchRequest();
    this.travelSearchRequest.sourceCity = this.selectedSourceCity;
    this.travelSearchRequest.sourceCountry = this.selectedSourceCountry;
    this.travelSearchRequest.destinationCity = this.selectedDestinationCity;
    this.travelSearchRequest.destinationCountry =
      this.selectedDestinationCountry;
    this.travelSearchRequest.includeImages = 'true';
    this.getPostData(this.travelSearchRequest);
  }

  getPostData(postData: TravelSearchRequest) {
    console.log('postdata' + JSON.stringify(postData));
    this.dataSubscription = this.touristSearchService
      .planYourTour(postData)
      .subscribe({
        next: (data) => {
          if (data) {
            this.touristPlacesData = data;
            this.isLoading = false;
            this.notificationService.showSuccess(
              'Your Travel Search Request, Completed Successfully!!',
              'Now you can Plan your Tour'
            );
          }
        },
        error: (error) => {
          // Handle errors
          console.error('Error:', error);
          this.isLoading = false;
          this.isLoading = false;
          this.notificationService.showWarning(
            'Something went wrong!!',
            'Try after sometime'
          );
        },
      });
  }

  prevPlace() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextPlace() {
    if (this.currentIndex < this.touristPlacesData.touristPlaces.length - 1) {
      this.currentIndex++;
    }
  }

  onLogout() {
    this.authService.logout(); // {3}
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
