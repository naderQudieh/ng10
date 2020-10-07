import { Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { UtilityService } from '../../../core/services/utility.service';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    tiles: any[] = [
        { text: 'One', cols: 1, rows: 3, color: 'lightblue', image: true },
        { text: 'Two', cols: 5, rows: 3, color: 'lightblue', image: false }
    ];
    webDevice = false;
    topSelection: any;
    subs: Subscription[] = [];

    constructor(utilityService: UtilityService, private homeProducts: ProductsService,
        translate: TranslateService) {
        
    }
    ngOnInit(): void {

        this.subs.push(this.homeProducts.getTopSelection().subscribe(tops => {
            if ('default' in tops && Array.isArray(tops.default)) {
                this.topSelection = tops.default;
            }
        }));

    }



    deletePhoto(data: any): void {
        console.log(data);
    }
    favoritePhoto(data: any): void {
        console.log(data);
    }

    ngOnDestroy() {
        this.subs.forEach(sub => { sub.unsubscribe() });
    }
}
