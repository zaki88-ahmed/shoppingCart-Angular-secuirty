import { UserService } from './user.service';
import { Injectable } from '@angular/core';


import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private auth: AngularFireAuth, private userService: UserService) 
  {
    this.user$ = this.auth.authState;
  }


  login()
  {
    
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  logout()
  {
    this.auth.signOut();
  }


  get getApp(): Observable<any>
  {
    return this.user$.pipe(switchMap(user=>
      {
        if(user)
        {
          return this.userService.getUserById(user.uid).valueChanges();
        }
        else
        {
          of(null);
        }
      }))
  }

}


