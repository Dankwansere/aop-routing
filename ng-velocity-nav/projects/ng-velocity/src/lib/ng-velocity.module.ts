import { ModuleWithProviders, NgModule } from '@angular/core';
import { AopConfig } from './model/models';

@NgModule({
  imports: [
  ],
})
export class NgVelocityModule {
  static forRoot(config: AopConfig): ModuleWithProviders {
    return {
      ngModule: NgVelocityModule,
      providers: [{provide: AopConfig, useValue: config}]
    };
  }
 }
