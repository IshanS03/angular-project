import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spongebob',
})
export class SpongebobPipe implements PipeTransform {

  //We must implement this method without changing its name 
transform(value: string, capFirst: boolean, ...args: unknown[]): string {
  let newValue = '';

  if(capFirst) {
  for (let i = 0; i < value.length; i++) {
    //we change the casing of every other character
    if (i % 2 != 0) {
      newValue += value[i].toUpperCase();
    } else {
      newValue += value[i].toLowerCase();
    }
  }
  } else {
    for (let i = 0; i < value.length; i++) {
      //we change the casing of every other character
      if (i % 2 == 0) {
        newValue += value[i].toUpperCase();
      } else {
        newValue += value[i].toLowerCase();
      }
    }
  }
  return newValue;
  }
}
