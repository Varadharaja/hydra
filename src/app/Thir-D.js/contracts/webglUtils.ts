import { Plane } from './plane';
import { GxUtils } from './gxUtils';

export class WebglUtils
{
    static canvas: any;
    static gl: any;
    static proj_matrix: any;
    static mov_matrix: any;
    static view_matrix: any;
    static Pmatrix: any;
    static Vmatrix: any;
    static Mmatrix: any;
    static index_buffer: any;
    indices: any;
    vertex_buffer: any;
    color_buffer: any;
    static verticesLength = 0;
    static doAnimate = false;
    static time_old = 0;
    VXS: any;
    CLRS: any;
    vertCode: any;
    fragCode: any;
    vertShader: any; 
    fragShader: any;
    shaderProgram: any;
    constructor(){}


    Initialize(canvasId: string)
    {
        /*============= Creating a canvas =================*/
        WebglUtils.canvas = document.getElementById(canvasId);
        WebglUtils.gl = WebglUtils.canvas.getContext('webgl2');
        this.vertex_buffer = WebglUtils.gl.createBuffer ();
        WebglUtils.index_buffer = WebglUtils.gl.createBuffer ();
        this.color_buffer = WebglUtils.gl.createBuffer ();
        /*=================== Shaders =========================*/

        this.vertCode = 'attribute vec3 position;'+
        'uniform mat4 Pmatrix;'+
        'uniform mat4 Vmatrix;'+
        'uniform mat4 Mmatrix;'+
        'attribute vec3 color;'+//the color of the point
        'varying vec3 vColor;'+

        'void main(void) { '+//pre-built function
            'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
            'vColor = color;'+
        '}';

        this.fragCode = 'precision mediump float;'+
        'varying vec3 vColor;'+
        'void main(void) {'+
            'gl_FragColor = vec4(vColor, 1.);'+
        '}';

        this.vertShader = WebglUtils.gl.createShader(WebglUtils.gl.VERTEX_SHADER);
        WebglUtils.gl.shaderSource(this.vertShader, this.vertCode);
        WebglUtils.gl.compileShader(this.vertShader);

        this.fragShader = WebglUtils.gl.createShader(WebglUtils.gl.FRAGMENT_SHADER);
        WebglUtils.gl.shaderSource(this.fragShader, this.fragCode);
        WebglUtils.gl.compileShader(this.fragShader);

        this.shaderProgram = WebglUtils.gl.createProgram();
        WebglUtils.gl.attachShader(this.shaderProgram, this.vertShader);
        WebglUtils.gl.attachShader(this.shaderProgram, this.fragShader);
        WebglUtils.gl.linkProgram(this.shaderProgram);

    }

