from __future__ import print_function
from pynvml import *

nvmlInit()
print("Driver Version:", nvmlSystemGetDriverVersion())

deviceCount = nvmlDeviceGetCount()
for i in range(deviceCount):
    handle = nvmlDeviceGetHandleByIndex(i)
    print("Device", i, ":", nvmlDeviceGetName(handle))
    info = nvmlDeviceGetMemoryInfo(handle)
    print("Device", i, "'s Total memory", info.total)
    print("Device", i, "'s Free memory", info.free)
    print("Device", i, "'s Used memory", info.used) 
    

nvmlShutdown()
