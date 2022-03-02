import time
import pyautogui
import sys
from cv2 import cv2
import mss
import numpy as np



def scroll():
    pyautogui.dragRel(0,-200,duration=1, button='left')
    #pyautogui.mouseDown(duration=0.1)
    #pyautogui.moveRel(0, -200, 0.7)
    #time.sleep(0.3)
   # pyautogui.mouseUp(duration=0.1)
   # print('true')

def printScreen(x,y,width, height):
    #img = pyautogui.screenshot('teste.png', region=(x,y,width, height))
    #return img
      with mss.mss() as sct:
        monitor = sct.monitors[0]
        sct_img = np.array(sct.grab(monitor))
        sct.shot(output='teste.png')
        # The screen part to capture
        # monitor = {"top": 160, "left": 160, "width": 1000, "height": 135}

        # Grab the data
        return sct_img[:,:,:3]
    
def findTarget(target, threshold,img):
   
    targetFile = cv2.imread(target)

    result = cv2.matchTemplate(img,targetFile,cv2.TM_CCOEFF_NORMED)
    w = targetFile.shape[1]
    h = targetFile.shape[0]

    yloc, xloc = np.where(result >= threshold)


    rectangles = []
    for (x, y) in zip(xloc, yloc):
        rectangles.append([int(x), int(y), int(w), int(h)])
        rectangles.append([int(x), int(y), int(w), int(h)])

    rectangles, weights = cv2.groupRectangles(rectangles, 1, 0.2)
    return rectangles

if __name__ == '__main__':

    nameFunction = sys.argv[1]
    print(nameFunction)

    if nameFunction == 'scroll':
        print('a')
        scroll()
        
    if nameFunction == 'printscreen':
        x = sys.argv[2]
        y =  sys.argv[3]
        width = sys.argv[4]
        height = sys.argv[5]
        
        printScreen(x,y,width, height )
    if nameFunction == 'findTarget':
        x = sys.argv[2]
        y =  sys.argv[3]
        width = sys.argv[4]
        height = sys.argv[5]
        target = sys.argv[6]
        threshold = float(sys.argv[7])

        img = printScreen(x,x,width,height)
        result = findTarget(target, threshold, img )
        print(result)
