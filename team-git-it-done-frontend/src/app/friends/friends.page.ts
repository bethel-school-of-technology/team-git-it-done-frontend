import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
  standalone: false,
})
export class FriendsPage implements OnInit {
  constructor() {}

  friendsList: { mockUserName: string; pfp: string }[] = [];

  ngOnInit() {
    this.friendsList = [
      {
        mockUserName: 'Aden Clay',
        pfp: 'https://c.pxhere.com/photos/da/49/face_facial_hair_fine_looking_guy_man_model_person_portrait-1563283.jpg!d',
      },
      {
        mockUserName: 'Allen Mace',
        pfp: 'https://th.bing.com/th/id/OIP.h0hPZzAziPf3v-srHQTdWQHaHa?rs=1&pid=ImgDetMain',
      },

      {
        mockUserName: 'Ivory Holt',
        pfp: 'https://img.freepik.com/premium-photo/photo-beauty-woman-face-generator-by-ai_911060-37619.jpg',
      },
      {
        mockUserName: 'Dillen May',
        pfp: 'https://th.bing.com/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?rs=1&pid=ImgDetMain',
      },
      {
        mockUserName: 'Emma Cane',
        pfp: 'https://th.bing.com/th/id/OIP.vCBerFCQkLoCZDOxVlvBigHaE8?rs=1&pid=ImgDetMain',
      },

      {
        mockUserName: 'Iris Layne',
        pfp: 'https://i1.rgstatic.net/ii/profile.image/910901964181507-1594187360802_Q512/Parisa-Asghari.jpg',
      },
    ];
  }
}
