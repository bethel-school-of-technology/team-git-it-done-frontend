import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  // userName: string = '';

  fullName: string = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
  // this.userName = localStorage.getItem('userName') || '';
  this.fullName = localStorage.getItem('fullName') || '';
  
  }

  logout() {
    this.userService.logout();
  }

}
