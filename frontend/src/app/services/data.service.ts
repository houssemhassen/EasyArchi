import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:3000/article/';


  create(article: any) {
    return this.http.post(this.url + 'ajout', article);

  }

  getAll(){
    return this.http.get( this.url + 'all');
  }

  getArticleByIdArchitect(id: any){
    return this.http.get( this.url + 'getbyidarchitect/' + id);
  }
}
