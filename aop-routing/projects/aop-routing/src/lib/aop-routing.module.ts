import { ModuleWithProviders, NgModule } from '@angular/core';
import { AopConfig } from './model/models';

@NgModule({
  imports: [],
})
export class AopRoutingModule {
  static forRoot(config: AopConfig): ModuleWithProviders<AopRoutingModule> {
    return {
      ngModule: AopRoutingModule,
      providers: [{ provide: AopConfig, useValue: config }],
    };
  }
}
