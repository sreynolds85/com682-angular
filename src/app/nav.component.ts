import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { FormBuilder } from '@angular/forms';

@Component({
 selector: 'navigation',
 templateUrl: './nav.component.html',
 styleUrls: ['./nav.component.css']
})
export class NavComponent { 
    constructor(public authService: AuthService, public router: Router, private webService: WebService, private formBuilder: FormBuilder) {}
    searchForm:any;
    async ngOnInit(){
        this.searchForm = this.formBuilder.group({
            searchString: ''
        });
    }
    
    submitSearch(){
        this.webService.setData(this.searchForm.value.searchString);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['search']);
        });
        this.searchForm.reset();
    }

    onChange(event: any){
        if(event.target.value !== "--"){
            this.webService.setData(event.target.value);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['articles/lang/:' + event.target.value]);
            }); 
        }
    }
}