// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { faMapMarker, faCalendar, faStar, faUtensils, faPlane, faTrain } from '@fortawesome/free-solid-svg-icons';
// import { TouristPlace, TouristPlaces, TravelSearchRequest } from 'src/models/touristPlace';
// import { AuthService } from 'src/services/auth-service';
// import { NotificationService } from 'src/services/notification.service';
// import { TouristSearchService } from 'src/services/tourist-service.service';
// import { Observable, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-tour-dashboard',
//   templateUrl: './tour-dashboard.component.html',
//   styleUrls: ['./tour-dashboard.component.css']
// })
// export class TourDashboardComponent {

//   isLoading: boolean = false;
//   touristPlacesData: TouristPlaces;
//   touristPlace: TouristPlace;
//   isLoadingObserver$?: Observable<boolean>;
//   travelSearchRequest: TravelSearchRequest;
//   index: number;
//   size: number;
//   currentIndex: number = 0;

//   sourceOptions: any[] = [
//     { name: 'Ooty', value: 'ooty' },
//     { name: 'Vijayawada', value: 'vijayawada' },
//     { name: 'Hyderabad', value: 'hyderabad' }
//   ];
//   destinationOptions: any[] = [
//     { name: 'Ooty', value: 'ooty' },
//     { name: 'Vijayawada', value: 'vijayawada' },
//     { name: 'Hyderabad', value: 'hyderabad' }
//   ];

//   countryOptions: any[] = [
//     { name: 'United States', value: 'United States' },
//     { name: 'Canada', value: 'Canada' },
//     { name: 'United Kingdom', value: 'United Kingdom' },
//     { name: 'Germany', value: 'Germany' },
//     { name: 'France', value: 'France' },
//     { name: 'Australia', value: 'Australia' },
//     { name: 'Japan', value: 'Japan' },
//     { name: 'Brazil', value: 'Brazil' },
//     { name: 'India', value: 'india' },
//     { name: 'South Africa', value: 'South Africa' }
//   ];

//   searchForm: FormGroup;
//   myForm: FormGroup;


//   selectedSourceCountry: string | null = null;
//   selectedSourceCity: string | null = null;
//   selectedDestinationCountry: string | null = null;
//   selectedDestinationCity: string | null = null;

//   // Set your polling interval here (e.g., 5 seconds)
//   private dataSubscription: Subscription;

//   constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: NotificationService, private touristSearchService: TouristSearchService, private routeService: Router) {

//     this.myForm = this.fb.group({
//       searchInput: [''],
//       sourceCountryDropdown: [''],
//       sourceCityDropdown: [''],
//       destinationCountryDropdown: [''],
//       destinationCityDropdown: ['']
//     });
//     // Fetch dynamic data for dropdowns
//     this.countryOptions = this.countryOptions;
//     this.sourceOptions = this.sourceOptions;
//     this.destinationOptions = this.destinationOptions;
//   }

//   selectSourceCountry(option: any) {
//     const sourceCountryControl = this.myForm.get('sourceCountryDropdown');
//     this.selectedSourceCountry = option.name;
//     if (sourceCountryControl) {
//       sourceCountryControl.setValue(option.name); // Update the form control's value
//     }
//   }

//   selectDestinationCountry(option: any) {
//     const sourceCountryControl = this.myForm.get('destinationCountryDropdown');
//     this.selectedDestinationCountry = option.name;
//     if (sourceCountryControl) {
//       sourceCountryControl.setValue(option.name); // Update the form control's value
//     }
//   }

//   selectSourceCity(option: any) {
//     const sourceCountryControl = this.myForm.get('sourceCityDropdown');
//     this.selectedSourceCity = option.name;
//     if (sourceCountryControl) {
//       sourceCountryControl.setValue(option.name); // Update the form control's value
//     }
//   }

//   selectDestinationCity(option: any) {
//     const sourceCountryControl = this.myForm.get('destinationCityDropdown');
//     this.selectedDestinationCity = option.name;
//     if (sourceCountryControl) {
//       sourceCountryControl.setValue(option.name); // Update the form control's value
//     }
//   }
  
//   search() {
//     this.isLoading = true;
//     const formValues = this.myForm.value;
//     console.log('Search Form Values:', formValues);

//     this.travelSearchRequest = new TravelSearchRequest();
//     this.travelSearchRequest.sourceCity = formValues.sourceCityDropdown;
//     this.travelSearchRequest.sourceCountry = formValues.sourceCountryDropdown;
//     this.travelSearchRequest.destinationCity = formValues.destinationCityDropdown;
//     this.travelSearchRequest.destinationCountry = formValues.destinationCountryDropdown;
//     this.travelSearchRequest.includeImages = "false";

//     this.getPostData(this.travelSearchRequest);
//   }

//   getPostData(postData: TravelSearchRequest) {
//     console.log("postdata" + JSON.stringify(postData));
//     this.dataSubscription = this.touristSearchService.planYourTour(postData).subscribe({
//       next: (data) => {
//         // Handle the data from the API response
//         if (data) {
//           this.touristPlacesData = data;
//           this.isLoading = false;
//         }
//       },
//       error: (error) => {
//         // Handle errors
//         console.error('Error:', error);
//         this.isLoading = false;
//         this.isLoading = false;
//         this.notificationService.showWarning("Something went wrong!!", "Try after sometime")
//       },
//     });
//   }
//   ngOnDestroy(): void {
//     if (this.dataSubscription) {
//       this.dataSubscription.unsubscribe();
//     }
//   }

//   prevPlace() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//     }
//   }

//   nextPlace() {
//     if (this.currentIndex < this.touristPlacesData.touristPlaces.length - 1) {
//       this.currentIndex++;
//     }
//   }

//   onLogout() {
//     this.authService.logout();                      // {3}
//   }
// }
