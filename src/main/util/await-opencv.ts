/**
 *  Here we will check from time to time if we can access the OpenCV
 *  functions. We will return in a callback if it's been resolved
 *  well (true) or if there has been a timeout (false).
 */
export async function waitForOpencv(cv: any, waitTimeMs = 30000, stepTimeMs = 100) {
    return new Promise(async (resolve, reject) => {
        if (cv.Mat) resolve(true);

        let timeSpentMs = 0;
        const interval = setInterval(() => {
            const limitReached = timeSpentMs > waitTimeMs;

            if (limitReached) {
                return reject();
            }

            if (cv.Mat) {
                clearInterval(interval);
                return resolve(true);
            } else {
                timeSpentMs += stepTimeMs;
            }
        }, stepTimeMs);
    });
}
