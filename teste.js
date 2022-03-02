const getPositionBrowser = (index) => {
    const workArea = { width: 1680, height: 972 }
    const height = (642 / 2) + 20 + 80;
    const width = 960 / 2;
    const qtyColumn = Math.trunc(workArea.width / width) || 1;
    const qtyRow = Math.trunc(workArea.height / height) || 1;
    let indexQty = 0;
    let x = 0;
    let y = 0;


    while (indexQty < index) {
        for (let row = 0; row < qtyRow; row++) {
            y = height * row;
            for (let column = 0; column < qtyColumn; column++) {
                x = width * column;

                if (indexQty == index) {
                    return { x, y };
                }
                indexQty++;
            }

        }
    }

    return { x, y };
};
console.log(getPositionBrowser(0))
console.log(getPositionBrowser(1))
console.log(getPositionBrowser(2))
console.log(getPositionBrowser(4))
console.log(getPositionBrowser(5))
console.log(getPositionBrowser(6))
console.log(getPositionBrowser(7))
console.log(getPositionBrowser(8))
console.log(getPositionBrowser(9))
console.log(getPositionBrowser(10))
console.log(getPositionBrowser(11))
console.log(getPositionBrowser(12))
console.log(getPositionBrowser(13))