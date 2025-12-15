import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/components/pages/app/app.config';
import { App } from './app/components/pages/app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
