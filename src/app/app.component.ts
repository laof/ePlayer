import { Component, ViewChild } from '@angular/core';
import { AudioService } from './services/audio.service';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  timer: any = 0;
  @ViewChild(PlayerComponent) playerComponent!: PlayerComponent;

  title = 'music';
  constructor(private audio: AudioService) {}

  test(r: string) {}

  haha = false;
  fdfa(bb: boolean) {
    this.haha = !this.haha;
  }

  testtime() {
    clearTimeout(this.timer);
    this.timer = 0;

    const fdafa = prompt('设置倒计时(h)');

    if (!fdafa) {
      return;
    }

    const h = parseFloat(fdafa);

    if (!h) {
      return;
    }

    const hhh = 1000 * 60 * 60 * h;

    this.timer = setTimeout(() => this.audio.pause(), hhh);
  }

  close() {
    this.playerComponent.closeDialoggg();
  }
}
