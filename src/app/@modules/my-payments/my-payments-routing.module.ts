import { MyPaymentsComponent } from './my-payments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyPaymentsComponent,
    data: { title: 'Meus Pagamentos' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPaymentsRoutingModule {}
