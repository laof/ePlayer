import { Component, ViewChild } from '@angular/core';
import { AudioService } from './services/audio.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(FooterComponent) footerComponent!: FooterComponent;

  title = 'music';
  constructor(private audio: AudioService) {}

  test(r: string) {}

  haha = false;
  fdfa(bb: boolean) {
    this.haha = !this.haha;
  }

  close() {
    this.footerComponent.closeDialoggg();
  }
}
