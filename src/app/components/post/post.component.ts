import { Component, OnInit,Input,OnChanges } from '@angular/core';

import { faThumbsUp,faThumbsDown,faShareSquare } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post;

  like = 0;
  disLike = 0;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  uid = null;


  constructor(private db : AngularFireDatabase,private auth : AuthService) {
    this.auth.getUser().subscribe((user)=>{
      this.uid = user?.uid;
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.post.vote){
      Object.values(this.post.vote).map((value : any)=>{
        if(value.like){
          this.like += 1;
        }
        if(value.dislike){
          this.disLike+=1;
        }
      })
    }
  }

  likePost(){
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      like : 1,
    })
  }

  dislikePost(){
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      dislike : 1,
    })
  }

  getInstaUrl(){
    return `https://instagram.com/${this.post.instaId}`;
  }

}
