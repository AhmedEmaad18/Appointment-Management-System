import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentService } from '../../../Services/appointment.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  appointments$: Observable<any[]> | undefined;
  email: string | null = null;

  constructor(private appointmentService: AppointmentService,private auth: Auth) {}

  ngOnInit(): void {

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.loadAppointments();
      }
    });
  }

  loadAppointments() {
    if (this.email) {
      this.appointments$ = this.appointmentService.getAppointmentsByEmail(this.email);
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
      alert('Appointment updated successfully!');
        this.loadAppointments();
      })
      .catch(error => {
        console.error('Error updating appointment:', error);
      });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id)
      .then(() => {
        alert('Appointment deleted successfully!');
        this.loadAppointments(); 
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
      });
  }
}
