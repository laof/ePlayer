import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrcComponent } from './lrc.component';

describe('LrcComponent', () => {
  let component: LrcComponent;
  let fixture: ComponentFixture<LrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
