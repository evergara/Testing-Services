import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testing-services';

  ngOnInit(): void {
    /*
    const calculator:Calculator = new Calculator();
    const rta = calculator.multiplicar(3, 3);
    console.log(rta === 9);

    const rta2 = calculator.dividir(2, 0);
    console.log(rta2 === null);
    */
  }
}
