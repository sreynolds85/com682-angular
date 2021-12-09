import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AvatarModule } from 'ngx-avatar';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';
import { ArticlesLangComponent } from './articles-lang.component';
import { ProfileComponent } from './profile.component';
import { UserUpdateComponent } from './update-info.component';
import { AddArticleComponent } from './add-article.component';
import { EditArticleComponent } from './edit-article.component';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { DeleteConfirmService } from './delete-confirm.service';
import { SearchComponent } from './search.component';


var routes: any = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleComponent },
  { path: 'articles/lang/:lang', component: ArticlesLangComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update', component: UserUpdateComponent },
  { path: 'newArticle', component: AddArticleComponent },
  { path: 'article/edit/:id', component: EditArticleComponent },
  { path: 'search', component: SearchComponent }

];

@NgModule({
  declarations: [
    AppComponent, ArticlesComponent, DeleteConfirmComponent, SearchComponent,
    ArticleComponent, NavComponent, ArticlesLangComponent,
    ProfileComponent, UserUpdateComponent, AddArticleComponent, EditArticleComponent
  ],
  imports: [
    BrowserModule, AvatarModule,
    AppRoutingModule, HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-o1ghkc5g.eu.auth0.com',
      clientId: 'CmZbZU893ICT7L3Xj656sv1YPAa8Sbww',
      redirectUri: 'http://localhost:4200/articles'
    })
  ],
  providers: [WebService, DeleteConfirmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
