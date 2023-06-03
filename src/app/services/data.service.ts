import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum Loop {
  Single = 'btn-order-single',
  List = 'btn-order-list',
}

export const loopDefulat = Loop.List;

export interface LRC {
  time: number;
  txt: string;
}

export interface Music {
  name: string;
  url: string;
  lrc: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  lrc(src: string) {
    return this.http.get(src, { responseType: 'text' });
  }

  list() {
    // return this.http.get('https://laof.github.io/em/src/assets/list.json');
    if (location.host == 'laof.github.io') {
      return this.http.get('https://laof.github.io/em/src/assets/list.json');
    }

    return this.http.get('assets/list.json');
  }
}
