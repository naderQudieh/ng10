import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileComponent } from '../profile/profile.component';
import { routeAnimations  } from '../../../core/core.module';
import { State } from '../account.state';

import { DialogService } from '../../../shared/services';

@Component({
  selector: 'anms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

 
    constructor(private dialogService : DialogService,  private store: Store<State>) {}

    ngOnInit(): void {
      //this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
     }

    OpenProfileDialog() { 

        let dialogRef = this.dialogService.open(ProfileComponent, { 
            data: { name:'nahed test' },
            disableClose: false,
        });
        dialogRef.componentInstance.closeClicked.subscribe((e) => {
            console.log(e);
          return  dialogRef.close()
        });
        dialogRef.componentInstance.submitClicked.subscribe((e) => {
            console.log(e);
            return  dialogRef.close();
        });
        //dialogRef.componentInstance.content = data;
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                
                //this.isLoading = true;
                //this.meetingService.deleteSubject(id).subscribe(() => {
                //    this.toasterService.showToaster('Deleted!', '', 3000);
                //    const idx = this.mySubjectList.findIndex(n => n.id === id);
                //    if (idx > -1) {
                //        this.mySubjectList.splice(idx, 1);
                //    }
                //    this.isLoading = false;
                //});
            }
        });
    }
   
}
