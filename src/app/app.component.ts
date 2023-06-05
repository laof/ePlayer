import { Component, ElementRef, ViewChild } from '@angular/core';
import { AudioService } from './services/audio.service';
import { FooterComponent } from './footer/footer.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(FooterComponent) footerComponent!: FooterComponent;
  title = 'music';
  ob;
  caclAll$ = new Subject<void>(); // fuck..... mobile and web compatibility

  constructor(private el: ElementRef) {
    this.ob = new ResizeObserver(([entry]) => {
      this.caclAll$.next();
    });
    this.caclAll$.pipe(debounceTime(300)).subscribe({
      next: () => this.updateHeight(),
    });
    this.ob.observe(document.body);
  }

  updateHeight() {
    let vh = window.innerHeight * 0.01; // 重新计算视口高度的1%
    const a: HTMLDivElement | any = this.el.nativeElement;
    a && a.style.setProperty('--vh', `${vh}px`); // 更新CSS变量--vh
  }

  haha = false;
  fdfa(bb: boolean) {
    this.haha = !this.haha;
  }

  close() {
    this.footerComponent.closeDialoggg();
  }
}
