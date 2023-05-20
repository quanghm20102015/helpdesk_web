import { Component } from '@angular/core';
import { UserInfoStorageService } from './service/user-info-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-mg';
  constructor(
    private userInfoStorageService: UserInfoStorageService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    if (!this.userId) {
      let url = window.location.pathname
      let arrLink = ['/login','/signup','/confirm-sigup','/reset-password','/set-new-password','/survey']
      if(!arrLink.includes(url)){
        this.router.navigate(['/login']);
      }
    }
  }
  userId: number = +this.userInfoStorageService.getIdUser()
}
