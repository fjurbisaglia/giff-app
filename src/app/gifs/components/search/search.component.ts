import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {
  }

  ngOnInit(): void {
  }

  public search() {
    const value = this.txtSearch.nativeElement.value;

    if (!value.trim()) {
      this.clearSearchBar();
      return;
    }

    this.gifsService.searchGifs(value);
    this.clearSearchBar();
  }

  private clearSearchBar() {
    this.txtSearch.nativeElement.value = '';
  }

}
