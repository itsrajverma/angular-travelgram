import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

import { finalize } from 'rxjs/operators';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { readAndCompressImage } from 'browser-image-resizer';

import { v4 as uuidv4 } from "uuid";

const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
  debug: true
};
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  picture : string = null;
  uploadPercent : number = null;

  user = null;

  constructor(
    private auth : AuthService,
    private router : Router,
    private db : AngularFireDatabase,
    private storage : AngularFireStorage,
    private toastr : ToastrService
  ) {
    auth.getUser().subscribe((user)=>{
      this.db.object(`/users/${user.uid}`).valueChanges().subscribe((user)=>{
        this.user = user;
        console.log(user);
      })
    })

  }


  ngOnInit(): void {
  }

  onSubmit(){

  }



  async uploadFile(event){
    console.log(event);
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file,config);

    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath,resizedImage);

    task.percentageChanges().subscribe((percentage)=>{
      this.uploadPercent = percentage;
    });

    task.snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          this.picture = url;
          this.toastr.success("image upload successfully...");
        })
      })
    ).subscribe();


  }
}
