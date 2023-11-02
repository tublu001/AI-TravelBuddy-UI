import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Customer from 'src/models/customerModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = "http://localhost:8080/travel_assistant/users/";


  constructor(private httpClient: HttpClient) { }

  public loggedInCustomer?: Customer;

  public getLoginCustomer() {
    return this.loggedInCustomer;
  }

  public setLoginCustomer(Customer: Customer) {
    this.loggedInCustomer = Customer;
  }

  public createCustomer(Customer: Customer) {
    return this.httpClient.post(this.URL + 'createUser', Customer);
  }

  public loginCustomer(Customer: Customer) {
    return this.httpClient.post(this.URL + "login", Customer);
  }

  public getCustomer(CustomerId: string) {
    return this.httpClient.get(this.URL + `{CustomerId}`);
  }

  public getCustomerByMobileNo(mobileNumber: number) {
    return this.httpClient.get(this.URL + "getUserByMobileNumber/"+ mobileNumber);
  }
}
