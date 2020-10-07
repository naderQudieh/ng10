import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, args?: number): any {
    if (!(args && value && value.length > args)) {
      return value;
    }
    return `${value.slice(0, args)}...`;
  }
}
