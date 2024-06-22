import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {
  transform(value: any[], start: number, end: number): any[] {
    return value.slice(start, end);
  }
}