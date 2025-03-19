import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../Services/appointment.service';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-doctor-appointment',
  standalone: false,
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent implements OnInit {
appointments$: Observable<any[]> | undefined;
  email: string | null = null; 
  username: string | null = null;
  constructor(private appointmentService: AppointmentService,private auth: Auth,private authh:AuthService) {}

  ngOnInit(): void {

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.loadUsername();
        this.loadAppointments();
      }
    });
  }
  async loadUsername() {
    if (this.email) {
      this.username = await this.authh.getUsernameByEmail(this.email);
      this.appointments$ = this.appointmentService.getAppointmentsByUsername(this.username);
      this.appointments$.subscribe(appointments => {
        console.log(appointments);
      });
    }
  }
  loadAppointments() {
    if (this.email) {
      this.appointments$ = this.appointmentService.getAppointmentsByUsername(this.email);
      this.appointments$.subscribe(appointments => {
        console.log(appointments);
      });
    } else {
      console.error('Email is not set. Cannot load appointments.');
    }
  }

  saveAppointment(appointment: any) {
    const updatedData = {
      date: appointment.date,
      time: appointment.time,
    };
    this.appointmentService.editAppointment(appointment.id, updatedData)
      .then(() => {
        console.log('Appointment updated successfully!');
        this.loadAppointments();
      })
      .catch(error => {
        console.error('Error updating appointment:', error);
      });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id)
      .then(() => {
        console.log('Appointment deleted successfully!');
        this.loadAppointments();
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
      });
  }

}
