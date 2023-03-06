import { User } from './../../../graphql/generated';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent  implements OnInit {

  @Input() userInfo! : User;

  constructor() { }

  ngOnInit() {}

}
