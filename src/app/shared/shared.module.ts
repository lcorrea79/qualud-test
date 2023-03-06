import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { FilterAuthorPipe } from './pipes/filter-author.pipe';



@NgModule({
  declarations: [HeaderComponent, FilterAuthorPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports:[HeaderComponent, FilterAuthorPipe]
})
export class SharedModule { }
