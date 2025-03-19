import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserRegisterComponent } from './Components/Patient/user-register/user-register.component';
import { AppointmentComponent } from './Components/Patient/appointment/appointment.component';
import { DoctorAppointmentComponent } from './Components/Doctor/doctor-appointment/doctor-appointment.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctor', component: DoctorAppointmentComponent },
  {path:'user-reg',component:UserRegisterComponent},
  {path:'user-Appointment',component:AppointmentComponent},
  {path:'admin',component:AdminDashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
