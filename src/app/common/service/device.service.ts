import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DeviceService {

  constructor(private db: AngularFireDatabase) { }

  getDevices() {
    return this.db.list('/CochinCorp/devices');
  }

}
