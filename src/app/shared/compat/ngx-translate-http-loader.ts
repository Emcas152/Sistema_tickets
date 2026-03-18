import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from './ngx-translate-core';

export class TranslateHttpLoader extends TranslateLoader {
  constructor(
    _http: HttpClient,
    _prefix = '/assets/i18n/',
    _suffix = '.json'
  ) {
    super();
  }

  getTranslation(_lang: string): Record<string, never> {
    return {};
  }
}
