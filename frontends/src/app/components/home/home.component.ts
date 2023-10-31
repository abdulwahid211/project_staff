import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  actualImage: string | undefined;
  changeBackgroundCounter = 0;

  images = [
    'assets/slides/nurse.jpg',
    'assets/slides/office.jpg',
    'assets/slides/planning.jpg',
    'assets/slides/builders.jpg',
    'assets/slides/cooking.jpg',
  ];

  ngOnInit(): void {
    this.actualImage = this.images[0];

    setInterval(() => {
      this.changeBackgroundCounter++;
      if (this.changeBackgroundCounter > this.images.length - 1) {
        this.changeBackgroundCounter = 0;
      }
      this.actualImage = this.images[this.changeBackgroundCounter];
    }, 4000);
  }
}
