import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { MissionDetailComponent } from './missiondetails/missiondetails.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MissionlistComponent, NavbarComponent, MissionfilterComponent, MissionDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
}
