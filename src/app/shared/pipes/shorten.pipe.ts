import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * Сокращает строку, если её длина превышает 120 символов
   * @param value Строка для сокращения
   * @returns Сокращенная строка или изначальная строка(если длина <= 120 символов)
   */
  transform(value: string): string {
    if (value.length > 120) {
      if (value.charAt(119) === ' ') {
        if (value.charAt(118) === '.') {
          return `${value.substring(0, 118)}...`;
        }
        return `${value.substring(0, 119)}...`;
      }
      return `${value.substring(0, 120)}...`;
    }
    return value;
  }
}
