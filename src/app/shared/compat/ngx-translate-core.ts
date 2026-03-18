import {
  Directive,
  Injectable,
  ModuleWithProviders,
  NgModule,
  Pipe,
  PipeTransform
} from '@angular/core';

export abstract class TranslateLoader {
  abstract getTranslation(lang: string): unknown;
}

@Injectable({ providedIn: 'root' })
export class TranslateService {
  currentLang = 'en';
  defaultLang = 'en';

  setDefaultLang(lang: string): void {
    this.defaultLang = lang;
    this.currentLang = lang;
  }

  use(lang: string): string {
    this.currentLang = lang;
    return lang;
  }

  instant(key: string): string {
    return key;
  }
}

@Pipe({
  name: 'translate',
  standalone: false
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Directive({
  selector: '[translate]',
  standalone: false
})
export class TranslateDirective {}

@NgModule({
  declarations: [TranslatePipe, TranslateDirective],
  exports: [TranslatePipe, TranslateDirective]
})
export class TranslateModule {
  static forRoot(_config?: unknown): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService]
    };
  }

  static forChild(_config?: unknown): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService]
    };
  }
}
