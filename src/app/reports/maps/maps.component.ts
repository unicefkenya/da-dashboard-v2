import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @ViewChild('map', { static: true }) map;
  villages: any = [];

  zoom = 7;
  kenyaCenter: any;
  styles: any = [
    {
      featureType: 'all',
      stylers: [
        {
          saturation: -80
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          hue: '#00ffee'
        },
        {
          saturation: 50
        }
      ]
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ];

  constructor(private reportsService: ReportsService) {
    this.getMapCoordinates();
  }

  ngOnInit() {
    this.kenyaCenter = { lat: 0.0236, lng: 37.9062 };

    this.map.triggerResize().then(() =>
      this.map._mapsWrapper.setCenter(this.kenyaCenter)
    );
  }


  getMapCoordinates() {
    this.reportsService.getSchoolCoordinates().subscribe((res) => {

      // console.log(res.results, 'sdsdsd');

      res.results.map(vil => {
        //console.log(vil)

        let village = vil.value.split("_");
        vil.id = village[0];
        vil.lat = parseInt(village[1]);
        vil.lng = parseInt(village[2]);
        vil.name = village[3].toUpperCase();
        vil.villageCoordinates = { lat: 0.355557, lng: 40.875549 };

        res.results.enrolls.map(res => {
          const villageEnrolls = res.value.split("_");
          if (villageEnrolls[0] === village[0]) {
            vil.dropout_females = res.dropout_females;
            vil.dropout_males = res.dropout_males;
            vil.dropout_total = res.dropout_total;
            vil.enrol_total_females = res.females;
            vil.enrol_total_males = res.males;
            vil.enrol_total = res.total;
          }
        });

        // console.log(vil);
        this.villages.push(vil);
      });

    }, error => {
      console.log(error);
    })
  }
}