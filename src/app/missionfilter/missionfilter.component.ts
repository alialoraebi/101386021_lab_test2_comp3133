import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { MatCardModule } from '@angular/material/card';
import { SpacexApiService } from '../SpaceX-API/spacex-api.service';
import { LaunchData } from '../model/mission'; 

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css'],
  standalone: true,
  imports: [FormsModule, MatCardModule, CommonModule],
  providers: [SpacexApiService, HttpClient],
})
export class MissionfilterComponent implements OnInit {
  years: number[] = [];
  year: string = '';
  launch_success: string = '';
  landing_success: string = '';
  allLaunches: LaunchData[] = []; 
  filteredLaunches: LaunchData[] = []; 

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private spacexApiService: SpacexApiService) {
    this.years = this.generateYears();
  }

  ngOnInit(): void {
    this.fetchLaunches();
  }

  private generateYears(): number[] {
    let endYear = 2020;
    let startYear = 2006;
    return Array.from({length: endYear - startYear + 1}, (_, i) => startYear + i);
  }

  fetchLaunches(): void {
    this.spacexApiService.getLaunches().subscribe((launches: LaunchData[]) => {
      this.allLaunches = launches;
      this.applyFilter(); 
    });
  }

  applyFilter() {
    let filtered = this.allLaunches.filter((launch: LaunchData) => { 
      const matchesYear = !this.year || launch.launch_year === this.year;
      const matchesLaunchSuccess = this.launch_success === '' || String(launch.launch_success) === String(this.launch_success);
    
      let matchesLandingSuccess = this.landing_success === '';
      if (this.landing_success !== '') {
        matchesLandingSuccess = launch.rocket.first_stage.cores.every(core => {
          if (this.landing_success === 'true') {
            return String(core.land_success) === 'true';
          } else {
            return String(core.land_success) === 'false' || core.land_success === null;
          }
        });
      }
    
      return matchesYear && matchesLaunchSuccess && matchesLandingSuccess;
    });
  
    this.filteredLaunches = filtered; 
  
    this.filterChanged.emit({
      year: this.year,
      launchSuccess: this.launch_success,
      landingSuccess: this.landing_success
    });
  }
}