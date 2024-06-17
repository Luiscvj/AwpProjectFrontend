import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptorService } from './Services/User/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
               provideRouter(routes,withComponentInputBinding()),
               importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
               {
                  provide:HTTP_INTERCEPTORS,
                  useClass:AuthInterceptorService,
                  multi: true
                }
             ]
};
