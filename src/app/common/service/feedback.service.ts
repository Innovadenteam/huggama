import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FeedbackService {

  constructor(private db: AngularFireDatabase) { }

  submitFeedback(feedback) {
    return this.db.list('/CochinCorp/feedback').push(feedback);
  }

  getFeedback() {
    return this.db.list('/CochinCorp/feedback');
  }

}
