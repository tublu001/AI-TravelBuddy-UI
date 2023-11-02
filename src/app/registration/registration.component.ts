import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../services/ConfirmedValidator';
import { NotificationService } from 'src/services/notification.service';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import Customer from 'src/models/customerModel';
import User from 'src/models/customerModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  regDetails?: User;
  title = 'Register to PayByLink';
  angForm: FormGroup;
  phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
  panNumber = "^[A-Za-z]{5}[0-9]{4}[A-Za-z]$";
  emailId = "[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*";
  mobileNumber = "[0-9 -()+]+$";
  isMobileExists = false;

  constructor(private fb: FormBuilder, private notificationService: NotificationService, private dataService: DataService, private routeService: Router) {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      panNumber: ['', [Validators.required, Validators.pattern(this.panNumber),
      Validators.minLength(10), Validators.maxLength(10)]],
      bankAccountNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  get f() {
    return this.angForm.controls;
  }

  onKeypressEvent(event: any) {
    const pattern = /^[0-9]{10}$/;
    if(pattern.test(event.target.value)){
      this.dataService.getCustomerByMobileNo(event.target.value).subscribe((res) => {
        let value = res as number;
        if (value === 1) {
          this.isMobileExists = true;
        }
      }, (error) => {
          console.error(error);
      });
    }else{
      this.isMobileExists = false;
    }
  }

  onSubmit() {
    this.regDetails = new Customer();
    console.log(JSON.stringify(this.regDetails));
    this.dataService.createCustomer(this.regDetails).subscribe((response) => {
      this.notificationService.showSuccess("Yahoo :)", "Registered Successfully!!");
    }, (error) => {
      this.notificationService.showWarning("Please try after sometime :(", "Registered Failed!!");
    })
    this.routeService.navigate(['/', 'login']);
    this.angForm.reset();
  }
}
