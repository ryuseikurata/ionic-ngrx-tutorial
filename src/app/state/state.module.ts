import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/todo.effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([TodoEffects])
    ],
    declarations: []
})

export class StateModule {

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: StateModule
    ) {
        if (parentModule) {
            throw new Error(
                'StateModule is already loaded. Import it in the AppModule only'
            );
        }
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StateModule
        };
    }
}
