import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class JanitorService {

  constructor(private db: AngularFireDatabase) { }

  updateJanitor(key, assignment) {
    this.db.object(`/CochinCorp/janitor/${key}`)
   .update({
     assignment: assignment
   });
  }

  getJanitors() {
    return this.db.list('/CochinCorp/janitor');
  }

}
