import { FormBuilder} from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from './web.service';
import { FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';

@Component({
    selector: 'edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./article.component.css']
  })
  export class EditArticleComponent { 
    constructor(public webService: WebService, private route: ActivatedRoute, 
        public authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

    articleId:any;
    articleUpdateForm:any;
    article:any;
    user:any;
    articleTitle:any;
    articleBody:any;
    articleTags:any;

    async ngOnInit(){
        this.authoriseUser();
        this.articleId = this.route.snapshot.paramMap.get('id');
        var response = await this.webService.getArticle(this.articleId).subscribe((val: any) => {
            this.article =  val["data"];
            this.articleTitle = this.article["title"];
            this.articleBody = this.article["article_body"];
            this.articleTags = this.article["tags"];
        });
        this.articleUpdateForm = this.formBuilder.group({
            title: ['', Validators.compose([Validators.minLength(1),Validators.required])],
            body: ['', Validators.compose([Validators.minLength(1),Validators.required])],
            tags: ['', Validators.required],
            language: ['' , Validators.required],
        });
    } 

    isInvalid(control: any) {
        return this.articleUpdateForm.controls[control].invalid && this.articleUpdateForm.controls[control].touched;
    }

    isIncomplete() {
        return this.isInvalid('title') ||  this.isInvalid('body') || this.isInvalid('tags') || this.articleUpdateForm.controls.pristine;
    }

    isUntouched() {
        return this.articleUpdateForm.controls.pristine 
        }

    onSubmit(){
        if(this.articleUpdateForm.pristine){
            alert("complete all fields before submitting"); 
        } else {
            var results = this.articleUpdateForm.value;
            var title = results.title;
            var body = results.body;
            var tags = results.tags;
            var lang = results.language;
            console.log(results);
            this.webService.updateArticle(this.article["_id"], this.user["_id"], title, body, tags, lang).subscribe((val:any) =>{
                this.articleId = val["article_id"];
                this.router.navigate(['articles/' + this.articleId]);
            });
        }
    }

    authoriseUser(){
        this.authService.user$.subscribe((val:any) => {
            this.webService.authenticatedUserProfile(val["email"]).subscribe((val:any)=> {
                this.user = val;
            });
        });
    }
  }