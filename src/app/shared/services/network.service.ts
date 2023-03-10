
import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { Platform } from '@ionic/angular';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NetworkService {
    private online$: Observable<boolean>;

    constructor(public platform: Platform) {
      this.online$ = Observable.create((observer:any) => {
        observer.next(true);
      }).pipe(map(a => true));

      Network.addListener("networkStatusChange", (status) => {
        
        this.online$ = Observable.create((observer:any) => {
          observer.next(true);
        }).pipe(map(x => status));
        
      });



    }

   /* public getNetworkType(): string {
        return this.network.type;
    }*/

    public getNetworkStatus(): Observable<boolean> {
      alert("getNetworkStatus: ");
        return this.online$;
    }
}