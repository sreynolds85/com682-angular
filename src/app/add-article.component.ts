import { FormBuilder} from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./article.component.css']
  })
export class AddArticleComponent {
    articleForm:any;
    user:any;
    newArticleId:any;

    constructor(private webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authoriseUser();
        this.articleForm = this.formBuilder.group({
            title: ['', Validators.compose([Validators.minLength(1),Validators.required])],
            body: ['', Validators.compose([Validators.minLength(1),Validators.required])],
            tags: ['', Validators.required],
            language: ['', Validators.required],
        });
    }

    isInvalid(control: any) {
        return this.articleForm.controls[control].invalid && this.articleForm.controls[control].touched;
    }

    isIncomplete() {
        return this.isInvalid('title') ||  this.isInvalid('body') || this.isInvalid('tags') || this.articleForm.controls.pristine;
    }

    isUntouched() {
        return this.articleForm.controls.pristine 
        }

    onSubmit(){
        if(this.articleForm.pristine){
            alert("complete all fields before submitting"); 
        } else {
            var results = this.articleForm.value;
            var title = results.title;
            var body = results.body;
            var tags = results.tags;
            var lang = results.language;
            this.webService.postArticle(this.user["_id"], title, body, tags, lang).subscribe((val:any) =>{
                this.newArticleId = val["new_article"]
                this.router.navigate(['articles/' + this.newArticleId]);
            })
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
