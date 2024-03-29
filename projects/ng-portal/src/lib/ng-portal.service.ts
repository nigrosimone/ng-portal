import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map } from 'rxjs/operators';

export interface NgPortalServiceMessage {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

@Injectable()
export class NgPortalService {

    private static instance: NgPortalService | undefined = undefined;
    private event: Subject<NgPortalServiceMessage> = new Subject<NgPortalServiceMessage>();

    constructor() {
        if (NgPortalService.instance) {
            return NgPortalService.instance;
        }
        NgPortalService.instance = this;
    }

    /**
     * Send a "value" for the "key" (key or property name)
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(key: string, value: any): void {
        this.event.next({ key, value });
    }

    /**
     * Return an Observable for the "key" (key or property name)
     */
    get<K>(key: string): Observable<K> {
        return this.getAll().pipe(filter(e => e.key === key), map(e => e.value));
    }

    /**
     * Return an Observable for all the "key" (key or property name)
     */
    getAll(): Observable<NgPortalServiceMessage> {
        return this.event.asObservable();
    }
}