import { AuthService } from './core/services/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/dashboard', icon: 'home' },
    { title: 'Users', url: '/user-list', icon: 'people' },
    { title: 'Posts', url: '/post', icon: 'reader' },
    { title: 'ToDos', url: '/todo', icon: 'list' },
  ];
  public labels = [];

  networkListener: PluginListenerHandle | undefined;
  status: boolean = false;
  model = {};
  isConnected: boolean = true;

  darkMode: boolean = false;

  constructor(private router: Router,
              private menuCtrl: MenuController,
              private platform: Platform,
              private auth: AuthService
    
    ) {
   
    this.cambio();
    //this.networkSubscriber();
    this.initializeApp();
  }

  initializeApp() {
    this.networkListener = Network.addListener("networkStatusChange", (status) => {
   
    
  
    this.menuCtrl.enable(status.connected, 'primerMenu');
    
    if(status.connected == false){
      
        this.router.navigate(["/no-connection"]);
    } else {
        if (!this.isConnected)
          this.router.navigate(["/"]);
       this.isConnected = true;
    }

    this.isConnected = status.connected;
  });


  
}


logout(){
  this.auth.logout();
  window.location.reload();
  
}

cambio() {  
  /*this.darkMode = !this.darkMode;
  document.body.classList.toggle( 'dark' );    */
}

OnDestroy(){
    this.logout();
}

}
