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
import { add, subtract, multiply, divide } from 'mathjs';

@Component({
  selector: 'app-lrc',
  templateUrl: './lrc.component.html',
  styleUrls: ['./lrc.component.scss'],
})
export class LrcComponent implements OnInit, OnDestroy {
  @ViewChild('ref', { static: true }) ref!: ElementRef;
  @ViewChild('ul', { static: true }) ul!: ElementRef;
  @ViewChild('line', { static: true }) line!: ElementRef;

  name = '';

  heightList: number[] = [];

  currindex = 0;

  list: LRC[] = [];
  show = false;
  ob;

  domHeight = 0;

  getId(i: number) {
    return `lrc${i}`;
  }

  gotobyIndex(index: number) {
    if (!this.ul || !this.ul.nativeElement) return;

    const ulDom = this.ul.nativeElement;

    this.currindex = index;
    let selectHeight = 0;

    const eeee: HTMLLIElement = this.ul.nativeElement.querySelector('.ok');
    if (eeee) {
      eeee.classList.remove('ok');
    }

    const aaa = this.ul.nativeElement.querySelector('#' + this.getId(index));

    if (aaa) {
      aaa.classList.add('ok');
      selectHeight = parseFloat(getComputedStyle(aaa).height);
    }

    const all = this.heightList[index];
    if (!all) return;
    const top = add(all, divide(selectHeight, 2));
    let total = subtract(divide(this.domHeight, 2), top);

    if (!this.show) {
      ulDom.style.marginTop = `${total}px`;
    }
  }

  constructor(private audio: AudioService) {
    this.ob = new ResizeObserver(([entry]) => {
      if (!this.ul || !this.ul.nativeElement) return;
      this.caclHeight();
      this.updateItemheight();
    });

    this.audio.newName$.subscribe((res) => {
      this.name = res;
    });
  }

  getLRCdom(): HTMLLIElement[] {
    let li: HTMLLIElement[] = [];
    if (this.ul && this.ul.nativeElement) {
      li = Array.from(this.ul.nativeElement.querySelectorAll('li'));
    }
    return li;
  }

  updateItemheight() {
    const li: HTMLLIElement[] = this.getLRCdom();
    li.forEach((ele, i: number) => {
      const selected = Array.from(ele.classList).includes('ok');

      if (selected) {
        ele.classList.remove('ok');
      }

      const h = parseFloat(getComputedStyle(ele).height);
      this.heightList[i] = i ? add(this.heightList[i - 1], h) : h;
      if (selected) {
        ele.classList.add('ok');
      }
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

  dddddtoto000() {
    this.caclHeight();
    if (this.domHeight) {
      const hei = this.domHeight / 2 + 'px';
      this.ul.nativeElement.style.marginTop = hei;
    }
  }

  ngOnInit(): void {
    this.audio.lrc$.pipe(filter((res) => res.length > 0)).subscribe({
      next: (res) => {
        this.list = res;
        const list = res.map((res, i: number) => {
          const aaaa = res.txt.split('<br>');
          let firstLin = aaaa[0].trim();

          let zh = '';

          if (aaaa[1]) {
            firstLin = firstLin.split(' ').join('</span><span class="word">');
            firstLin = '<span class="word">' + firstLin + '</span>';
            zh = `<div class="zh">${aaaa[1].trim()}</div>`;
          }

          const ok = firstLin + zh;

          return `<li id="${this.getId(i)}">${ok}</li>`;
        });
        this.ul.nativeElement.innerHTML = list.join('');
        this.updateItemheight();
        this.dddddtoto000();
      },
    });

    this.audio.timeline$.pipe(filter((i) => i > -1)).subscribe((index) => {
      this.gotobyIndex(index);
    });

    if (!this.ref) {
      return;
    }

    this.dddddtoto000();
    // this.txt.nativeElement.style.marginBottom = hei;
    this.ob.observe(this.ref.nativeElement);
  }

  ddd() {
    this.show = true;
  }

  touchstart(event: any) {
    if (this.searfdasf(event)) return;

    const ee = event.touches[0];

    this.show = this.list.length > 3;
    const ulDom = this.ul.nativeElement;
    const ulHeight = parseInt(getComputedStyle(ulDom).height);
    var disX = subtract(ee.clientX, ulDom.offsetLeft);
    var disY = subtract(ee.clientY, ulDom.offsetTop);
    let l: number;
    let t: number;
    let marginTop = 0;

    if (this.ul && this.ul.nativeElement) {
      this.ul.nativeElement.classList.remove('auto');
    }

    document.ontouchmove = (e) => {
      const eeeee = e.touches[0];
      l = subtract(eeeee.clientX, disX);
      t = subtract(eeeee.clientY, disY);
      const midLine = divide(this.domHeight, 2);

      const buttom = ~subtract(ulHeight, midLine);

      if (t > midLine) {
        marginTop = midLine;
      } else if (t < buttom) {
        marginTop = buttom;
      } else {
        marginTop = t;
      }

      ulDom.style.marginTop = marginTop + 'px';
    };
    document.ontouchend = () => this.mouseup(true);
  }

  openBaidu(word: string, touches: any) {
    if (word.length < 3 || (touches && touches.length)) {
      return;
    }
    window.open('https://fanyi.baidu.com/#en/zh/' + word);
  }

  searfdasf(event: any) {
    const dom: HTMLDivElement = event.target;
    const search = Array.from(dom.classList).includes('word');

    if (search) this.openBaidu(dom.innerHTML, event.touches);

    return search;
  }

  onmousedown(event: any) {
    if (this.searfdasf(event)) return;

    this.show = this.list.length > 3;
    const ulDom = this.ul.nativeElement;
    const ulHeight = parseInt(getComputedStyle(ulDom).height);
    var disX = subtract(event.clientX, ulDom.offsetLeft);
    var disY = subtract(event.clientY, ulDom.offsetTop);
    let l: number;
    let t: number;
    let marginTop = 0;

    if (this.ul && this.ul.nativeElement) {
      this.ul.nativeElement.classList.remove('auto');
    }

    document.onmousemove = (e) => {
      l = subtract(e.clientX, disX);
      t = subtract(e.clientY, disY);
      const midLine = divide(this.domHeight, 2);

      const buttom = ~subtract(ulHeight, midLine);

      if (t > midLine) {
        marginTop = midLine;
      } else if (t < buttom) {
        marginTop = buttom;
      } else {
        marginTop = t;
      }

      ulDom.style.marginTop = marginTop + 'px';
    };
    document.onmouseup = () => this.mouseup(true);
  }

  mouseup(b: boolean) {
    if (!this.show) return;

    this.show = false;
    document.onmousemove = null;
    document.ontouchmove = null;
    document.onmouseup = null;
    document.ontouchend = null;

    if (!this.ul || !this.ul.nativeElement) {
      return;
    }

    this.ul.nativeElement.classList.add('auto');
    const line = this.line.nativeElement;
    const { top } = line.getBoundingClientRect();
    const mid = divide(parseFloat(getComputedStyle(line).height), 2);
    const midlineTop = add(top, mid);

    if (midlineTop < 10) return;
    const list = this.getLRCdom();

    const a = list.findIndex((ele) => {
      const { top } = ele.getBoundingClientRect();
      const hei = parseFloat(getComputedStyle(ele).height);

      const start = top;
      const end = add(top, hei);

      if (midlineTop >= start && midlineTop <= end) {
        return true;
      }
      return false;
    });

    if (a != -1) {
      this.audio.goto(this.list[a].time);
    }
  }

  dialoggg = true;
  hahafdfaf() {
    this.dialoggg = false;
  }
}
