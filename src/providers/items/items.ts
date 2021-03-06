import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';

@Injectable()
export class Items {

  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };

  db = firebase.firestore();

  constructor(public api: Api) {
    console.log("items-constructor()a");
    this.db.collection('ttables').get()
    .then((querySnapshot) => {
      console.log("items-cons-get().then()");
      querySnapshot.forEach((doc)=>{
        this.items.push(doc);
      })
    });

    this.db.collection('ttables')
    .onSnapshot((collectionSnap) => {
      console.log("items-onSnapshot()");
      collectionSnap.forEach((doc) => {
        this.items.push(doc);
      })
    });
   }

   /*
  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
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
  */

  add(item: Item) {
    /*
    this.db.collection('ttables').add({
      name: item.name,
      profilePic: "assets/img/speakers/bear.jpg",
      about: item.about
    }).then(function(docRef) {
      console.log("Document written with ID : [" + docRef.id + "]");
    }).catch(function(error) {
      console.log("Error adding ttable [" + error + "]");
    });
    */
  }

  delete(item: Item) {
  }

}
