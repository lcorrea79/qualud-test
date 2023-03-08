import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Post } from 'src/app/graphql/generated';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent  implements OnInit {

  @Input() postInfo!: Post;
  @Input() canDelete: boolean = false;
  @Output() onDeleted: EventEmitter<number> = new EventEmitter<number>();
  user_id: number = -1;

  constructor(private alertCtrl: AlertController) { 
    this.user_id = Number(localStorage.getItem("user_id"));
  }

  ngOnInit() {}

  

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Are you sure delete this Post?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.onDeleted.emit(-1)
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            
            this.onDeleted.emit(this.postInfo.id);
          },
        },
      ],
    });

    Haptics.vibrate();
    await alert.present();
  }

}
