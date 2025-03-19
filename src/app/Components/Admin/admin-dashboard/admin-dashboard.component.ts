import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../Models/Appointment';
import { collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentService } from '../../../Services/appointment.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  appointments: Appointment[] = []; // Array to hold appointment data

  constructor(private firestore: Firestore,private dialog:MatDialog,private appointmentService:AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  async loadAppointments() {
    const appointmentsRef = collection(this.firestore, 'appointments');
    const snapshot = await getDocs(appointmentsRef);
    this.appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
  }
  editAppointment(appointment: Appointment) {
    const dialogRef = this.dialog.open(EditAppointmentComponent, {
      width: 'auto',
      height:'auto',
      data: appointment 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateAppointment(result);
      }
    });
  }

  async updateAppointment(updatedAppointment: Appointment) {
    if (!updatedAppointment.id) {
      console.error('Appointment ID is undefined');
      return;
    }

    const appointmentDoc = doc(this.firestore, 'appointments', updatedAppointment.id);
    await updateDoc(appointmentDoc, {
      date: updatedAppointment.date,
      time: updatedAppointment.time,
      email: updatedAppointment.email,
      username: updatedAppointment.username
    });
    this.loadAppointments();
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
