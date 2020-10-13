import { Component, Input } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  @Input() title: string;
  @Input() pictures: string[] = [];

  currentPicture: number = 0;

  nextPic() {
    this.currentPicture += 1;
  }

  prevPic() {
    this.currentPicture -= 1;
  }
  firstPic() {
    this.currentPicture = 0;
  }
  lastPic() {
    this.currentPicture = this.pictures.length - 1;
  }
}
