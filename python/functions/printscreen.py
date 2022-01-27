import mss
import numpy as np

def printScreen():
    with mss.mss() as sct:
        monitor = sct.monitors[0]
        sct_img = np.array(sct.grab(monitor))
        
        return sct_img[:,:,:3]