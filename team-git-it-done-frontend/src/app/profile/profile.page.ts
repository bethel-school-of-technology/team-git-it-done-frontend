import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  userName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
   
    // this.userService.getUserDetails().subscribe((user) => {
    //   this.userName = user.firstName; 
    // });
  }

}
