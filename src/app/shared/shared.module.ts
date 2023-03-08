import { SharedRoutingModule } from './shred-routing.module';
import { NoConnectionPage } from './pages/no-connection/no-connection.page';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { FilterAuthorPipe } from './pipes/filter-author.pipe';
import { EmptyScreenComponent } from './components/empty-screen/empty-screen.component';



@NgModule({
  declarations: [HeaderComponent, FilterAuthorPipe, EmptyScreenComponent, NoConnectionPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SharedRoutingModule
  ],
  exports:[HeaderComponent, FilterAuthorPipe,EmptyScreenComponent, NoConnectionPage]
})
export class SharedModule { }
