import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/dashboard', icon: 'home' },
    { title: 'Users', url: '/user-list', icon: 'people' },
    { title: 'Posts', url: '/post-list', icon: 'reader' },
    { title: 'ToDos', url: '/todo-list', icon: 'list' },
   /* { title: 'Settings', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },*/
  ];
  public labels = [];
  constructor() {}
}
