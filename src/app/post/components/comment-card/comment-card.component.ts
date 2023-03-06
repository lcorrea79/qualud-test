import { Component, OnInit, Input } from '@angular/core';
import { Maybe } from 'src/app/graphql/generated';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent  implements OnInit {

  @Input() commentInfo!: any;
  constructor() { }

  ngOnInit() {}

}
