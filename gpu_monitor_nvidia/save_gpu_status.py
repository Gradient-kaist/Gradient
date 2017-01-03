import pymongo
import time
from pynvml import *

port = 27017

def get_property(gpunum, metric):
    metric_name = "gpu"+str(gpunum)+"_"+metric
    return str(gpu_device_handler(metric_name))
    


def gpu_status_dict():
    ''' returns dictionary of GPU information ''' 
    # Initialize NVML
    try:
        nvmlInit()
    except NVMLError, err:
        print("Failed while initializing NVML: ", err)
        return

    infos = {}
    # Timestamp
    infos["time"] = time.time()
    # Driver version
    infos["driver_version"] = nvmlSystemGetDriverVersion()
    # Devices
    deviceCount = nvmlDeviceGetCount()
    for i in range(deviceCount):
        deviceInfo = {}
        handle = nvmlDeviceGetHandleByIndex(i)
        # Name info
        deviceInfo["name"] = nvmlDeviceGetName(handle)
        # Memory info
        info = nvmlDeviceGetMemoryInfo(handle)
        deviceInfo["total_memory"] = info.total
        deviceInfo["free_memory"] = info.free
        deviceInfo["used_memory"] = info.used
        # Utilization info
        rates = nvmlDeviceGetUtilizationRates(handle)
        deviceInfo["gpu_utilization"] = rates.gpu
        deviceInfo["memory_utilization"] = rates.memory
        # Fan speed (Unit is percentage)
        try: # Not all GPUs have fans
            deviceInfo["fan_speed"] = nvmlDeviceGetFanSpeed(handle)
        except:
            print("device %d : no fan installed")
        # Running processes
        processes = nvmlDeviceGetComputeRunningProcesses(handle)
        processesList = [] 
        for process in processes:
            processInfo = {}
            processInfo["pid"] = process.pid
            processInfo["usedGpuMemory"] = process.usedGpuMemory
            processesList.append(processInfo)
        deviceInfo["processes"] = processesList 
        deviceInfo["num_of_processes"] = len(processes)
        # Clock info
        deviceInfo["clock_graphics"] = nvmlDeviceGetClockInfo(handle, NVML_CLOCK_GRAPHICS)
        deviceInfo["clock_SM"] = nvmlDeviceGetClockInfo(handle, NVML_CLOCK_SM) # SM is 'streaming multiprocessors' that runs CUDA kernels
        deviceInfo["clock_memory"] = nvmlDeviceGetClockInfo(handle, NVML_CLOCK_MEM)
        # Max clock info
        deviceInfo["max_clock_graphics"] = nvmlDeviceGetMaxClockInfo(handle, NVML_CLOCK_GRAPHICS)
        deviceInfo["max_clock_SM"] = nvmlDeviceGetMaxClockInfo(handle, NVML_CLOCK_SM)
        deviceInfo["max_clock_memory"] = nvmlDeviceGetMaxClockInfo(handle, NVML_CLOCK_MEM)
        # Power usage (unit is converted to W)
        deviceInfo["power_usage"] = nvmlDeviceGetPowerUsage(handle)/1000
        deviceInfo["power_capacity"] = nvmlDeviceGetPowerManagementLimit(handle)/1000
        # Temperature (unit is Celcious)
        deviceInfo["temp"] = nvmlDeviceGetTemperature(handle, NVML_TEMPERATURE_GPU)
        # Performance State (refer to http://docs.nvidia.com/gameworks/content/gameworkslibrary/coresdk/nvapi/group__gpupstate.html)
        deviceInfo["performance_state"] = nvmlDeviceGetPerformanceState(handle)
        
        infos[str(i)] = deviceInfo

    try:
        nvmlShutdown()
    except NVMLError, err:
        print("Error while shutting down NVML: ", err)
        return
    return infos
        


def save_gpu_status_data():
    '''
    #Collect folling data
    timestamp
    gpu_util
    gpu_mem_speed
    gpu_graphics_speed
    '''
    nvmlInit()
    gpu_num = get_gpu_num()
    for i in range(gpu_num):
        collection_name = "gpu%s_status" % i
        collection = db[collection_name]

        gpu_temp_name

        gpu_status_row = {"timestamp" : str(time.time()),
                "util" : get_property(i, "util"),
                "mem_util" : get_property(i, "mem_util"),
                "mem_used" : get_property(i, "mem_used"),
                "mem_total" : get_property(i, "mem_total"),
                "fan" : get_property(i, "fan"),
                "power_usage" : get_property(i, "power_usage"),
                "temp" : get_property(i, "temp"),
                "graphics_speed" : get_property(i, "graphics_speed"),
                "max_graphics_speed": get_property(i, "max_graphics_speed"),
                "mem_speed" : get_property(i, "mem_speed"),
                "max_mem_speed" : get_property(i, "max_mem_speed"),

                }
        print(gpu_status_row)

        collection.insert(gpu_status_row)

    nvmlShutdown()


if __name__ == '__main__':
    connection = pymongo.MongoClient("localhost", port)
    db = connection["gradient"]
    collection = db['gpu']
    print ("Start collecting gpu status data.\nData will be saved to MongoDB localhost:%d" % port)

    while(1):
        info = gpu_status_dict()
        collection.insert_one(info)
        time.sleep(5)




