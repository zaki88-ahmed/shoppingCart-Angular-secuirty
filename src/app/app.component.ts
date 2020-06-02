import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';


  constructor(private userService: UserService, public auth: AuthService, private route: ActivatedRoute, private router: Router)
  {

    this.auth.user$.subscribe(user =>
      {

        this.userService.save(user);

        if(user)
        {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigateByUrl(returnUrl);
          console.log(returnUrl);

        }
      })

  }
}
