import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenatorsBudgetComponent } from './senators-budget/senators-budget.component';
import { SenatorsListComponent } from './senators-list/senators-list.component';

const routes: Routes = [
  { path: 'senators', component: SenatorsListComponent },
  { path: 'senators/:id', component: SenatorsBudgetComponent },
  { path: '', redirectTo: 'senators', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
