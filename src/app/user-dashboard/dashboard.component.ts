import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth-service';
import { Observable } from 'rxjs';
import User from 'src/models/registration-details';
import { DataService } from 'src/services/data.service';
import Customer from 'src/models/customerModel';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isLoggedIn$?: Observable<boolean>;
  user?: Customer;

  constructor(private authService: AuthService, private dataService: DataService) {
    let userJson = localStorage.getItem('user');
    if(userJson !== null){
      this.user = JSON.parse(userJson);
    }else if(this.dataService.loggedInCustomer){
      this.user = this.dataService.loggedInCustomer;
    }
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();                      // {3}
  }
}
