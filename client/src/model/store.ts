import { BehaviorSubject } from 'rxjs';
import { FeedBack } from './feedback';
import { Survey } from './survey';

type BSFeedbacks = BehaviorSubject<FeedBack[]>

type BSSurveys = BehaviorSubject<Survey[]>

export type { BSFeedbacks, BSSurveys };