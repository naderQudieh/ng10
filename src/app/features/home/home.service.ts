import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as dealsOfTheDay from '../../../assets/Data/deals_of_the_day.json';
import * as topSelection from '../../../assets/Data/top_selection.json';
import * as categories from '../../../assets/Data/categories.json';

@Injectable()
export class  HomeService {

  constructor() { }

  getDealsOfTheDay(): Observable<any> {
    return of(dealsOfTheDay);
  }

  getTopSelection(): Observable<any> {
    return of(topSelection);
  }

  getCategories(): Observable<any> {
    return of(categories);
  }

}
