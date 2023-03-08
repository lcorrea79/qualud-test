import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Comment, Maybe } from 'src/app/graphql/generated';
import { PostService } from '../../services/post.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent  implements OnInit {

  @Input() commentInfo!: Maybe<Comment> | undefined;
  @Input() canDelete: boolean = false;
  @Output() onDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private postService: PostService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Are you sure delete this Comment?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteComment();
          },
        },
      ],
    });

    Haptics.vibrate();
    await alert.present();
  }

  deleteComment(){
    this.onDeleted.emit(this.commentInfo?.id);
  }
}
