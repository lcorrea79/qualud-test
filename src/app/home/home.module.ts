import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
