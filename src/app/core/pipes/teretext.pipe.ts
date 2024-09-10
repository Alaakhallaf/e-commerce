import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teretext',
  standalone: true
})
export class TeretextPipe implements PipeTransform {

  transform(text:string): string {
    return text.split(" " , 3).join(" ");
  }

}
