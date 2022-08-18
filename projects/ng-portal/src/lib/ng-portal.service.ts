import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map } from 'rxjs/operators';

export interface NgPortalServiceMessage {
    key: string;
    value: any;
}

const event: Subject<NgPortalServiceMessage> = new Subject<NgPortalServiceMessage>();

@Injectable()
export class NgPortalService {

    private static instance: NgPortalService | undefined = undefined;

    constructor() {
        if (NgPortalService.instance) {
            return NgPortalService.instance;
        }
        NgPortalService.instance = this;
    }

    /**
    * Return an instance of the NgPortalService
    */
    public static getService(): NgPortalService {
        if (!NgPortalService.instance) {
            throw new Error('NgPortalService not initialized');
        }
        return NgPortalService.instance;
    }

    /**
     * Send a "value" for the "key" (key or property name)
     */
    send(key: string, value: any): void {
        return event.next({ key, value });
    }

    /**
     * Return an Observable for the "key" (key or property name)
     */
    get<K>(key: string): Observable<K> {
        return this.getAll().pipe(filter(e => e.key == key), map(e => e.value));
    }

    /**
     * Return an Observable for all the "key" (key or property name)
     */
    getAll(): Observable<NgPortalServiceMessage> {
        return event.asObservable();
    }
}