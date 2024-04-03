import { Component, OnInit } from '@angular/core';
import { SpacexApiService } from '../SpaceX-API/spacex-api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule], 
  providers: [SpacexApiService, HttpClient],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  launches: any[] = [];

  constructor(private spacexApiService: SpacexApiService) { }

  ngOnInit(): void {
    this.spacexApiService.getLaunches().subscribe(data => {
      this.launches = data;
    });
  }
}