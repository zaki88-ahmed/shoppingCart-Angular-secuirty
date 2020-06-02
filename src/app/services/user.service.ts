import { UserInfo } from './models/userInfo';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private db: AngularFireDatabase) {}
  
 

  save(user: firebase.User)
  {
    this.db.object('/users/' + user.uid).update(           /*users is a collection */            
      {
        name: user.displayName,
        email: user.email
      }
    )
  }

  getUserById(uid: string)
  {
    return this.db.object('/users/' + uid);
  }


 
}
