import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { RedactorComponent } from './pages/redactor/redactor.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'redactor/:elem', component: RedactorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
