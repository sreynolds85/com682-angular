import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
    constructor(public webService: WebService, private route: ActivatedRoute, 
        public authService: AuthService, private formBuilder: FormBuilder) {}
    
    article:any;
    articleId:any;
    commentId: any;
    comment_list: any = [];
    commentForm: any;
    authenticated_email: string = "";
    user:any;

    async ngOnInit(){
        this.authoriseUser();
        this.articleId = this.route.snapshot.paramMap.get('id');
        var response = await this.webService.getArticle(this.articleId).subscribe((val: any) => {
            this.article =  val["data"];
        });
        this.comment_list = await this.webService.getComments(this.articleId).subscribe((val: any) => {
            var arr = Array.from(val)
            this.comment_list = arr;
        });

        this.commentForm = this.formBuilder.group({
            comment:['', Validators.required],
        });
    }   

    onSubmit() {
        this.authoriseUser();
        this.webService.postComment(this.commentForm.value, this.user["_id"], this.articleId).subscribe((response:any)=> {
            this.commentForm.reset();
            this.comment_list = this.webService.getComments(this.articleId).subscribe((val: any) => {
                var arr = Array.from(val)
                this.comment_list = arr;
            });
    
        })
    }

    isInvalid(control: any) {
        return this.commentForm.controls[control].invalid && this.commentForm.controls[control].touched;
    }

    authoriseUser(){
        this.authService.user$.subscribe((val:any) => {
            this.webService.authenticatedUserProfile(val["email"]).subscribe((val:any)=> {
                this.user = val;
            });
        });
        
    }

    isUntouched() {
        return this.commentForm.controls.comment.pristine 
        }

    isIncomplete() {
        return this.isInvalid('comment') || this.isUntouched();
        }

    like_article(){
        this.authoriseUser();
        this.webService.likeArticle(this.articleId, this.user["_id"]).subscribe(val =>{
            this.webService.getArticle(this.articleId).subscribe((val: any) => {
                this.article =  val["data"];
            });
        })
    }

    follow(event:any){
        this.authoriseUser();
        var idString = event.target.id;
        var split = idString.split("_",3);
        var userToFollow = split[2];
        this.webService.followUser(userToFollow, this.user["_id"]).subscribe((val:any)=>{
            console.log(val);
            this.ngOnInit();
            idString="";
        });

    }

    like_comment(event:any){
        this.authoriseUser();
        this.commentId = event.target.id
        console.log(this.commentId)
        this.webService.likeComment(this.articleId,this.commentId,this.user["_id"]).subscribe(val =>{
            this.comment_list = this.webService.getComments(this.articleId).subscribe((val: any) => {
                var arr = Array.from(val)
                this.comment_list = arr;
                this.comment_list.unsubscribe();
            });
        })
    }
}
