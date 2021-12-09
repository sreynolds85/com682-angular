import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    article_list: any; 
    private data: any; 
    private articleId: any;
    private commentId: any;

    constructor(private http: HttpClient) {
    }

    setData(data:any){
        this.data = data;
    }

    getData(){
        return this.data; 
    }

    clearData(){
        this.data = undefined;
    }

    postComment(commentBody:any, userId:any, articleId:string){
        let commentData = new FormData();
        commentData.append('user_id', userId)
        commentData.append('article_id', articleId)
        commentData.append('comment_body', commentBody.comment)
        return this.http.put('http://localhost:5000/api/v1.0/articles/'+articleId+'/comments', commentData);
    }
    
    getArticles(page: number){
        return this.http.get('http://localhost:5000/api/v1.0/articles?pn='+page);
    }

    getArticlesByLang() {
        var lang = this.data;
        return this.http.get('http://localhost:5000/api/v1.0/articles/lang/' + lang); 
    }
    
    getArticle(id: any){
        this.articleId = id;
        return this.http.get('http://localhost:5000/api/v1.0/articles/'+id);
    }

    likeArticle(artId:any, userId:any){
        this.articleId = artId;
        let likeData = new FormData();
        likeData.append('_id', userId);
        return this.http.put('http://localhost:5000/api/v1.0/articles/'+artId+'/like', likeData);

    }

    getComments(id: any){
        return this.http.get('http://localhost:5000/api/v1.0/articles/'+id+"/comments");
    }

    getArticlesByAuthor(id:any){
        return this.http.get('http://localhost:5000/api/v1.0/articles/author/'+id);
    }

    postArticle(userID:any, title:any, body:any, tags:any, language:any){
        let articleData = new FormData();
        articleData.append('user_id', userID);
        articleData.append('title',title);
        articleData.append('body',body);
        articleData.append('tags',tags);
        articleData.append('language', language);
        return this.http.post('http://localhost:5000/api/v1.0/articles', articleData);
    }
    deleteArticle(articleId:any){
        return this.http.delete('http://localhost:5000/api/v1.0/articles/'+articleId);
    }

    updateArticle(articleId:any, userId:any, title:any, body:any, tags:any, language:any) {
        let updateData = new FormData();
        updateData.append('user_id',userId);
        updateData.append('title', title);
        updateData.append('body', body);
        updateData.append('tags', tags);
        updateData.append('lang',language);
        return this.http.put('http://localhost:5000/api/v1.0/articles/'+articleId, updateData)
    }

    likeComment(artId:any, comId:any, userId:any ){
        this.articleId = artId;
        this.commentId = comId;
        let likeData = new FormData();
        likeData.append('_id', userId);
        return this.http.put('http://localhost:5000/api/v1.0/articles/'+this.articleId+'/comments/'+this.commentId+'/like',likeData);
    }

    authenticatedUserProfile(email:any){
        return this.http.get('http://localhost:5000/api/v1.0/findprofile/'+email);
    }

    getUser(id:any){
        return this.http.get('http://localhost:5000/api/v1.0/users/'+id);
    }

    updateUser(id:any, name:any, location:any, password:any){
        let updateData = new FormData();
        updateData.append('userFullName', name);
        updateData.append('location', location);
        updateData.append('password', password);
        return this.http.put('http://localhost:5000/api/v1.0/users/'+id, updateData);

    }

    deleteUser(id:any){
        return this.http.delete('http://localhost:5000/api/v1.0/users/'+id);
    }

    followUser(userId:any, myId:any){
        var followData = new FormData();
        followData.append('my_id', myId);
        return this.http.put('http://localhost:5000/api/v1.0/users/'+userId+'/follow', followData);
    }

    unfollowUser(userId:any, myId:any){
        var unfollowData = new FormData();
        unfollowData.append('my_id', myId);
        return this.http.put('http://localhost:5000/api/v1.0/users/'+userId+'/unfollow', unfollowData)
    }

    searchArticles(){
        var searchString = this.getData();
        let updateData = new FormData();
        updateData.append('search_string',searchString);
        return this.http.post('http://localhost:5000/api/v1.0/articles/search',updateData)
    }
}