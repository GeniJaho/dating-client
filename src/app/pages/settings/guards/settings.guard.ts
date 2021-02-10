import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { Status, User } from '@core/models';
import { SettingsActions } from '@settings/store/actions';
import * as fromSettings from '@settings/store/reducers';
import { SettingsState } from '@settings/store/reducers';
import { loadEntity } from '@shared/helpers';

@Injectable({ providedIn: 'root' })
export class SettingsGuard implements CanActivate {

  constructor(private store: Store<SettingsState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(fromSettings.selectUserDetails).pipe(
      map((user: User & Status) => {
        loadEntity(user, () => this.store.dispatch(SettingsActions.loadAuthDetails()))
        return true;
      })
    );
  }

}
