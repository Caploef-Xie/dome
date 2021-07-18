import { Component, OnInit } from '@angular/core';
import { IPower } from '../model/power_data';
import { idbcon } from '../service/db.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {

  tableName = "Power";
  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  getPowers() {
    return idbcon.select<IPower>({
      from: this.tableName
    });
  }
  async addPower() {
    console.log(this.api.getPowerData(""))
    var datas: Array<IPower> = new Array<IPower>();
    await this.api.getPowerData("").subscribe((data: any) => {
      datas = data;
      var i = 0;
      return idbcon.insert<IPower>({
        into: this.tableName,
        return: true, // as id is autoincrement, so we would like to get the inserted value
        values: [{
          total_raw_bytes_power:1,
          total_qa_bytes_power: 1,
          qa_smoothed_position_estimate:1,
          qa_smoothed_velocity_estimate: 1,
          total_pledge_collateral: 1,
          height: 1
        }]
      });
    })
  }
}
