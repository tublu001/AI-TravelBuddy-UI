export class ClimatePrediction {
    temperature: string;
    weather: string;
}

export class CustomerReview {
    name: string;
    review: string;
    rating: string;
}

export class Event {
    event: string;
    timeline: string;
}

export class LocationDetails {
    country: string;
    state: string;
    city: string;
    zipcode: string;
}

export class ResidenceDetail {
    name: string;
    plans: string[];
    address: string;
}

export class TransportationDetail {
    mode: string;
    duration: string;
    distance: string;
    cost: string;
}

export class TravelAgent {
    name: string;
    contactNo: string;
    website: string;
    emailId: string;
    address: string;
}

export class TouristPlace {
    place: string;
    currency: string;
    category: string;
    description: string;
    transportationDetails: TransportationDetail[];
    climatePrediction: ClimatePrediction;
    famousFoods: string[];
    events: Event[];
    customerReviews: CustomerReview[];
    residenceDetails: ResidenceDetail[];
    travelAgents: TravelAgent[];
    locationDetails: LocationDetails;
    totalDistance: string;
    imageUrls: string[];
}

export class TouristPlaces{
    touristPlaces: TouristPlace[];
}

export class TravelSearchRequest {
    destinationCity: string;
    destinationCountry: string;
    sourceCity: string;
    sourceCountry: string;
    userPreferences: string;
    includeImages: string;
    noOfObjects: string;
  }
  