    SetWebGLParams(planes: Plane[])
    {
        let vertices = [
           -1,-1,-1, 1,-1,-1, 1, 1,-1, -1, 1,-1 ,
            -1,-1, 1, 1,-1, 1, 1, 1, 1, -1, 1, 1,
           -1,-1,-1, -1, 1,-1, -1, 1, 1, -1,-1, 1,
           1,-1,-1, 1, 1,-1, 1, 1, 1, 1,-1, 1,
           -1,-1,-1, -1,-1, 1, 1,-1, 1, 1,-1,-1,
           -1, 1,-1, -1, 1, 1, 1, 1, 1, 1, 1,-1, 
        ];

        let colors = [
           5,3,7, 5,3,7, 5,3,7, 5,3,7,
           1,1,3, 1,1,3, 1,1,3, 1,1,3,
           0,0,1, 0,0,1, 0,0,1, 0,0,1,
           1,0,0, 1,0,0, 1,0,0, 1,0,0,
           1,1,0, 1,1,0, 1,1,0, 1,1,0,
           0,1,0, 0,1,0, 0,1,0, 0,1,0
        ];

        let indices = [
           0,1,2, 0,2,3, 4,5,6, 4,6,7,
           8,9,10, 8,10,11, 12,13,14, 12,14,15,
           16,17,18, 16,18,19, 20,21,22, 20,22,23 
        ];

        let vxs = [];
        let idxs = [];
        let vxLen = 0;
        colors = [];
        let vtx_pts = new Array();

        for (let plCnt= 0; plCnt<  planes.length; plCnt++)
        {


            if (planes[plCnt].Points.length == 4)
            {
               let pts = planes[plCnt].Points;
               let idx = vxs.length/3-1;

               vxs.push(pts[0].x, pts[0].y, pts[0].z);
               vxLen++;
               vxs.push(pts[1].x, pts[1].y, pts[1].z);
               vxLen++;
               vxs.push(pts[2].x, pts[2].y, pts[2].z);
               vxLen++;
               vxs.push(pts[0].x, pts[0].y, pts[0].z);
               vxLen++;
               vxs.push(pts[2].x, pts[2].y, pts[2].z);
               vxLen++;
               vxs.push(pts[3].x, pts[3].y, pts[3].z);
               vxLen++;

               idxs.push(idx+1,idx+2, idx+3);
               idxs.push(idx+1,idx+3, idx+4);

               let clr = planes[plCnt].Color;
               let r = clr.red;
               let g = clr.green;
               let b = clr.blue;

               let intensity = 0.1;
               let r1 = clr.red - intensity;
               let g1 = clr.green - intensity;
               let b1 = clr.blue - intensity;

               {
                  colors.push(r, g,b);
                  colors.push(r1, g1,b1);
                  colors.push(r, g,b);
                  colors.push(r, g,b);
                  colors.push(r, g,b)
                  colors.push(r, g,b);
               }
            }
            else
            {
               let idx = vxs.length;
               let centroid = GxUtils.GetCentroid([planes[plCnt]]);
               let centroidVxIdx =vxLen;

               for (let ptCnt=1; ptCnt < planes[plCnt].Points.length; ptCnt++ )
               {
                   vxLen++;
                   if (ptCnt ==  planes[plCnt].Points.length-1)
                   {
                        vxs.push(planes[plCnt].Points[ptCnt].x,planes[plCnt].Points[ptCnt].y,planes[plCnt].Points[ptCnt].z);
                        vxs.push(centroid.x,centroid.y,centroid.z);
                        vxs.push(planes[plCnt].Points[0].x,planes[plCnt].Points[0].y,planes[plCnt].Points[0].z);

                   }
                   else
                   {
                     vxs.push(planes[plCnt].Points[ptCnt-1].x,planes[plCnt].Points[ptCnt-1].y,planes[plCnt].Points[ptCnt-1].z);
                     vxs.push(centroid.x,centroid.y,centroid.z);
                     vxs.push(planes[plCnt].Points[ptCnt].x,planes[plCnt].Points[ptCnt].y,planes[plCnt].Points[ptCnt].z);
                   }

                   let clr = planes[plCnt].Color;
                   let r = clr.red;
                   let g = clr.green;
                   let b = clr.blue;
                   colors.push(r, g,b);
                   colors.push(r, g,b);
                   colors.push(r, g,b);
               }

            }
        }
        vertices = vxs;
        WebglUtils.verticesLength = vertices.length;
        

        /*============ Defining and storing the geometry =========*/


        this.VXS = new Float32Array(vertices);
        this.CLRS = new Float32Array(colors);
        // Create and store data into vertex buffer
        WebglUtils.gl.bindBuffer(WebglUtils.gl.ARRAY_BUFFER, this.vertex_buffer);
        WebglUtils.gl.bufferData(WebglUtils.gl.ARRAY_BUFFER, this.VXS , WebglUtils.gl.STATIC_DRAW);

        // Create and store data into color buffer
        WebglUtils.gl.bindBuffer(WebglUtils.gl.ARRAY_BUFFER, this.color_buffer);
        WebglUtils.gl.bufferData(WebglUtils.gl.ARRAY_BUFFER,this.CLRS , WebglUtils.gl.STATIC_DRAW);

        // Create and store data into index buffer
        WebglUtils.gl.bindBuffer(WebglUtils.gl.ELEMENT_ARRAY_BUFFER, WebglUtils.index_buffer);
        WebglUtils.gl.bufferData(WebglUtils.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), WebglUtils.gl.STATIC_DRAW);


        /* ====== Associating attributes to vertex shader =====*/
        WebglUtils.Pmatrix = WebglUtils.gl.getUniformLocation(this.shaderProgram, "Pmatrix");
        WebglUtils.Vmatrix = WebglUtils.gl.getUniformLocation(this.shaderProgram, "Vmatrix");
        WebglUtils.Mmatrix = WebglUtils.gl.getUniformLocation(this.shaderProgram, "Mmatrix");

