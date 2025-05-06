import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,

})
export class ProfilePage implements OnInit {
  img: string = '';

  fullName: string = '';
  // Reference to the hidden file input element
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProData();
  }
  loadProData() {
    this.fullName = localStorage.getItem('fullName') || '';
    this.img =
      localStorage.getItem('img') ||
      'https://i.pinimg.com/originals/c0/9b/6d/c09b6d7edb7b4b89b382aa6ca0a761de.jpg';
  }

  onFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.img = reader.result as string; // update preview
      localStorage.setItem('img', this.img);
      this.UpdateProPic(); // to backened
    };

    reader.readAsDataURL(file);
  }
  UpdateProPic() {
    const userId = localStorage.getItem('userId');
    this.userService
      .UpdateProPic(Number(userId), this.img)
      .subscribe((response) => {
        this.img = response.img;
      });
  }


  triggerFileInput() {
    const fileInput = document.querySelector<HTMLInputElement>("#fileInput");
    if (fileInput) {
      fileInput.click();
    }

  avatarClick() {
    this.fileInput.nativeElement.click();
  }


   logout() {
      this.userService.logout();
  }

}
