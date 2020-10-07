import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {
  transform(str: string): string {
    return this.isString(str)
      ? str.toLowerCase().trim()
        .replace(/[^\w\-]+/g, ' ')
        .replace(/\s+/g, '-')
      : str;
  }
  isString(value: any) {
    return typeof value === 'string';
  }
}