        WebglUtils.gl.bindBuffer(WebglUtils.gl.ARRAY_BUFFER, this.vertex_buffer);
        let position = WebglUtils.gl.getAttribLocation(this.shaderProgram, "position");
        WebglUtils.gl.vertexAttribPointer(position, 3, WebglUtils.gl.FLOAT, false,0,0) ;

        // Position
        WebglUtils.gl.enableVertexAttribArray(position);
        WebglUtils.gl.bindBuffer(WebglUtils.gl.ARRAY_BUFFER, this.color_buffer);
        let color = WebglUtils.gl.getAttribLocation(this.shaderProgram, "color");
        WebglUtils.gl.vertexAttribPointer(color, 3, WebglUtils.gl.FLOAT, false,0,0) ;

        // Color
        WebglUtils.gl.enableVertexAttribArray(color);
        WebglUtils.gl.useProgram(this.shaderProgram);

        WebglUtils.proj_matrix = this.get_projection(45, WebglUtils.canvas.width/WebglUtils.canvas.height, 1, 1000);

        WebglUtils.mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
        WebglUtils.view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

        // translating z
        WebglUtils.view_matrix[14] = WebglUtils.view_matrix[14]-6;//zoom

    }
        /*==================== MATRIX =====================*/

        get_projection(angle: number, a: number, zMin: number, zMax: number) {
           let ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
           return [
              0.5/ang, 0 , 0, 0,
              0, 0.5*a/ang, 0, 0,
              0, 0, -(zMax+zMin)/(zMax-zMin), -1,
              0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
           ];
        }


        /*==================== Rotation ====================*/

        static rotateZ(m: any, angle: number) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv0 = m[0], mv4 = m[4], mv8 = m[8];

           m[0] = c*m[0]-s*m[1];
           m[4] = c*m[4]-s*m[5];
           m[8] = c*m[8]-s*m[9];

           m[1]=c*m[1]+s*mv0;
           m[5]=c*m[5]+s*mv4;
           m[9]=c*m[9]+s*mv8;
        }

        static rotateX(m: any, angle: number) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv1 = m[1], mv5 = m[5], mv9 = m[9];

           m[1] = m[1]*c-m[2]*s;
           m[5] = m[5]*c-m[6]*s;
           m[9] = m[9]*c-m[10]*s;

           m[2] = m[2]*c+mv1*s;
           m[6] = m[6]*c+mv5*s;
           m[10] = m[10]*c+mv9*s;
        }

        static rotateY(m: any, angle: number) {
           let c = Math.cos(angle);
           let s = Math.sin(angle);
           let mv0 = m[0], mv4 = m[4], mv8 = m[8];

           m[0] = c*m[0]+s*m[2];
           m[4] = c*m[4]+s*m[6];
           m[8] = c*m[8]+s*m[10];

           m[2] = c*m[2]-s*mv0;
           m[6] = c*m[6]-s*mv4;
           m[10] = c*m[10]-s*mv8;
        }

        /*================= Drawing ===========================*/

        static animate(time: number) {
            if (WebglUtils.doAnimate)
            {
                let dt = time-WebglUtils.time_old;
                WebglUtils.time_old = time;

                WebglUtils.gl.enable(WebglUtils.gl.DEPTH_TEST);
                WebglUtils.gl.depthFunc(WebglUtils.gl.LEQUAL);
                WebglUtils.gl.clearColor(1, 1, 1, 1);
                WebglUtils.gl.clearDepth(1.0);

                WebglUtils.gl.viewport(0.0, 0.0, WebglUtils.canvas.width, WebglUtils.canvas.height);
                WebglUtils.gl.clear(WebglUtils.gl.COLOR_BUFFER_BIT | WebglUtils.gl.DEPTH_BUFFER_BIT);
                WebglUtils.gl.uniformMatrix4fv(WebglUtils.Pmatrix, false, WebglUtils.proj_matrix);
                WebglUtils.gl.uniformMatrix4fv(WebglUtils.Vmatrix, false, WebglUtils.view_matrix);
                WebglUtils.gl.uniformMatrix4fv(WebglUtils.Mmatrix, false, WebglUtils.mov_matrix);
                WebglUtils.gl.bindBuffer(WebglUtils.gl.ELEMENT_ARRAY_BUFFER, WebglUtils.index_buffer);
                WebglUtils.gl.drawArrays(WebglUtils.gl.TRIANGLES,0,WebglUtils.verticesLength/3);
                window.requestAnimationFrame(WebglUtils.animate);
            }
        }

    }
