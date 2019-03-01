import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data-service';
import { TodoService } from './services/todo.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 600})
    ],
    providers: [
        TodoService
    ]
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'Core Module is already loaded. Import in the AppModul only'
            );
        }
    }
}
