import { Component, OnInit } from '@angular/core';
import { Senator, SenatorsService } from '../senators.service';

@Component({
  selector: 'app-senators-list',
  templateUrl: './senators-list.component.html',
  styleUrls: ['./senators-list.component.css'],
})
export class SenatorsListComponent implements OnInit {
  constructor(private senatorsService: SenatorsService) {}

  senators: Senator[] = [];

  ngOnInit(): void {
    this.senatorsService.listSenators().subscribe((senators) => {
      this.senators = senators;
    });
  }
}
