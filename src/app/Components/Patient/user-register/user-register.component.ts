import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../Services/appointment.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  email: string = '';
  appointmentDate: string = '';
  appointmentTime: string = '';
  selectedDoctorEmail: string = '';
  doctors: any[] = [];
  minDate: string;

  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.auth.getDoctorsByRole('doctor').subscribe(doctors => {
      this.doctors = doctors;


    });
  }

  registerAppointment() {
    if (this.email && this.appointmentDate && this.appointmentTime && this.selectedDoctorEmail) {
      this.appointmentService.getAppointmentsByEmail(this.email).subscribe(existingAppointments => {
        const appointmentExists = existingAppointments.some(appointment =>
          appointment.date === this.appointmentDate && appointment.time === this.appointmentTime
        );

        if (appointmentExists) {
          alert('not user You already have an appointment at this time.');
          return;
        }

        this.appointmentService.getAppointmentsByDoctorAndDate(this.selectedDoctorEmail, this.appointmentDate).subscribe(doctorAppointments => {
          const doctorAppointmentExists = doctorAppointments.some(appointment =>
            appointment.time === this.appointmentTime
          );

          if (doctorAppointmentExists) {
            alert('The selected doctor is not available at this time.');
            return;
          }

          const appointmentData = {
            email: this.email,
            date: this.appointmentDate,
            time: this.appointmentTime,
            role: 'patient',
            username: this.selectedDoctorEmail
          };

          this.appointmentService.createAppointment(appointmentData)
            .then(() => {
              alert('Appointment registered successfully!');
              this.resetForm();
            })
            .catch((error: any) => {
              console.error('Error registering appointment:', error);
            });
        });
      });
    } else {
      console.error('Please fill in all fields.');
    }
  }

  resetForm() {
    this.email = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
    this.selectedDoctorEmail = ''; 
  }
}
