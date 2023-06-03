import { Injectable } from '@angular/core';
import { Loop, loopDefulat } from './data.service';

export interface LocalStorageData {
  loop: Loop;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  data = { loop: loopDefulat };
  private key = 'fdas_aa_33';
  constructor() {
    const mydata = localStorage.getItem(this.key);
    if (!mydata) return;
    try {
      this.data = JSON.parse(mydata);
    } catch (e) {}
  }

  save(data: LocalStorageData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
