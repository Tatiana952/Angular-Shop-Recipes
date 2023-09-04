import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string,): string {
    if (value.length > 120) {
      if (value.charAt(119) === ' ') {
        if (value.charAt(118) === '.') {
          return `${value.substring(0,118)}...` 
        }
        return `${value.substring(0,119)}...` 
      }
      return `${value.substring(0,120)}...`       
    }
    return value;
  }

}