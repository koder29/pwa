import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    pathMatch: 'exact',
    children: [
      {
        path: 'account',
        loadChildren: ()=>import('./account/account.module').then(mod=>mod.AccountModule)
      }
    ]
  },
  
];

@NgModule({
    
  declarations: [CustomerComponent],
  imports: [RouterModule.forChild(routes),
    MatTableModule
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
