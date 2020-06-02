import { Component, OnInit } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  login()
  {
    this.auth.login();
  }

}
