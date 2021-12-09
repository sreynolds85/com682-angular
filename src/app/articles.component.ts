import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles_list: any = [];
  page: number = 1;

    constructor(public webService: WebService) {}
    async ngOnInit(){
      if(sessionStorage.getItem('page')) {
        this.page = Number(sessionStorage.getItem('page'));  
      }
       this.articles_list = this.webService.getArticles(this.page);
    }  

    previousPage(){
      if(this.page > 1){
        this.page = this.page -1;
        this.articles_list = this.webService.getArticles(this.page);
        sessionStorage.setItem('page', this.page.toString())
      }
    }

    nextPage(){
      this.page = this.page +1;
      this.articles_list = this.webService.getArticles(this.page);
      sessionStorage.setItem('page', this.page.toString())
    }
}
