import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { MissionDetailComponent } from './missiondetails/missiondetails.component';

export const routes: Routes = [
    { path: '', redirectTo: '/view-list', pathMatch: 'full' },
    { path: 'view-list', component: MissionlistComponent },
    { path: 'filter-list', component: MissionfilterComponent },
    { path: 'view-details/:flight_number', component: MissionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
