import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { logger } from './logger.reducer';
import { AppState } from '../app.state';

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
