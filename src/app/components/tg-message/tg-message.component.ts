import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tg-message',
  templateUrl: './tg-message.component.html',
  styleUrls: ['./tg-message.component.css']
})
export class TgMessageComponent {
  @Input()
  author: string = 'author';

  @Input()
  message: string = 'Your message here...';

  @Input()
  login: string = 'username';
}
