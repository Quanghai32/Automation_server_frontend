import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { ChartModule } from 'angular-highcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

//import { SharedModule } from '../shared/shared.module';

import { AgvRouting } from './agv-routing';
import { AgvComponent } from './agv.component';
import { OperationComponent } from './operation.component'
import { MyDatePickerModule } from 'mydatepicker';
import { AgvSupplyComponent } from './agv-supply.component';
import { DetailSupplyingComponent } from './detail-supplying.component';

import { AgvBackendService } from './services/agv-backend.service'
import { AgvAction } from './actions/agv.action';

declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting')
    dd(hc);
    return hc;
}


@NgModule({
    imports: [
        //SharedModule,
        FormsModule,
        BrowserModule,
        AgvRouting,
        MyDatePickerModule,
        ChartModule,
        Ng2GoogleChartsModule
    ],
    declarations: [
        AgvComponent,
        OperationComponent,
        AgvSupplyComponent,
        DetailSupplyingComponent
    ],
    exports: [],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        },
        AgvBackendService,
        AgvAction
    ]
})
export class AgvModule { }