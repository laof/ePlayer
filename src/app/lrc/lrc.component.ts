import { getCurrencySymbol } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter } from 'rxjs';
import { LRC } from '../services/data.service';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-lrc',
  templateUrl: './lrc.component.html',
  styleUrls: ['./lrc.component.scss'],
})
export class LrcComponent implements OnInit, OnDestroy {
  @ViewChild('ref', { static: true }) ref!: ElementRef;
  @ViewChild('txt', { static: true }) ul!: ElementRef;

  heightList: number[] = [];

  currindex = 0;

  list: LRC[] = [];
  show = false;
  ob;

  domHeight = 0;

  constructor(private d: AudioService) {
    this.d.lrc$.pipe(filter((res) => res.length > 0)).subscribe({
      next: (res) => {
        this.list = res.filter((ob, i) => i < 100);
        setTimeout(() => this.updateItemheight(), 1000);
      },
    });

    this.ob = new ResizeObserver(([entry]) => {
      this.caclHeight();
      this.updateItemheight();
    });

    this.d.timeline$.pipe(filter((i) => i > -1)).subscribe((index) => {
      const ulDom = this.ul.nativeElement;

      this.currindex = index;

      const d = this.heightList.filter((o, i) => i <= index);
      const top =
        d.reduce((prev, curren) => prev + curren, 0) -
        this.heightList[index] / 2;

      const total = this.domHeight / 2 - top;
      ulDom.style.marginTop = `${total}px`;
    });
  }

  updateItemheight() {
    const li: HTMLLIElement[] = Array.from(
      this.ul.nativeElement.querySelectorAll('li')
    );

    li.forEach((ele, i: number) => {
      const h = parseInt(getComputedStyle(ele).height);
      this.heightList[i] = h;
    });
  }

  ngOnDestroy(): void {
    if (this.ref && this.ref.nativeElement) {
      this.ob.unobserve(this.ref.nativeElement);
    }
  }

  caclHeight() {
    if (this.ref && this.ref.nativeElement) {
      const dom = this.ref.nativeElement;
      this.domHeight = parseInt(getComputedStyle(dom).height);
    }
  }

  ngOnInit(): void {
    if (!this.ref) {
      return;
    }

    this.caclHeight();
    const hei = this.domHeight / 2 + 'px';
    this.ul.nativeElement.style.marginTop = hei;
    // this.txt.nativeElement.style.marginBottom = hei;
    this.ob.observe(this.ref.nativeElement);
  }

  ddd() {
    this.show = true;
  }

  onmousedown(event: any) {
    this.show = true;
    const ulDom = this.ul.nativeElement;
    const ulHeight = parseInt(getComputedStyle(ulDom).height);
    var disX = event.clientX - ulDom.offsetLeft;
    var disY = event.clientY - ulDom.offsetTop;
    let l: number;
    let t: number;
    let marginTop = 0;
    document.onmousemove = (e) => {
      l = e.clientX - disX;
      t = e.clientY - disY;
      const midLine = this.domHeight / 2;

      const buttom = ~(ulHeight - midLine);

      if (t > midLine) {
        marginTop = midLine;
      } else if (t < buttom) {
        marginTop = buttom;
      } else {
        marginTop = t;
      }

      ulDom.style.marginTop = marginTop + 'px';
    };
    document.onmouseup = () => this.mouseup(marginTop);
  }

  mouseup(hei: number) {
    this.show = false;
    document.onmousemove = null;

    if (hei) {
    }
  }
}
