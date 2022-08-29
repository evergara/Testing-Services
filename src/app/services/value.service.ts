import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private value: string = 'my value';
  constructor() {}

  getValue() {
    return this.value;
  }
  setValue(value:string) {
    this.value = value;
  }
  getPromiseValue() {
    return Promise.resolve('Promise value');
  }

  getObservable() {
    return of('Observable value');
  }
}
