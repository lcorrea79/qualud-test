import { User, Query } from './../../../graphql/generated';
import { UserService } from './../../../user/services/user.service';
import { map } from 'rxjs/operators';
import { Component, Input, OnInit, ViewChild, Pipe } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: any;
  users$: any;

  currentUser: any;
 // currentUserName: string = "Not Conected User";
  opcion: number = 0;
  colorUser: string = "danger";
  
  constructor(public menuCtrl: MenuController,
              private userService: UserService) { }

  ngOnInit() {
    this.currentUser = {id: Number(localStorage.getItem('id')), name: localStorage.getItem("user_name")!}
    
    this.users$ = this.userService.getAllUsers().valueChanges.pipe(
      map((result:any) => {          
        return result.data.users.nodes;
      })
    );

   
    this.colorUser = localStorage.getItem("user_id")=="0" || localStorage.getItem("user_id") == undefined?"danger":"primary";

    
  }



  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setUser(isOpen: boolean) {   
    localStorage.setItem("user_id", this.currentUser!.id.toString());
    localStorage.setItem("user_name",this.currentUser!.name);
    this.isModalOpen = isOpen;
    this.colorUser = this.currentUser!.id==0?"danger":"primary";
    window.location.reload();
  }


}
