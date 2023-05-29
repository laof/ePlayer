import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  btnClass = {};
  index = 0;
  lrc: any[] = [];

  @ViewChild('res', { static: false }) res: any;

  yyyy = false;
  audio: HTMLAudioElement;
  list = ['btn-order-list', 'btn-order-random', 'btn-order-single'];
  constructor(private http: HttpClient) {
    this.btnClass = { [this.list[this.index]]: true };

    const audio = new Audio();
    audio.src = 'assets/mp3/test.mp3';
    audio.preload = 'auto';
    audio.controls = true;

    audio.ontimeupdate = () => this.ontimeupdate();

    this.audio = audio;

    this.http
      .get('assets/mp3/test.lrc', { responseType: 'text' })
      .subscribe((xxxxxx) => {
        this.lrc = xxxxxx
          .split('\r')
          .map((str) => {
            // "[00:00.266] today I'm going to talk to you about some"

            const eeee = str.split('] ');

            const time = eeee[0].split('[')[1];
            const txt = eeee[1];
            console.log(txt);

            const ssss = time.split(':');

            let xxix = parseInt(ssss[0]) * 60 + parseFloat(ssss[1]);

            if (xxix) {
              xxix = parseFloat(xxix.toFixed(4));
            }

            return {
              time: xxix,
              txt,
            };
          })
          .filter((o) => o.time);
        console.log(this.lrc);
        this.res = document.getElementById('dfdafa');
      });
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

  ontimeupdate() {
    const a = this.audio.currentTime;

    const cccc = this.lrc.find((obj, i) => {
      const next = this.lrc[i + 1];
      if (a >= obj.time && next && a < next.time) {
        return true;
      }
      return false;
    });

    if (cccc && cccc.txt) {
      this.res.innerHTML = cccc.txt;
    }
  }

  switch() {
    const next = ++this.index;

    if (next > this.list.length - 1) {
      this.index = 0;
    } else {
      this.index = next;
    }

    this.btnClass = { [this.list[this.index]]: true };
  }

  ok() {
    this.yyyy = !this.yyyy;
    if (this.yyyy) {
      this.audio.play();
      var alltime = this.audio.duration;
      const a = this.getFormatTimeBySecend(alltime);
    } else {
      this.audio.pause();
    }
  }

  fde = false;
  long() {
    this.fde = !this.fde;
  }
}
