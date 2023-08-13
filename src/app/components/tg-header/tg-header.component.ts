import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tg-header',
  templateUrl: './tg-header.component.html',
  styleUrls: ['./tg-header.component.css']
})
export class TgHeaderComponent {
  @Input() showMenuButton: boolean = false;
}
