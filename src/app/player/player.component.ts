import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AudioService } from '../services/audio.service';
import { Loop, loopDefulat } from '../services/data.service';
import { LocalStorageService } from '../services/local-storage.service';

const local_torage = 'local_torage';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Output() showshow = new EventEmitter();

  timer: any = 0;
  btnClass = {};

  loopList = [Loop.List, Loop.Single];
  loop: Loop = loopDefulat;
  lrc: any[] = [];

  @ViewChild('res', { static: false }) res: any;
  dialoggg = false;
  isPalying = false;

  blockckckc = false;
  list = ['btn-order-list', 'btn-order-random', 'btn-order-single'];
  constructor(
    private localStorageService: LocalStorageService,
    private audio: AudioService,
    private ele: ElementRef
  ) {
    this.loop = this.localStorageService.data.loop;
    this.audio.loop = this.loop;
    this.audio.index$.subscribe((index) => {
      this.isPalying = index >= 0;
    });

    let input: HTMLInputElement;
    let aaa: HTMLLabelElement;
    let bbb: HTMLLabelElement;

    this.audio.progress$.subscribe((res) => {
      if (!input) {
        input = this.ele.nativeElement.querySelector('.ddddd');
        aaa = this.ele.nativeElement.querySelector('.aaa');
        bbb = this.ele.nativeElement.querySelector('.bbb');
      }

      if (aaa) {
        aaa.innerHTML = res.currentTime;
        bbb.innerHTML = res.totalTime;
      }

      if (this.blockckckc) {
        return;
      }

      if (input && res.value) {
        input.value = String(res.value);
      }
    });
  }

  onmousedown(e: Event) {
    this.blockckckc = true;
  }
  onmouseout(e: Event) {
    this.blockckckc = false;
  }

  getFormatTimeBySecend(time: any) {
    var _time = parseInt(time);
    var hours = Math.floor(_time / 3600);
    var minutes = Math.floor((_time - hours * 3600) / 60);
    var seconds = _time - hours * 3600 - minutes * 60;
    return (
      (hours > 0 ? hours + ':' : '') +
      (minutes <= 9 ? '' : '') +
      minutes +
      ':' +
      (seconds <= 9 ? '0' : '') +
      seconds
    );
  }

  switch() {
    let index = this.loopList.findIndex((neee) => neee === this.loop);
    index += 1;

    if (index > this.loopList.length - 1) {
      index = 0;
    }
    this.loop = this.loopList[index];
    this.audio.loop = this.loop;
    this.localStorageService.save({ loop: this.loop });
  }

  next(i: number) {
    if (i) {
      this.audio.next();
    } else {
      this.audio.prev();
    }
  }

  ok() {
    this.isPalying = !this.isPalying;
    if (this.isPalying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  fde = false;
  long() {
    this.fde = !this.fde;
  }

  gottt(e: Event) {
    console.log(e);
  }

  fdasfa(e: HTMLInputElement | any) {
    this.isPalying = true;
    this.audio.gotobytimeline(parseFloat(e.value));
  }

  closeDialoggg() {
    this.dialoggg = !this.dialoggg;
    this.showshow.next(this.dialoggg);
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
}
