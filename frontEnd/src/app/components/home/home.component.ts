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
    'https://www.morganhunt.com/uploads/thumb/1645718622Morgan-Hunt-UK-Recruitment-Agency-Public-Sector-Recruiters.jpg',
    'assets/slides/nurse.jpg',
    'assets/slides/office.jpg',
    'assets/slides/teacher.jpg',
  ];

  ngOnInit(): void {
    this.actualImage = this.images[0];

    setInterval(() => {
      this.changeBackgroundCounter++;
      if (this.changeBackgroundCounter > this.images.length - 1) {
        this.changeBackgroundCounter = 0;
      }
      this.actualImage = this.images[this.changeBackgroundCounter];
    }, 5000);
  }
}
