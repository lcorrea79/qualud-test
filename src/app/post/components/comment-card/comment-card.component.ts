import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Comment, Maybe } from 'src/app/graphql/generated';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent  implements OnInit {

  @Input() commentInfo!: Maybe<Comment> | undefined;
  @Input() canDelete: boolean = false;

  constructor(private postService: PostService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    
  }

  async presentAlert() {
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

    await alert.present();
  }

  deleteComment(){
    this.postService.deleteComment( {clientMutationId:"trs12", id: 5}).subscribe(
      data => {
        
      }
    )
  }
}
