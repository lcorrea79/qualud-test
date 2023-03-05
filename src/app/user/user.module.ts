import { IonicModule } from '@ionic/angular';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListPage } from './pages/user-list/user-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { UserListPipe } from './pages/user-list.pipe';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [UserListPage,UserCardComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule, 
    IonicModule,
    SharedModule
  ]
})
export class UserModule { }
