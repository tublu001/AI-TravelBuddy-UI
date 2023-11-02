import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './user-dashboard/dashboard.component';
import { AuthGuard } from 'src/services/auth-guard-service';
import { AuthService } from 'src/services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { StepperComponentComponent } from './stepper/stepper-component/stepper-component.component';
import { SingleFormComponent } from './single-form/single-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    SingleFormComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    StepperComponentComponent,
    TourDashboardComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    CdkStepperModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    FormsModule
    // NgbModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
