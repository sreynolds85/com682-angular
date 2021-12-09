import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-confirm',
  templateUrl: './delete-confirm.component.html',
})
export class DeleteConfirmComponent implements OnInit {

  constructor(private modal: NgbActiveModal, private authService: AuthService, private webService: WebService, private router: Router) { }

  user:any;
  @Input() modTitle: string ="";
  @Input() warning: string = "";
  @Input() confirmBtn: string ="";
  @Input() cancelDeleteBtn: string ="";

  ngOnInit() {
      this.authoriseUser();
  }

  public cancelDeletion() {
      this.modal.close();
  }

  public confirmDeletion() {
      this.webService.deleteUser(this.user["_id"]).subscribe(val =>{
        this.authService.logout();
        let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigateByUrl('articles');
            });
      });
      this.modal.close();
  }

  public dismissModal() {
      this.modal.dismiss();
  }

  authoriseUser(){
    this.authService.user$.subscribe((val:any) => {
        this.webService.authenticatedUserProfile(val["email"]).subscribe((val:any)=> {
            this.user = val;
        });
    });
}

}