// user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async getUsers(): Promise<User[]> {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
  }

  async updateUser (user: User): Promise<void> {
    const userDoc = doc(this.firestore, 'users', user.id);
    await updateDoc(userDoc, {
      email: user.email,
      username: user.username,
      role: user.role
    });
  }

  async deleteUser (id: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', id);
    await deleteDoc(userDoc);
  }
}
