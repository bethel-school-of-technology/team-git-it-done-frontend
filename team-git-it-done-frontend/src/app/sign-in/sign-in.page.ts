import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false,
})
export class SignInPage implements OnInit {
  email: string = '';
  password: string = '';
  randomVerse: string = '';
 
  constructor(private userService: UserService, private router: Router) { }
 
  ngOnInit(): void {
    this.getBibleVerse();
  }
 
  signin(){
    this.userService.login(this.email, this.password).subscribe((response:any) => {
        this.router.navigateByUrl('/profile');
    }, error => {
        console.log('Error: ', error);
        window.alert('Unsuccessful Login');
        this.router.navigateByUrl('/sign-in');
    });
  }

  navigateToSignUp() {
    this.router.navigateByUrl('/sign-up');
    }

    getBibleVerse() {
      this.userService.getBibleVerse().subscribe((response) => {
        this.randomVerse = response;
      });
    }
}
