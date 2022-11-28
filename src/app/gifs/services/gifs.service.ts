import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historic: string[] = [];
  private apiKey: string = 'sLbKJr8bbiL29KXEDKuzHVa9EGYZ4ezc';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  public results: Gif[] = [];

  get historic() {
    return [...this._historic];
  }

  constructor(private http: HttpClient) {
    this._historic = JSON.parse(localStorage.getItem('historic')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historic.includes(query)) {
      this._historic.unshift(query);
      this._historic = this._historic.splice(0, 10)

      localStorage.setItem('historic', JSON.stringify(this._historic));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      })

  }

}
