import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {
  constructor (private sanitizer: DomSanitizer) {}

  transform (value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value)
  }
}
