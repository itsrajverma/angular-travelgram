import { Component, OnInit } from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture : string = "https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg";

  constructor(
    private auth : AuthService,
    private router : Router,
    private db : AngularFireDatabase,
    private storage : AngularFireStorage,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(f : NgForm){
    const { name,email,username,bio,country,password } = f.form.value;

    this.auth.signUp(email,password)
      .then((res)=>{
        console.log(res);
        const { uid } = res.user;

        this.db.object(`/users/${uid}`).set({
          id : uid,
          name : name,
          email : email,
          username : username,
          country : country,
          bio : bio,
          picture : this.picture
        })


      }).then(()=>{
        this.router.navigateByUrl("");
        this.toastr.success("Registered Successfully");
    }).catch((err)=>{
      console.log(err)
      this.toastr.error("Signup failed");
    })

  }



}
