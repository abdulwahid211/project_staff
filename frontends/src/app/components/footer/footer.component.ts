import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  imgFBSrc: string = 'assets/social_media/facebook.png';
  imgInstaSrc: string = 'assets/social_media/instagram.png';
  imgLinkSrc: string = 'assets/social_media/linkedin.png';
  constructor() {}

  ngOnInit(): void {}
}
