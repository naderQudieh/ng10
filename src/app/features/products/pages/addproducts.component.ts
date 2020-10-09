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
    templateUrl: './addproducts.component.html',
    styleUrls: ['../products.component.scss']
})
export class AddProductsComponent implements OnInit {
    

    constructor(utilityService: UtilityService, private homeProducts: ProductsService,
        translate: TranslateService) {
        
    }
    ngOnInit(): void {

        

    }



    
}
