import { Component, ViewChild } from '@angular/core';
import { AudioService } from './services/audio.service';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(PlayerComponent) playerComponent!: PlayerComponent;

  title = 'music';
  constructor(private audio: AudioService) {}

  test(r: string) {}

  haha = false;
  fdfa(bb: boolean) {
    this.haha = !this.haha;
  }

  close() {
    this.playerComponent.closeDialoggg();
  }
}
