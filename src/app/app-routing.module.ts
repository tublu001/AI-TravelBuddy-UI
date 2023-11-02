import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './user-dashboard/dashboard.component';
import { AuthGuard } from 'src/services/auth-guard-service';
import { SingleFormComponent } from './single-form/single-form.component';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';

const routes: Routes = [{
  path: 'registration', component: SingleFormComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
}
  ,
{
  path: 'tourDashBoard', component: TourDashboardComponent, canActivate: [AuthGuard]
},
{
  path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
