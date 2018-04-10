import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EntityService {

  constructor(private db: AngularFireDatabase) { }

  updateOverallStats(d_id, stats) {
   this.db.object(`/CochinCorp/devices/${d_id}/overallRating`)
   .set(stats);
  }

  updateFootFalls(d_id, count) {
    this.db.object(`/CochinCorp/devices/${d_id}`)
   .update({
     footfalls: count
   });
  }

}
