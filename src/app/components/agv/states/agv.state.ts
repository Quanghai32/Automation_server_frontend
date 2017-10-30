export interface commonInfo {
    dept: string;
    block: string;
    fromDate: string;
    toDate: string;
    viewMode: ViewMode;
    agvList: string[];
    agvOperationList: Agv[];
}

export enum ViewMode {
    Operation,
    Detail
}

export interface Agv {
    Name: string;
    Disconnect: number;
    Normal: number;
    Stop: number;
    Safety: number;
    Free: number;
    BatteryEmpty: number;
    Emergency: number;
    NoCart: number;
    OutLine: number;
    PoleError: number;
    Shutdown: number;
}

export interface Part {
    id: number;
    name: string;
    route: number;
}

export interface AbNormal {
    partName: string;
    route: number;
    agvName: string;
    supplyingTime: number;
    startTime: string;
    endTime: string;
}

export interface Dept {
    _id: number;
    _name: string;
    _block: string[];
}

