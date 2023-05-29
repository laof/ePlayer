import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  btnClass = {};
  index = 0;
  yyyy = false;
  list = ['btn-order-list', 'btn-order-random', 'btn-order-single'];
  constructor() {
    this.btnClass = { [this.list[this.index]]: true };
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
  }

  fde = false;
  long() {
    this.fde = !this.fde;
  }
}
