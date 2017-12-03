// Create by Egbert
// 2017.12.4 1:19
// 1、实现摄像漫游：通过鼠标、键盘、滑动条等方式（任选两种）实现摄像机的上、下、左、右、前、后移动，从而实现场景的漫游。
//    通过菜单或按钮等方式选择平行投影、透视投影，漫游参数也可设置漫游加速键。
// 2、实现摄像机环视：通过鼠标或键盘等方式旋转摄像机环顾四周，包括左右巡视、向上仰视和向下俯视。
// 3、三维场景可任选（可以选择由细分四面体得到的三维镂垫或三维迷宫等）
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_xformMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_xformMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';

function main() {

}