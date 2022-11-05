import * as sysinfo from 'systeminformation';


const cpuload = async (): Promise<any> => {

    const sysinfoRequest = {
        currentLoad: 'currentLoad',
        cpuTemperature: '*'
    };

    return sysinfo.get(sysinfoRequest);
}

const gpuload = async (): Promise<any> => {

    const data = await sysinfo.graphics();
    return data.controllers[0];
}

/*
const ob = {
    "vendor": "NVIDIA",
    "model": "NVIDIA GeForce RTX 3080",
    "bus": "PCI", "vram": 10240,
    "vramDynamic": false,
    "subDeviceId": "0x403E1458",
    "driverVersion": "512.15",
    "name": "NVIDIA GeForce RTX 3080",
    "pciBus": "00000000:01:00.0",
    "fanSpeed": 62,
    "memoryTotal": 10240,
    "memoryUsed": 1890,
    "memoryFree": 8187,
    "utilizationGpu": 13,
    "utilizationMemory": 22,
    "temperatureGpu": 37,
    "powerDraw": 43.17,
    "powerLimit": 370,
    "clockCore": 233,
    "clockMemory": 403 
}
*/


export { cpuload, gpuload };
