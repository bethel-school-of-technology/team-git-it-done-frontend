import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { from, map, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private userService: UserService) { }

  showPrompt(title: string, message: string): Observable<string | null> {
    return from(Dialog.prompt({
      title,
      message
    })).pipe(
      map(result => result.value)
    );
  } 

  getUserIdFromEmail(title: string, message: string): Observable<number> {
    return from(Dialog.prompt({
      title,
      message
    })).pipe(
      mergeMap(result => {
        const email = result.value;
        if (!email) {
          throw new Error('No email entered');
        }
        try {
          return this.userService.getUserIdFromEmail(email);
        }
        catch (e) {
          alert('This email does not exist in our database');
          throw new Error('Failed to fetch user ID');
        }
        
      })
    );
  }



}
