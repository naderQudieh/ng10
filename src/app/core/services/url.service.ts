// all dummy Urls
// till the actual APis get developed
import { Injectable } from '@angular/core';
import { BaseConfig } from '@app/@core/backend/baseconfig';
import { urls } from '@app/@core/backend/urls';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(private baseConfig: BaseConfig) {}

  public simpleApiCall(_urlName: any) {
    let requiredUrl: string = urls[_urlName];
    return this.prependBaseUrl(requiredUrl);
  }

  public apiCallWithParams(_urlName: any, _params: any) {
    let requiredUrl: string = urls[_urlName];
    return this.prependBaseUrlAndReplaceParams(requiredUrl, _params);
  }

  private prependBaseUrl(_url: any) {
    return this.baseConfig.restPath + _url;
  }

  private prependBaseUrlAndReplaceParams(_url: any, _urlParams: any) {
    if (Object.keys(_urlParams).length) {
      for (let [key, value] of Object.entries(_urlParams)) {
        _url = _url.replace(key, value);
      }
    }
    return this.baseConfig.restPath + _url;
  }

  public addQueryStringParm(url: any, name: any, value: any) {
    var re = new RegExp('([?&]' + name + '=)[^&]+', '');
    var add = function (sep: any) {
      url += sep + name + '=' + encodeURIComponent(value);
    };
    var change = function () {
      url = url.replace(re, '$1' + encodeURIComponent(value));
    };
    if (url.indexOf('?') === -1) {
      add('?');
    } else {
      if (re.test(url)) {
        change();
      } else {
        add('&');
      }
    }
    return url;
  }

  public addQueryStringParmMultiple(url: any, name: any, value: any) {
    var re = new RegExp('([?&]' + name + '=)[^&]+', '');
    var add = function (sep: any) {
      url += sep + name + '=' + encodeURIComponent(value);
    };
    var change = function () {
      url = url.replace(re, '$1' + encodeURIComponent(value));
    };
    if (url.indexOf('?') === -1) {
      add('?');
    } else {
      add('&');
    }
    return url;
  }

  public removeQueryStringParm(url: any, name: any) {
    var rtn = url.split('?')[0],
      param,
      params_arr = [],
      queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
    if (queryString !== '') {
      params_arr = queryString.split('&');
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split('=')[0];
        if (param === name) {
          params_arr.splice(i, 1);
        }
      }
      rtn = rtn + '?' + params_arr.join('&');
    }
    return rtn;
  }
}
