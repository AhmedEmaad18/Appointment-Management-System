import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, collection, addDoc, where, query, getDocs } from '@angular/fire/firestore';
import { doc, getDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) { }

  async register(email: string, password: string,username:string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    // Add user to Firestore with a default role
    const userRef = collection(this.firestore, 'users');
    await addDoc(userRef, {
      uid: user.uid,
      email: user.email,
      username:username,
      role: 'patient' 
    });

    return user;
  }
  getUserRoleByEmail(email: string): Observable<string | null> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return null;
        } else {
          const userDoc = snapshot.docs[0].data();
          return userDoc['role'];
        }
      })
    );
  }
  async getUsernameByEmail(email: string): Promise<string > {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.error('No matching documents found.');
      return 'null';
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data() as User;
    return userData.username;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  getCurrentUserEmail(): string | null {
    const user = this.auth.currentUser ;
    return user ? user.email : null;
  }

  getDoctorsByRole(role: string): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('role', '==', role));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      })
    );
  }
  isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(user => {
        observer.next(!!user);
      });
    });
  }

  logout(): void {
    this.auth.signOut();
  }
}
