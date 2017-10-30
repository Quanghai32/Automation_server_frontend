import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgvComponent } from './agv.component';
import { OperationComponent } from './operation.component'


const routes: Routes = [
    {
        path: 'chart', component: AgvComponent,      
    },
    //{ path: 'detail/:id', component: RecordSupplyComponent }
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AgvRouting { }
