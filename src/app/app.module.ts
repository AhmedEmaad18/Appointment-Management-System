import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha'; 
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './Components/Patient/user-register/user-register.component';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { AppointmentComponent } from './Components/Patient/appointment/appointment.component';
import { DoctorAppointmentComponent } from './Components/Doctor/doctor-appointment/doctor-appointment.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { EditAppointmentComponent } from './Components/Admin/admin-dashboard/edit-appointment/edit-appointment.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './Components/nav/nav.component';
import { ManageUserComponent } from './Components/Admin/manage-user/manage-user.component';
import { EditUserComponent } from './Components/Admin/manage-user/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,UserRegisterComponent, AppointmentComponent, DoctorAppointmentComponent, AdminDashboardComponent,  EditAppointmentComponent, NavComponent, ManageUserComponent, EditUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,NgxCaptchaModule,CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,MatDialogModule ,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,MatIconModule

      ],
  providers: [
    provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())

  ],
  bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
