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
    /**
     * Send a "value" for the "key" (key or property name)
     */
    send(key: string, value: any): void {
        return event.next({key, value});
    }

    /**
     * Return an Observable for the "key" (key or property name)
     */
    get<K>(key: string): Observable<K> {
        return event.asObservable().pipe(filter(e => e.key == key), map(e => e.value));
    }

    /**
     * Return an Observable for all the "key" (key or property name)
     */
    getAll<K>(): Observable<K> {
        return event.asObservable().pipe(map(e => e.value))
    }
}