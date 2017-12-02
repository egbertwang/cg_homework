// 1_WebGLPrint.js (c) 2017 EgbertW
//
// TODO 实现对象的旋转、平移、放缩
// TODO 更改颜色属性
// TODO 交互手段包括：键盘、鼠标、菜单、按钮、滑动条
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

var angle = 0.0;     // Rotate theta
var Tx = 0.0, Ty = 0.0, Tz = 0.0;     // Move
var Sx = 1.0, Sy = 1.0, Sz = 1.0;     // Size
var r = 255.0;
var g = 0.0;
var b = 0.0


canvas.onmousewheel = function (ev) {
    sizeChange(ev);
}

function sizeChange(ev) {
    if (ev.wheelDelta) {                            // IE/Opera/Chrome浏览器
        if (ev.wheelDelta > 0 && speed < max) {      // 向上滚动
            Sx += 0.25;
            Sy += 0.25;
            ;
        }
        else if (ev.wheelDelta < 0 && speed > 0) {   // 向下滚动
            Sx -= 0.25;
            Sy -= 0.25;
        }
    }
    else if (ev.detail) {                           // Firefox浏览器
        if (ev.detail > 0 && speed < max) {          // 向上滚动
            Sx += 0.25;
            Sy += 0.25;
        }
        else if (ev.detail < 0 && speed > 0) {       // 向下滚动
            Sx -= 0.25;
            Sy -= 0.25;
        }
    }
}

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('canvas');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Write the positions of vertices to a vertex shader
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");

    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    // Init end

    //书写一个可以重新绘制页面的方法
    function run() {
        //计算出sin b 和cos b的值
        var radian = Math.PI * angle / 180;
        var cosB = Math.cos(radian);
        var sinB = Math.sin(radian);

        //声明矩阵 按列主序排列
        var xformMatrix = new Float32Array([
            cosB * Sx, sinB * Sx, 0.0, 0.0,
            -sinB * Sy, cosB * Sy, 0.0, 0.0,
            0.0, 0.0, 1.0 * Sz, 0.0,
            Tx, Ty, Tz, 1.0
        ]);

        //将生产的矩阵的值传递给u_xformMatrix变量
        gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

        //绘制底色
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.LINE_LOOP, 0, n);  //gl.LINE_LOOP

        gl.uniform4f(u_FragColor, r, g, b, 1.0);

    }

    //初始化第一次绘制
    run();

    //设置定时器，进行定时更新
    setInterval(function () {
        run();
    }, 100);

    document.getElementById("left").onclick =
        function () {
            Tx -= 0.05;
        }

    document.getElementById("right").onclick =
        function () {
            Tx += 0.05;
        }

    document.getElementById("up").onclick =
        function () {
            Ty += 0.05;
        }

    document.getElementById("down").onclick =
        function () {
            Ty -= 0.05;
        }

    document.getElementById("size").onchange =
        function () {
            Sx = event.srcElement.value;
            Sy = event.srcElement.value;
            Sz = event.srcElement.value;
        }

    document.getElementById("rotation").onchange =
        function () {
            angle = event.srcElement.value;
        }

    document.getElementById("move_x").onchange =
        function () {
            Tx = event.srcElement.value;
        }

    document.getElementById("move_y").onchange =
        function () {
            Ty = event.srcElement.value;
        }

    var m = document.getElementById("color");

    m.addEventListener("click", function () {
        switch (m.selectedIndex) {
            case 0:
                r = 255.0;
                g = 0.0;
                b = 0.0;
                break;
            case 1:
                r = 255.0;
                g = 165.0;
                b = 0.0;
                break;
            case 2:
                r = 255.0;
                g = 255.0;
                b = 0.0;
                break;
            case 3:
                r = 0.0;
                g = 255.0;
                b = 0.0;
                break;
            case 4:
                r = 0.5;
                g = 127.0;
                b = 255.0;
                break;
            case 5:
                r = 0.0;
                g = 0.0;
                b = 255.0;
                break;
            case 6:
                r = 139.0;
                g = 0.0;
                b = 255.0;
                break;
        }
    })

    //设置键盘上下左右按钮移动图形
    document.addEventListener("keydown", function (event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
                // ← : small
                Sx -= 0.05;
                Sy -= 0.05;

                break;
            case 38:
                // ↑ : NULL
                break;
            case 39:
                // → : big
                Sy += 0.05;
                Sx += 0.05;

                break;
            case 40:
                // ↓ : NULL
                break;
            case 87:
                // W : move up
                Ty += 0.05;
                break;
            case 83:
                // S : move down
                Ty -= 0.05;
                break;
            case 65:
                // A : move left
                Tx -= 0.05;
                break;
            case 68:
                // D : move right
                Tx += 0.05;
                break;
            case 81:
                // Q : turn left
                angle++;
                break;
            case 69:
                // E : turn right
                angle--;
                break;
        }

        run();
    });

    // Specify the color for clearing <canvas>
    /*gl.clearColor(0, 0, 0, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.LINE_LOOP, 0, n);*/
}


function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5
    ]);
    /*var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]);*/
    var n = 4; // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}