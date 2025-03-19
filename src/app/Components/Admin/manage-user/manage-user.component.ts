import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal
import { AppointmentService } from '../../../Services/appointment.service';
import { EditAppointmentComponent } from '../admin-dashboard/edit-appointment/edit-appointment.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-manage-user',
  standalone: false,
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.userService.getUsers();
  }

  editUser (user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: 'auto',
      height: 'auto',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser (result);
      }
    });
  }

  async updateUser (updatedUser:  User) {
    await this.userService.updateUser (updatedUser );
    this.loadUsers();
  }

  async deleteUser (id: string) {
    await this.userService.deleteUser (id);
    this.loadUsers();
  }
}
