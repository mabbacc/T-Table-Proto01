import { Injectable } from '@angular/core';

import { User } from '../../providers/providers'; 
import { Ttable } from '../../models/Ttable';
import { Api } from '../api/api';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';

@Injectable()
export class Ttables {

  ttables: Ttable[] = [];

  /*
  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  */

  db = firebase.firestore();

  constructor(public api: Api, public user: User) {
    this.db.collection('ttables').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc)=>{
        this.ttables.push(doc);
      })
    });

    this.db.collection('ttables')
    .onSnapshot((collectionSnap) => {
      console.log('onSnapshot called()');
      collectionSnap.forEach((doc) => {
        this.ttables.push(doc);
      })
    });
   }

  query(params?: any) {
    if (!params) {
      return this.ttables;
    }

    return this.ttables.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Ttable) {

    this.db.collection('ttables').add({
      title: item.title,
      description: "assets/img/speakers/bear.jpg",
      images: [],
      tags: [],
      owner: this.user.getUserId(),
      member: [],
      status: "Ready",
      createDate: ''
    }).then(function(docRef) {
      console.log("Document written with ID : [" + docRef.id + "]");
    }).catch(function(error) {
      console.log("Error adding ttable [" + error + "]");
    });
  }

  delete(item: Ttable) {
  }

}
