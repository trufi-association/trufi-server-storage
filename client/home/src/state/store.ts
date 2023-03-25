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
    feedbacks: BSFeedbacks;
    surveys: BSSurveys;
    constructor() {
        this.feedbacks = new BehaviorSubject<FeedBack[]>([]);
        this.surveys = new BehaviorSubject<Survey[]>([]);
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