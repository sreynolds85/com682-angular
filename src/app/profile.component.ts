import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DeleteConfirmService } from './delete-confirm.service';

@Component({
 selector: 'profile',
 templateUrl: './profile.component.html',
 styleUrls: ['./article.component.css', './profile.component.css']
})
export class ProfileComponent { 
    constructor(public authService: AuthService, public router: Router, private webService: WebService,
         private deleteService: DeleteConfirmService, private formBuilder: FormBuilder) {}

    user:any;
    myArticles:any=[]
    likedArticleIds:any=[];
    likedArticles:any=[];
    myFollowers:any;
    usersFollowedCount:any;
    usersFollowedArr:any=[]

    async ngOnInit(){
        this.authoriseUser();
    }

    toggle(e: HTMLElement) {
        e.classList.toggle('hide');
      }

    unfollow(event:any){
        var idString = event.target.id;
        var split = idString.split("_",2);
        var userToFollow = split[1];
        this.webService.unfollowUser(userToFollow, this.user["_id"]).subscribe((val:any)=>{
            idString="";
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
        });
    }

    delete(event:any){
        var idString = event.target.id;
        var split = idString.split("_",2);
        var articleID = split[1];
        this.webService.deleteArticle(articleID).subscribe(val => {
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
        });
    }

    edit(event:any){
        console.log(1);
        var idString = event.target.id;
        var split = idString.split("_",2);
        var articleID = split[1];
        console.log(articleID);
        this.router.navigateByUrl('article/edit/'+ articleID);
    }

    public deleteProfileDialog(){
        this.deleteService.confirm('Profile deletion', 'Warning: Deleting profile will also delete your articles!');
      }

    authoriseUser(){
        this.authService.user$.subscribe((val:any) => {
            this.webService.authenticatedUserProfile(val["email"]).subscribe((val:any)=> {
                this.user =val;
                this.myFollowers = this.user["my_followers"].length;
                this.usersFollowedCount = this.user["users_followed"].length;
                this.user["liked_articles"].forEach((val:any) => {
                    this.likedArticleIds.push(val["_id"]);
                 });
                 this.likedArticleIds.forEach((val:any) => {
                    this.webService.getArticle(val).subscribe((val:any)=> {
                        if(Object.keys(val).length){
                            this.likedArticles.push(val["data"]);
                        }
                    });
                 });
                 this.likedArticles = Array.of(this.likedArticles);
                 this.myArticles = this.webService.getArticlesByAuthor(this.user["_id"]).subscribe((val: any) => {
                    var arr = Array.from(val)
                    this.myArticles = arr;
                });
                var usersArr = Array.of(this.user["users_followed"]);
                usersArr[0].forEach((i:any) => {
                    this.webService.getUser(i["_id"]).subscribe((val:any) =>{
                        this.usersFollowedArr.push(val["data"]);
                    }) 
                });
            });
        });   
    }
}