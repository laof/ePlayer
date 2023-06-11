import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { divide } from 'mathjs';
import { map } from 'rxjs/operators';

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

  private data(arr: any[]) {
    return arr.map((obj: any) => {
      const time = divide(obj.time as number, 60);
      obj.time = time.toFixed(2).replace('.', ':');
      return obj;
    });
  }

  lrc(src: string) {
    return this.http.get(src, { responseType: 'text' });
  }

  list() {
    let url = 'https://laof.github.io/em/data/list.json';

    // location.host == 'laof.github.io'
    // location.host == 'localhost'
    return this.http.get(url).pipe(map((res: any) => this.data(res.files)));
  }
}
