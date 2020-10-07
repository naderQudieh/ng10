import { Data, Params, RouterStateSnapshot} from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

 

export interface RouterState {
    url: string;
    params: Params;
    queryParams: Params;
    data: Data;
    path: string;
}

export const selectRouter: (state) => RouterReducerState<RouterState> = state => state.router;

export const selectRouteData = <T>(key: string) =>
    createSelector(selectRouter, (state): T => state?.state?.data && state.state.data[key]);

export const selectQueryParams = createSelector(selectRouter, state => state?.state?.queryParams || {});

export const selectQueryParam = (key: string) =>
    createSelector(selectQueryParams, (queryParams): string => queryParams && queryParams[key]);

export const selectRouteParam = (key: string) =>
    createSelector(selectRouter, (state): string => state?.state?.params && state.state.params[key]);

export const selectUrl = createSelector(selectRouter, state => state?.state?.url);

export const selectPath = createSelector(selectRouter, state => state?.state?.path);


export class CustomRouterSerializer implements RouterStateSerializer<RouterState> {
    serialize(routerState: RouterStateSnapshot): RouterState {
        let route = routerState.root;

        let data = route.data;
        let params = route.params;
        let path = route.routeConfig?.path;
        while (route.firstChild) {
            route = route.firstChild;
            data = { ...data, ...route.data };
            params = { ...params, ...route.params };
            if (route.routeConfig?.path) {
                if (path) {
                    path += '/' + route.routeConfig.path;
                } else {
                    path = route.routeConfig.path;
                }
            }
        }

        const {
            url,
            root: { queryParams },
        } = routerState;

        return { url, params, queryParams, data, path };
    }
}

