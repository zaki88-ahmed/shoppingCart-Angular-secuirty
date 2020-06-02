import { auth } from 'firebase/app';
import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthService, private userSvr: UserService){}

  canActivate()
  {
    
    return this.auth.getApp.pipe(map(appuser=> appuser.isAdmin));
    
  }
  //check if user exist, is admin and is at which level of administration
  //current user: AuthService
  //then switch the object to AuthServices ?? get user by id ?
  //you can check if user is admin or not
}
