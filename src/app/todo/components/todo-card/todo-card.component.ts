import { UpdateTodoInput } from './../../../graphql/generated';
import { AlertController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Haptics } from '@capacitor/haptics';
import { Todo } from 'src/app/graphql/generated';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent  implements OnInit {
 
  @Input() todoInfo!: Todo;

  @Output() onDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() onStatusChange: EventEmitter<UpdateTodoInput> = new EventEmitter<UpdateTodoInput>();

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Are you sure delete this Todo?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.onDeleted.emit(-1)
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.onDeleted.emit(this.todoInfo.id);
          },
        },
      ],
    });

    Haptics.vibrate();
    await alert.present();
  }

updateStatus($event: any){
 
  this.onStatusChange.emit({ id: this.todoInfo.id, 
                             dueOn: this.todoInfo.dueOn,
                             title: this.todoInfo.title,
                             status: $event.detail.checked?'completed':'pending',
                            });
}

}
