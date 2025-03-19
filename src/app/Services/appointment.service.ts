import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, collectionData, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private firestore: Firestore) {}

  createAppointment(appointmentData: { email: string; date: string; time: string ,username:string,role:string}) {
    const appointmentsRef = collection(this.firestore, 'appointments');
    return addDoc(appointmentsRef, appointmentData);
  }
 getAppointmentsByEmail(email: string): Observable<any[]> {
  const appointmentsRef = collection(this.firestore, 'appointments');
  const q = query(appointmentsRef, where('email', '==', email));

  return new Observable(observer => {
    getDocs(q).then(snapshot => {
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      observer.next(appointments);
      observer.complete();
    }).catch(error => {
      observer.error(error);
    });
  });
}
getAppointmentsByUsername(username: string): Observable<any[]> {
  const appointmentsRef = collection(this.firestore, 'appointments');
  const q = query(appointmentsRef, where('username', '==', username));

  return new Observable(observer => {
    getDocs(q).then(snapshot => {
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      observer.next(appointments);
      observer.complete();
    }).catch(error => {
      observer.error(error);
    });
  });
}

editAppointment(id: string, updatedData: any) {
  const appointmentDoc = doc(this.firestore, 'appointments', id);
  return updateDoc(appointmentDoc, updatedData);
}

deleteAppointment(id: string) {
  const appointmentDoc = doc(this.firestore, 'appointments', id);
  return deleteDoc(appointmentDoc);
}
async deleteUser (id: string) {
  const userDoc = doc(this.firestore, 'users', id);
  await deleteDoc(userDoc);
}

getAppointmentsByDoctorAndDate(doctorEmail: string, date: string): Observable<any[]> {
  const appointmentsRef = collection(this.firestore, 'appointments');
  const q = query(appointmentsRef, where('username', '==', doctorEmail), where('date', '==', date));

  return new Observable(observer => {
    getDocs(q).then(snapshot => {
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      observer.next(appointments);
      observer.complete();
    }).catch(error => {
      observer.error(error);
    });
  });
}
}
