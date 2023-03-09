import { BehaviorSubject } from 'rxjs';
import { BSFeedbacks, BSSurveys, FeedBack, Survey } from './../model';
import { getFeedbacks, getSurveys } from './../service';

const sucessHandler = <DATA>(data: BehaviorSubject<DATA>) =>
    (newData: DATA) => {
        data.next(newData);
    };

const errorHandler = <DATA>(data: BehaviorSubject<DATA>, defaultValue: DATA) =>
    (error: Error) => {
        console.log(error.message);
        data.next(defaultValue);
    };

export default class Store {
    feedbacks: BSFeedbacks = new BehaviorSubject<FeedBack[]>([]);
    surveys: BSSurveys = new BehaviorSubject<Survey[]>([]);
    clear: any = null;
    constructor() {
        this.update();
    }
    async update() {
        getFeedbacks()
            .then(sucessHandler(this.feedbacks))
            .catch(errorHandler(this.feedbacks, []));

        getSurveys()
            .then(sucessHandler(this.surveys))
            .catch(errorHandler(this.surveys, []));
    }
}