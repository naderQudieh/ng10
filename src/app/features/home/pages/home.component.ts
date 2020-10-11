import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';
import { ProductsService } from '../../products/products.service';
import { catchError,finalize,delay, tap, map } from 'rxjs/operators';
import { of, timer, combineLatest,BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlTree, Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services';
import { GlobalService } from 'src/app/core/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    page: any;
    webDevice = false;
    topSelection: any; 
    
    constructor(private route: ActivatedRoute, private gService: GlobalService,
        private snackbarService: SnackbarService,
        private router: Router, translate: TranslateService) { 
    }
    ngOnInit(): void {
        

    }




    goToPage() {
        let pageNum = 1
        this.router.navigate(['/products'], { queryParams: { page: pageNum } });
    }

    goToTestDialog() {
        let displayMessage ="My test error"
        this.snackbarService.showConfirmDialog({
            noCancelButton: true,
            messageHtml: `<span>${displayMessage}</span>`,
            title: `Error  `,
            confirmButtonText: 'OK'
        });
    }

    goToTestsnackbarMessage() {
        let displayMessage = "My test error"
        this.snackbarService.success(displayMessage );
    }
    goToBar() {
        
        this.gService.showBar();
    }
    goToShowSpinner() {
        this.gService.showSpinner();
        //this.gService.getSpinnerValue().subscribe(lang => {
        //    of('dummy').pipe(delay(50)).subscribe(val => {
        //        //alert('dummy');
        //       // this.gService.hideBar();
        //    });
        //}) 
    }
    ngOnDestroy() {
        
    }
}
