class Gen {
    constructor() {
        // let scale = 24
        // let cells = [0,0];
        // for(let i=0; i<scale; i++){
        //     for(let j=0; j<scale; j++){
        //         this.cells.push(0);
        //     }
        // }
        this.cells = [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        ];
    }

/*
ライフゲームのルール
- 現世代のセルの状態  |  まわりのセルの状態  | 　次の世代になるセルの状態
- 死                     生 * 3                  生
- 生                     生 * 1                  死
- 生                     生 * 2                  生
*/
    next() {
        let t = this;
        let n = new Gen();
        for(let i=0; i < t.cells.length; i++) {
            let L = t.livesAround(...t.indexToXy(i));
            if(t.cells[i] === 0){
                // 現世代で死んでいるセルは...
                // 3個の生きてるセルに囲まれたら生まれる
                n.cells[i] = (L === 3) ? 1:0;
            } else {
                // 現世代で生きているセルは...
                // 2個か３個の生きてるセルに囲まれていれば生存、それ以外なら死
                n.cells[i] = (L === 2 || L === 3) ? 1:0;
            }
        }
        return n;
    }

    livesAround(x, y) {
        let L = 0;
        for(let a=x-1; a<=x+1; a++) {
            for(let b=y-1; b<=y+1; b++) {
                let i = this.xyToIndex(a, b);
                L += (i === -1) ? 0 : this.cells[i];
            }
        }
        L -= this.cells[this.xyToIndex(x, y)];
        return L;
    }

    xyToIndex(x, y) {
        let w = sqrt(this.cells.length);
        if(x<0 || x>=w || y<0 || y>=w) return -1;

        return y*w + x;
    }

    indexToXy(i) {
        let w = sqrt(this.cells.length);
        let x = i%w;
        let y = floor(i/w);

        return [x, y];
    }

    draw() {
        // セルの描画
        stroke(0, 0, 0);
        strokeWeight(1);

        for (let [i,c] of this.cells.entries()) {
            let [x, y] = this.indexToXy(i);
            let w = height/sqrt(this.cells.length);

            if(c === 1){
                // console.log(x, y)
                fill(255, 102, 102);
            } else {
                fill(255, 255, 255);
            }

            rect(w*x, w*y, w, w);
        }
    }
}

let g = new Gen();
let isStart = false;

function setup() {
    createCanvas(480, 480);
    redrawAll();
}

function redrawAll() {
    background(0, 204, 153);
    g.draw();
}

// function mousePressed() {
//     g = g.next();
//     redrawAll();
// }

function setCells() {
    if (mouseIsPressed == true) {
        let mouse_x = mouseX;
        let mouse_y = mouseY;
        // console.log(m_x, m_y);

        let w = height/sqrt(g.cells.length);
        let n_x = mouse_x - mouse_x%w;
        n_x = n_x/w;
        let n_y = mouse_y - mouse_y%w;
        n_y = n_y/w;

        let i = g.xyToIndex(n_x, n_y);
        g.cells[i] = 1;
        redrawAll();
    }
}

function OnButtonClick() {
    isStart = !isStart;
    if (isStart) {
        document.getElementById("btn").value = "Pause";
    } else {
        document.getElementById("btn").value = "Start";
    }
}

function draw() {
    if (isStart) {
        if(frameCount%10 === 9) {
            g = g.next();
            redrawAll();
        }
    }
    setCells();
}
