const {Button, jestMatchers, mouse, straightTo, centerOf, randomPointIn, Region, right, down, left, up, Point} = require("@nut-tree/nut-js");

// console.log(mouse)
// move(right(10));

mouse.drag(straightTo(new Point(550,500)))