
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: any;
  
  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {}

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

}
