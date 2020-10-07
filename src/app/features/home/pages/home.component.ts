import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';
import { ProductsService } from '../../products/products.service';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/servcies/language.service';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlTree, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    page: any;
    webDevice = false;
    topSelection: any; 
    sub: Subscription;
    constructor(private route: ActivatedRoute,
        private router: Router, translate: TranslateService) { 
    }
    ngOnInit(): void {
        this.sub= this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.page = +params['page'] || 0;
            });

    }




    goToPage() {
        let pageNum = 1
        this.router.navigate(['/products'], { queryParams: { page: pageNum } });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
