import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'martin-web';

  isSystemAdmin(){
    return false;
  }
  isAdmin(){
    return false;
  }
  isLoggedIn(){
    return false;
  }
  getUsername(){
    return 'Martin';
  }
  doLogout(){
    ;
  }
}
