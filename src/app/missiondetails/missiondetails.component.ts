import { Component, OnInit } from '@angular/core';
import { SpacexApiService } from '../SpaceX-API/spacex-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LaunchData } from '../model/mission';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  providers: [SpacexApiService]
})
export class MissionDetailComponent implements OnInit {
  launch: LaunchData = {} as LaunchData;

  constructor(
    private spacexApiService: SpacexApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const flightNumber = +params['flight_number']; 
      this.getLaunchDetails(flightNumber);
    });
  }

  private getLaunchDetails(flight_number: number){
    this.spacexApiService.getLaunchDetails(flight_number).subscribe({
      next: (data: LaunchData) => {
        this.launch = data; 
      },
      error: (error) => {
        console.error('Error fetching mission details:', error);
      }
    });
  }
}
