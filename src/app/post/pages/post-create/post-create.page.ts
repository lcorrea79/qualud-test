import { AuthService } from 'src/app/core/services/auth.service';
import { CreatePostInput } from './../../../graphql/generated';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {

  spinner: boolean = false;
  constructor(private postService: PostService,
             private router: Router, private nav: NavController,
             private auth: AuthService,
             private toastController: ToastController)
   { }

  ngOnInit() {
  }

  async presentToast(text: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  createPost($event: CreatePostInput) {
    
    $event.userId = Number(this.auth.currentUserValue.id.toString());
    $event.clientMutationId = "abc1";
    this.spinner = true;
    console.log("CreatePostInput", $event);
    this.postService.createPost($event).subscribe(
      data => {
        console.log("Create POST OK");
        this.spinner = false;
        this.router.navigate(['/post'])
          .then(() => {
            window.location.reload();
          });
        
      }, error => {
        this.spinner = false;
        this.presentToast("An unexpected error has occurred, please try again later.", 'bottom');
        console.log(error);
      }
    )
  }
  
}
