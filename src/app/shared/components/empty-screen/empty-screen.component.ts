import { Model } from './../../models/model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})

export class EmptyScreenComponent implements OnInit {

  @Input() model : Model | undefined;
  @Output() retry: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  retryButton() {
    this.retry.emit(true);
  }

  ngOnInit() {}

}
