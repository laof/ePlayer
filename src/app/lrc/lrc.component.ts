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

  heightList: number[] = [];

  currindex = 0;

  list: LRC[] = [];
  show = false;
  ob;

  domHeight = 0;

  getId(i: number) {
    return `lrc${i}`;
  }

  constructor(private d: AudioService) {
    this.d.lrc$.pipe(filter((res) => res.length > 0)).subscribe({
      next: (res) => {
        const list = res.map((res, i: number) => {
          return `<li id="${this.getId(i)}">${res.txt}</li>`;
        });
        this.ul.nativeElement.innerHTML = list.join('');
        this.updateItemheight();
      },
    });

    this.ob = new ResizeObserver(([entry]) => {
      this.caclHeight();
      this.updateItemheight();
    });

    this.d.timeline$.pipe(filter((i) => i > -1)).subscribe((index) => {
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

      const d = this.heightList.filter((o, i) => i < index);
      const all = d.reduce((prev, curren) => add(prev, curren), 0);
      if (!all) return;
      const top = add(all, divide(selectHeight, 2));
      let total = subtract(divide(this.domHeight, 2), top);
      // console.log(divide(selectHeight, 2));
      // total = subtract(total, divide(selectHeight, 2));
      ulDom.style.marginTop = `${total}px`;
    });
  }

  updateItemheight() {
    const li: HTMLLIElement[] = Array.from(
      this.ul.nativeElement.querySelectorAll('li')
    );

    li.forEach((ele, i: number) => {
      const selected = Array.from(ele.classList).includes('ok');

      if (selected) {
        ele.classList.remove('ok');
      }

      const h = parseFloat(getComputedStyle(ele).height);
      this.heightList[i] = h;
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

    if (this.ul && this.ul.nativeElement) {
      this.ul.nativeElement.classList.remove('auto');
    }

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

    if (this.ul && this.ul.nativeElement) {
      this.ul.nativeElement.classList.add('auto');
    }
  }
}
