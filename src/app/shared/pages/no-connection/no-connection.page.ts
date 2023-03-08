import { Component, OnInit } from '@angular/core';

import { Model } from '../../models/model';

@Component({
  selector: 'app-no-connection',
  templateUrl: './no-connection.page.html',
  styleUrls: ['./no-connection.page.scss'],
})
export class NoConnectionPage implements OnInit {

  model : Model | undefined;

  constructor() { 
    
  }

  ngOnInit() {
    this.model = { 
      background: 'assets/imgs/12.png', 
      title: 'No Connection', 
      subtitle: 'Your internet connection was', 
      description: "interrupted.", 
      titleColor: 'dark', 
      color: 'medium', 
      button: 'RETRY', 
      buttonColor: 'dark' ,
      centerAlign: ''
    };


  }

}
