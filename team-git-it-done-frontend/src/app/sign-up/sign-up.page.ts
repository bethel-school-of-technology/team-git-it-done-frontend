import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.userService.signUp(this.newUser).subscribe(() => {
        window.alert("User Registered Successfully");
        this.router.navigate(['signin']);
    }, error => {
        window.alert("User Registration Error");
        console.log('Error: ', error)
    });
  }

}
