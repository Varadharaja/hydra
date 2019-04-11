import { Plane } from './plane';
import { GxUtils } from './gxUtils';

export class WebglUtils
{
    canvas: any;
    gl: any;
    proj_matrix: any;
    mov_matrix: any;
    view_matrix: any;
    Pmatrix: any;
    Vmatrix: any;
    Mmatrix: any;
    index_buffer: any;
    indices: any;
    vertex_buffer: any;
    color_buffer: any;
    verticesLength = 0;
    doAnimate = false;
    time_old = 0;
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
        this.canvas = document.getElementById(canvasId);
        this.gl = this.canvas.getContext('webgl2');
        this.vertex_buffer = this.gl.createBuffer ();
        this.index_buffer = this.gl.createBuffer ();
        this.color_buffer = this.gl.createBuffer ();
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

        this.vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertShader, this.vertCode);
        this.gl.compileShader(this.vertShader);

        this.fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fragShader, this.fragCode);
        this.gl.compileShader(this.fragShader);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, this.vertShader);
        this.gl.attachShader(this.shaderProgram, this.fragShader);
        this.gl.linkProgram(this.shaderProgram);

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
        this.verticesLength = vertices.length;
        

        /*============ Defining and storing the geometry =========*/


        this.VXS = new Float32Array(vertices);
        this.CLRS = new Float32Array(colors);
        // Create and store data into vertex buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.VXS , this.gl.STATIC_DRAW);

        // Create and store data into color buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,this.CLRS , this.gl.STATIC_DRAW);

        // Create and store data into index buffer
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);


        /* ====== Associating attributes to vertex shader =====*/
        this.Pmatrix = this.gl.getUniformLocation(this.shaderProgram, "Pmatrix");
        this.Vmatrix = this.gl.getUniformLocation(this.shaderProgram, "Vmatrix");
        this.Mmatrix = this.gl.getUniformLocation(this.shaderProgram, "Mmatrix");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer);
        let position = this.gl.getAttribLocation(this.shaderProgram, "position");
        this.gl.vertexAttribPointer(position, 3, this.gl.FLOAT, false,0,0) ;

        // Position
        this.gl.enableVertexAttribArray(position);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        let color = this.gl.getAttribLocation(this.shaderProgram, "color");
        this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false,0,0) ;

        // Color
        this.gl.enableVertexAttribArray(color);
        this.gl.useProgram(this.shaderProgram);

        this.proj_matrix = this.get_projection(45, this.canvas.width/this.canvas.height, 1, 1000);

        this.mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
        this.view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

        // translating z
        this.view_matrix[14] = this.view_matrix[14]-6;//zoom

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

        rotateZ(m: any, angle: number) {
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

        rotateX(m: any, angle: number) {
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

        rotateY(m: any, angle: number) {
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

        animate(time: number) {
            if (this.doAnimate)
            {
                let dt = time-this.time_old;
                this.time_old = time;

                this.gl.enable(this.gl.DEPTH_TEST);
                this.gl.depthFunc(this.gl.LEQUAL);
                this.gl.clearColor(1, 1, 1, 1);
                this.gl.clearDepth(1.0);

                this.gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                this.gl.uniformMatrix4fv(this.Pmatrix, false, this.proj_matrix);
                this.gl.uniformMatrix4fv(this.Vmatrix, false, this.view_matrix);
                this.gl.uniformMatrix4fv(this.Mmatrix, false, this.mov_matrix);
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
                this.gl.drawArrays(this.gl.TRIANGLES,0,this.verticesLength/3);
                window.requestAnimationFrame(this.animate);
            }
        }

    }
