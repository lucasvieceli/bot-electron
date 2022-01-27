from functions.printscreen import printScreen
from cv2 import cv2
import numpy as np


def positions(nameFile, threshold=.7):
    try:
        target = cv2.imread('./assets/images/'+nameFile+'.jpg')

        img = printScreen()

        result = cv2.matchTemplate(img,target,cv2.TM_CCOEFF_NORMED)
        w = target.shape[1]
        h = target.shape[0]

        yloc, xloc = np.where(result >= threshold)

        print(h)
        rectangles = []
        for (x, y) in zip(xloc, yloc):
            print(int(x))
            rectangles.append([int(x), int(y), int(w), int(h)])
            rectangles.append([int(x), int(y), int(w), int(h)])

        rectangles, weights = cv2.groupRectangles(rectangles, 1, 0.2)
        return rectangles
    except:
        print("An exception occurred")