import { BrowserModule } from '@angular/platform-browser';
import { Directive, DoBootstrap, ElementRef, Injector, Input, NgModule } from '@angular/core';
import * as angular from 'angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule, UpgradeComponent, downgradeComponent, setAngularJSGlobal } from '@angular/upgrade/static';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { heroDetailAngular, HeroDetailAngularDirective } from './hero-detail-angularjs/hero-detail-angular.directive';

const HeroApp = angular
  .module('HeroApp', [])
  .component('heroDetailAngular', heroDetailAngular)
  .directive('appRoot', downgradeComponent({ component: AppComponent }))
  .directive(
    'heroDetail',
    downgradeComponent({ component: HeroDetailComponent }) as angular.IDirectiveFactory
  )
  .name;

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroDetailAngularDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule
  ],
  entryComponents: [
    HeroDetailComponent,
    AppComponent
  ],
  providers: [{ provide: '$scope', useExisting: '$rootScope' }],
  // bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private upgrade: UpgradeModule) { }
  public ngDoBootstrap(app: any) {
    setAngularJSGlobal(angular);
    this.upgrade.bootstrap(document.body, [HeroApp], { strictDi: true });
    app.bootstrap(AppComponent);
  }
}
