import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

// import { Item } from '../../models/item';
import { Ttable } from '../../models/ttable';
import { User } from '../../providers/providers';
// import { Items } from '../../providers/providers';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';

import { DomSanitizer} from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Ttable[] = [];
  db = firebase.firestore();

  constructor(public navCtrl: NavController, 
    private user: User,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController) {
    console.log("list-master-cons()a");
    // this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getTtables();
  }

  getTtables() {
    console.log("getTtables()a");
    /*
    this.db.collection('ttables').get()
    .then((querySnapshot) => {
      console.log("listMaster-cons-get().then()");
      querySnapshot.forEach((doc) => {
        this.currentItems.push(doc.data());
      })
    });
    */
   /*
    this.db.collection('ttables')
    .onSnapshot((collectionSnap) => {
      console.log("listMaster-cons-onSnapshot()");
      this.currentItems = [];
      collectionSnap.forEach((doc) => {
        this.currentItems.push(doc.data());
      })
    });
    */
   var ttablesRef = this.db.collection('ttables');
   ttablesRef.orderBy("createDate", "desc");
   ttablesRef.onSnapshot((snapshot) => {
     snapshot.docChanges.forEach((change) => {
       if ( change.type == 'added' ) {
         console.log("new Doc Added [" + JSON.stringify(change.doc.data()) + "]");
         var obj = JSON.parse(JSON.stringify(change.doc.data()));
         obj.$key = change.doc.id;
         this.currentItems.push(obj);
       }
       if ( change.type == 'modified' ) {
         console.log("Doc Modified [" + JSON.stringify(change.doc.data()) + "]");
        //  var modifiedItem = change.doc.data();
        //  this.deleteItem(modifiedItem);
        //  this.currentItems.push(modifiedItem);
       }
       if ( change.type == 'removed' ) {
         console.log("Doc Deleted [" + JSON.stringify(change.doc.data()) + "]");
        //  var removedItem = change.doc.data();
        //  this.deleteItem(removedItem);
       }
     })
   });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      this.db.collection('ttables').add({
        title: item.title,
        description: item.description,
        ttablePic: item.ttablePic,
        tags: item.tags,
        ownerId: this.user.getUserId(),
        ownerName: this.user.getUserName(),
        member: [],
        status: "Ready",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then((docRef) => {
        console.log("Doc Id [" + docRef.id + "]");
      }).catch((error) => {
        console.log("Error [" + error + "]");
      })
      /*
      if (item) {
        this.items.add(item);
      }
      */
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(removedItem) {
    this.db.collection('ttables').doc(removedItem.$key).delete();
    // this.items.delete(item);
    var index = -1;
    var object = this.currentItems.find(function(item, i) {
      if ( item.$key == removedItem.$key ) {
        index = i; 
        return true; 
      } else { 
        return false;
      }
    });
    if ( index > -1) this.currentItems.splice(index, 1);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Ttable) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
