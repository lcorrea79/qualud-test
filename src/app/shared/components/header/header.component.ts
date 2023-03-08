import { User } from './../../../graphql/generated';
import { UserService } from './../../../user/services/user.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: any;
  users$: User[] | undefined;

  currentUser: number = 0;
  opcion: number = 0;
  colorUser: string = "danger";
  
  constructor(public menuCtrl: MenuController,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users$ = data.nodes;
        this.colorUser = localStorage.getItem("user_id")=="0" || localStorage.getItem("user_id") == undefined?"danger":"primary";
      }
    );
  }

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setUser(isOpen: boolean) {
   
    localStorage.setItem("user_id", this.currentUser.toString());
    //localStorage.setItem("user_name",this.currentUser!.name);*/
    this.isModalOpen = isOpen;
    this.colorUser = this.currentUser==0?"danger":"primary";
  }


}
