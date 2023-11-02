import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faUser,
  faAddressBook,
  faCreditCard,
  faChevronLeft,
  faChevronRight,
  faSave,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import Customer from 'src/models/customerModel';

import { DataService } from 'src/services/data.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css'],
})
export class SingleFormComponent implements OnInit {
  @Input()
  isLinear = true;

  @Input()
  isEditable = true;

  frmValues: object = {};

  faPerson = faUser;
  faAddressBook = faAddressBook;
  faCreditCard = faCreditCard;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSave = faSave;
  title = 'Register to PayByLink';

  faBan = faBan;

  frmStepper: FormGroup;

  get formArray(): AbstractControl {
    return this.frmStepper.get('steps') as any;
  }

  constructor(private fb: FormBuilder, private notificationService: NotificationService, private dataService: DataService, private routeService: Router) { }
  regDetails?: Customer;


  ngOnInit(): void {
    this.frmStepper = this.fb.group({
      steps: this.fb.array([
        this.fb.group({
          firstName: ['', Validators.compose([Validators.required])],
          lastName: ['', Validators.compose([Validators.required])],
          mobileNumber: ['', [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]], // optional
          emailId: [
            '',
            Validators.compose([Validators.required, Validators.email]),
          ],
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        }),
        this.fb.group({
          addressOne: [null, Validators.compose([Validators.required])],
          addressTwo: [null], // optional
          city: [null, Validators.compose([Validators.required])],
          state: [null, Validators.compose([Validators.required])],
          country: [null, Validators.compose([Validators.required])],
        }),
        this.fb.group({
          creditCardNo: [
            '',
            [Validators.compose([Validators.required]), Validators.pattern('^[0-9]{16}$')],
          ],
          expiryDate: ['', [Validators.compose([Validators.required]), Validators.pattern('(0[1-9]|1[0-2])/(\\d{2})')]],
          // cvvCode: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
        }),
      ]),
    });
  }

  submit(): void {
    console.log(this.frmStepper.value);
    this.frmValues = this.frmStepper.value;
  }

  onSubmit() {
    const customer = this.mapFormGroupToCustomer(this.frmStepper);
    console.log(customer);

    this.dataService.createCustomer(customer).subscribe((response) => {
      this.notificationService.showSuccess("Yahoo :)", "Registered Successfully!!");
    }, (error) => {
      this.notificationService.showWarning("Please try after sometime :(", "Registered Failed!!");
    })
    this.routeService.navigate(['/', 'login']);
    this.frmStepper.reset();
  }

  mapFormGroupToCustomer(form: FormGroup): Customer {
    const customer = new Customer();
    const stepsArray = form.get('steps') as FormArray;

    if (stepsArray && stepsArray.length >= 3) {
      const personalInfoGroup = stepsArray.at(0) as FormGroup;
      const addressGroup = stepsArray.at(1) as FormGroup;
      const paymentInfoGroup = stepsArray.at(2) as FormGroup;

      customer.firstName = personalInfoGroup.get('firstName')?.value;
      customer.lastName = personalInfoGroup.get('lastName')?.value;
      customer.emailId = personalInfoGroup.get('emailId')?.value;
      customer.mobileNumber = personalInfoGroup.get('mobileNumber')?.value;
      // customer.password = btoa(personalInfoGroup.get('password')?.value);
      customer.password = personalInfoGroup.get('password')?.value;
      customer.addressLine1 = addressGroup.get('addressOne')?.value;
      customer.addressLine2 = addressGroup.get('addressTwo')?.value;
      customer.city = addressGroup.get('city')?.value;
      customer.state = addressGroup.get('state')?.value;
      customer.country = addressGroup.get('country')?.value;

      customer.creditCardNo = this.maskCreditCard(paymentInfoGroup.get('creditCardNo')?.value);
      customer.expiryDate = paymentInfoGroup.get('expiryDate')?.value;
      customer.cvvCode = paymentInfoGroup.get('cvvCode')?.value;
    }

    return customer;
  }

  maskCreditCard(creditCardNumber: string): string {
    // Determine how many digits to mask (e.g., keep the first 4 and mask the rest)
    const visibleDigits = 4; // Number of visible digits at the beginning
    const maskedCharacter = '*'; // Character used for masking
    const maskedDigits = creditCardNumber.length - visibleDigits;

    // Create the masked credit card number
    const maskedPart = maskedCharacter.repeat(maskedDigits);
    const visiblePart = creditCardNumber.slice(0, visibleDigits);

    // Combine the visible and masked parts
    const maskedCreditCard = `${visiblePart}${maskedPart}`;

    return maskedCreditCard;
  }
}
