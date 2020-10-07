import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
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
    tiles: any[] = [
        { text: 'One', cols: 1, rows: 3, color: 'lightblue', image: true },
        { text: 'Two', cols: 5, rows: 3, color: 'lightblue', image: false }
    ];
    webDevice = false;
    topSelection: any;
    subs: Subscription[] = [];

    constructor(utilityService: UtilityService, private homeProducts: ProductsService,
        translate: TranslateService) {
        if (typeof utilityService.webDevice !== 'undefined') {
            this.webDevice = utilityService.webDevice;
        }
        utilityService.changeEmitted$.subscribe(emit => {
            if ('webDevice' in emit) {
                this.webDevice = emit.webDevice;
            }
        });
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
