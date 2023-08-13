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
  content: string = 'Your message here...';

  @Input()
  login: string = 'username';

  @Input()
  date: string = '01/01/1990';

  @Input()
  time: string = '00:00';

  @Input()
  bgColor: string = 'blue';

  @Input()
  titleColor: string = 'blue';

  @Input()
  alignment: 'right' | 'left' = 'left';

  alignClass = (this.alignment == 'left') ? 'flex-row': 'flex-row-reverse';
}
