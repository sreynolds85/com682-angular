import { FormBuilder} from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'update-info',
    templateUrl: './update-info.component.html',
    styleUrls: ['./article.component.css']
  })
export class UserUpdateComponent {
    updateForm:any;
    user:any;
    userFirstName:any;
    userLastName:any
    userLocation:any
    constructor(private webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authoriseUser();
        this.updateForm = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
            lastname: ['', Validators.compose([Validators.minLength(2),Validators.required])],
            location: ['', Validators.required],
            newpassword: ['', Validators.compose([Validators.minLength(8), Validators.required])],
            newpasswordconfirm: ['', Validators.compose([Validators.minLength(8), Validators.required])],
        },
        {validator: this.passwordValidator});
    }

    isInvalid(control: any) {
        return this.updateForm.controls[control].invalid && this.updateForm.controls[control].touched;
    }

    isIncomplete() {
        return this.isInvalid('firstname') ||  this.isInvalid('lastname') || this.isInvalid('location') ||
        this.isInvalid('newpassword') || this.isInvalid('newpasswordconfirm') || this.updateForm.controls.pristine;
    }

    isUntouched() {
        return this.updateForm.controls.pristine 
        }

    onSubmit(){
        if(this.updateForm.pristine){
            alert("complete all fields before submitting"); 
        } else {
            var results = this.updateForm.value;
            var name = results.firstname + " " + results.lastname;
            var location = results.location;
            var password = results.password;
            this.webService.updateUser(this.user["_id"], name, location, password).subscribe((response:any)=> {
                this.router.navigate(['profile']);
            });
        }
    }

    passwordValidator (fg: FormGroup) {
        const pw = fg.get('newpassword')?.value;
        const pwconfirm = fg.get('newpasswordconfirm')?.value;
        if (pw == pwconfirm){
            return null;
        } else {
            return  { PasswordMatchError: true}
        }
    }

    authoriseUser(){
        this.authService.user$.subscribe((val:any) => {
            this.webService.authenticatedUserProfile(val["email"]).subscribe((val:any)=> {
                this.user = val;
                if(val["userFullName"].length == 0){
                    this.userFirstName = "Undefined";
                    this.userLastName = "Undefined";
                } else {
                    let fullname = val["userFullName"];
                    let nArr = fullname.split(" ");
                    this.userFirstName = nArr[0];
                    this.userLastName = nArr[1]; 
                }
                if(val["location"].length == 0){
                    this.userLocation == "Undefined";
                }
            });
        });
    }
}
