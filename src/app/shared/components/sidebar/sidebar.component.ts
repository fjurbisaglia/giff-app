import {Component, OnInit} from '@angular/core';
import {GifsService} from "../../../gifs/services/gifs.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  get historic(): string[] {
    return this.gifsService.historic;
  }

  constructor(private gifsService: GifsService) {
  }

  ngOnInit(): void {
  }

  search(query: string): void {
    this.gifsService.searchGifs(query)
  }


}
