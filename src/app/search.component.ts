import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./article.component.css']
})
export class SearchComponent {
    constructor(public webService: WebService, private route: ActivatedRoute, public authService: AuthService) {}
    search_results:any=[];

    async ngOnInit() {
        var i = 0;
        this.webService.searchArticles().subscribe((val:any)=>{
            if(val.length > 0){
                val.forEach((i:any) => {
                    console.log(i)
                    this.search_results = i;
                });
                this.search_results = Array.of(this.search_results);
            } else {
                this.search_results = [];
            }  
        });
    }
}