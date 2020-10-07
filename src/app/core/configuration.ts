import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    HostUrl: string;
    HostUrlImages: string;

    constructor() {
        // let local = {
        //     HostUrl: 'http://localhost:4200/api/'
        // };
        // https://d-deal.com/ddeal/public/api/countries
        const local = {
            HostUrl: 'https://deal4deal.app/deal4deal_backend/public/api/',
            localImages : 'https://deal4deal.app/deal4deal_backend/public/'
        };

        this.HostUrl = local.HostUrl;
        this.HostUrlImages = local.localImages;

    }
}

