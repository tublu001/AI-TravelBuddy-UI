import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { ConfirmedValidator } from '../../services/ConfirmedValidator';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/services/auth-service';
import { DataService } from 'src/services/data.service';
import Customer from 'src/models/customerModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'Login To PayByLink';
  angForm: FormGroup;
  isLoggedIn$?: Observable<boolean>;
  isMobileNotExists = false;
  regDetails?: Customer;
  isIncorrectPassword = false;

  constructor(private fb: FormBuilder, private notificationService: NotificationService, private routeService: Router, private authService: AuthService, private dataService: DataService) {
    this.angForm = this.fb.group({
      mobileNumber: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
    });

  }

  get f() {
    return this.angForm.controls;
  }

  onSubmit() {
    this.regDetails = new Customer();
    this.regDetails.mobileNumber = this.angForm.controls['mobileNumber'].value;
    this.regDetails.password = this.angForm.controls['password'].value;

    console.log(JSON.stringify(this.regDetails));
    this.dataService.loginCustomer(this.regDetails).subscribe(res => {
      this.authService.login(this.regDetails); // {2}
      let userData = res as Customer;
      this.dataService.setLoginCustomer(userData);
      localStorage.setItem('customer', JSON.stringify(userData));
      this.notificationService.showInfo("Success", "Login Successfully!!")
      this.angForm.reset();
      this.routeService.navigate(['/', 'tourDashBoard']);
    }, err => {
      console.log(JSON.stringify(err))

      this.isIncorrectPassword = true;

      this.notificationService.showWarning("Something went wrong!!", "Login Failed")
    });
  }

  onKeypressEvent(event: any) {
    const pattern = /^[0-9]{10}$/;
    if (pattern.test(event.target.value)) {
      this.dataService.getCustomerByMobileNo(event.target.value).subscribe((res) => {
        let value = res as number;

        if (value === 0) {
          this.isMobileNotExists = true;
        } else {
          this.isMobileNotExists = false;
        }
      }, (error) => {
        console.error(error);
      });
    } else {
      this.isMobileNotExists = false;
    }
  }


  onLogout() {
    this.authService.logout();                      // {3}
  }
}
