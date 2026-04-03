export interface Station {
  id: string;
  name: string;
  type: '自发自用' | '全额上网';
  status: '正常' | '异常' | '离线';
  maxTemp: number;
  currentUnbalance: number;
  voltageUnbalance: number;
  currentPower: number;
  dailyGeneration: number;
  /** 当月发电量 kWh */
  monthlyGenerationKwh: number;
  /** 当月上网电量 kWh */
  monthlyGridExportKwh: number;
  image: string;
}

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: '金华金字火腿',
    type: '自发自用',
    status: '正常',
    maxTemp: 45.2,
    currentUnbalance: 1.2,
    voltageUnbalance: 0.5,
    currentPower: 1250,
    dailyGeneration: 4500,
    monthlyGenerationKwh: 128600,
    monthlyGridExportKwh: 18200,
    image: 'https://picsum.photos/seed/station1/200/150',
  },
  {
    id: '2',
    name: '远大电站',
    type: '全额上网',
    status: '异常',
    maxTemp: 78.5,
    currentUnbalance: 16.5,
    voltageUnbalance: 4.2,
    currentPower: 850,
    dailyGeneration: 3200,
    monthlyGenerationKwh: 96200,
    monthlyGridExportKwh: 95800,
    image: 'https://picsum.photos/seed/station2/200/150',
  },
  {
    id: '3',
    name: '轨物测试电站',
    type: '自发自用',
    status: '离线',
    maxTemp: 0,
    currentUnbalance: 0,
    voltageUnbalance: 0,
    currentPower: 0,
    dailyGeneration: 0,
    monthlyGenerationKwh: 0,
    monthlyGridExportKwh: 0,
    image: 'https://picsum.photos/seed/station3/200/150',
  },
  {
    id: '4',
    name: '腾龙（二期低压）',
    type: '自发自用',
    status: '正常',
    maxTemp: 42.1,
    currentUnbalance: 2.1,
    voltageUnbalance: 0.8,
    currentPower: 2100,
    dailyGeneration: 7800,
    monthlyGenerationKwh: 215400,
    monthlyGridExportKwh: 32100,
    image: 'https://picsum.photos/seed/station4/200/150',
  },
  {
    id: '5',
    name: '宁波尚航科技发展有限公司',
    type: '自发自用',
    status: '正常',
    maxTemp: 52.4,
    currentUnbalance: 2.1,
    voltageUnbalance: 1.2,
    currentPower: 124.5,
    dailyGeneration: 114.2,
    monthlyGenerationKwh: 3850,
    monthlyGridExportKwh: 920,
    image: 'https://picsum.photos/seed/station5/200/150',
  },
  {
    id: '6',
    name: '杭州中兴工业园电站',
    type: '全额上网',
    status: '异常',
    maxTemp: 72.0,
    currentUnbalance: 14.2,
    voltageUnbalance: 3.8,
    currentPower: 560,
    dailyGeneration: 2100,
    monthlyGenerationKwh: 56800,
    monthlyGridExportKwh: 56500,
    image: 'https://picsum.photos/seed/station6/200/150',
  },
];
