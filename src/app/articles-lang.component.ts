import { Component } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'articles-lang',
  templateUrl: './articles-lang.component.html',
  styleUrls: ['./articles-lang.component.css']
})
export class ArticlesLangComponent {
    articles_lang_list: any = [];
    lang_page: number = 1;
    constructor(private webService: WebService, private router: Router) {}
    async ngOnInit(){
        this.lang_page = Number(sessionStorage.getItem('lang_page'));
        this.articles_lang_list = this.webService.getArticlesByLang()
    }  


    previousPage(){
      if(this.lang_page > 1){
        this.lang_page = this.lang_page -1;
        this.articles_lang_list = this.webService.getArticlesByLang();
        sessionStorage.setItem('lang_page', this.lang_page.toString())
      }
    }

    nextPage(){
      this.lang_page = this.lang_page +1;
      this.articles_lang_list = this.webService.getArticlesByLang();
      sessionStorage.setItem('lang_page', this.lang_page.toString())
    }
}
