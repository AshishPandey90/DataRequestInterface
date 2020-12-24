import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotebookComponent } from './notebook/notebook.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecordsComponent } from './records/records.component';
import { RecordPageComponent } from './recordpage/recordpage.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'notebook', component: NotebookComponent, },
  { path: 'records', component: RecordsComponent, },
  { path: 'recordinfo', component: RecordPageComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Restore the last scroll position
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    // Enable scrolling to anchors
    anchorScrolling: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
