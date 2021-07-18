import { Injectable } from '@angular/core';
import * as JsStore from 'jsstore';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';
import { Power } from '../model/power_data';
import { environment } from 'src/environments/environment';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

}

//根据environment.production来判断是否为开发环境来决定是否使用压缩文件
const getWorkerPath = () => {
  if (environment.production) {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
  } else {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js');
  }
}

export const idbcon = new JsStore.Connection(new Worker(getWorkerPath().default));
export const dbname = "Filecoin_DB";

const getDatabase = () => {
  const tbPower: ITable = {
    name: 'Power',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      total_raw_bytes_power: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      total_qa_bytes_power: {
        notNull: true,
        dataType: DATA_TYPE.Number,
      },
      qa_smoothed_position_estimate: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      qa_smoothed_velocity_estimate: {
        dataType: DATA_TYPE.Number,
        notNull: true
      },
      total_pledge_collateral: {
        dataType: DATA_TYPE.Number,
        notNull: true
      },
      height: {
        dataType: DATA_TYPE.Number,
        notNull: true
      }
    }
  };
  const dataBase: IDataBase = {
    name: dbname,
    tables: [tbPower]
  };
  return dataBase;
};

 function getAvailablePower() {
  const availableSampleDatas: Power[] = [{
    total_raw_bytes_power:1,
    total_qa_bytes_power: 1,
    qa_smoothed_position_estimate:1,
    qa_smoothed_velocity_estimate: 1,
    total_pledge_collateral: 1,
    height: 1
  }];
  return availableSampleDatas;
}

export const initJsStore = async () => {
  const dataBase = getDatabase();
  const isDbCreated = await idbcon.initDb(dataBase);
  if (isDbCreated) {
    idbcon.insert({
      into: 'Power',
      values: getAvailablePower()
    })
  }
};
