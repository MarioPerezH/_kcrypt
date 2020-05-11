import { Injectable } from '@angular/core';
import { UtilsService } from '../Common/utils.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterdownService {

    public model: IModel;
    constructor(private utilService: UtilsService) {
        this.model = <IModel>{};
        this.model.counterdownSubject = new Subject<number>();
        this.model.counterdownObservable = this.model.counterdownSubject.asObservable();
    }

    public start(seconds: number, callbackFinish: Function) {
        let id = this.utilService.generateGuid();

        this.model.countdown = <ICountdownFDto>{
            Id: id,
            Seconds: seconds,
            Counter: seconds,
            HashInterval: 0
        };

        this.model.callbackFinish = callbackFinish;
        this.model.countdown.HashInterval = this.execute();

        return id;
    }

    public reset() {
        if(!this.model.countdown) return false;

        this.stop();
        this.start(this.model.countdown.Seconds, this.model.callbackFinish);
    }

    public stop() {
        clearInterval(<number>this.model.countdown.HashInterval);
    }

    public clear() {
        if (!!this.model.countdown) {
            this.stop();
            this.model.countdown = null;
        }
    }

    public execute() {
        this.model.counterdownSubject.next(this.model.countdown.Counter);

        let hashInterval = setInterval(() => {
            if (this.model.countdown.Counter === 0) {
                this.stop();
                this.model.countdown = null;
                this.model.callbackFinish();
                return;
            }

            this.model.countdown.Counter--;
            this.model.counterdownSubject.next(this.model.countdown.Counter);
        }, 1000);

        return hashInterval;
    }
}

interface IModel {
    countdown: ICountdownFDto;
    callbackFinish: Function;
    counterdownSubject: Subject<number>;
    counterdownObservable : Observable<number>;
}

interface ICountdownFDto {
    Id: number | string;
    Seconds: number;
    Counter: number;
    HashInterval: number | string | any;
}