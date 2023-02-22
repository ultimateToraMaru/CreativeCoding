function setup() {
  createCanvas(windowWidth, windowHeight);

  strokeWeight(10);   // ふちの太さ
  stroke(100);        // ふちの色
  fill(240);          // 塗りの色

  // noFill();           // 塗りなし
  // noStroke();         // ふちなし

  circle(width / 2, height / 2, 300); // 円
}

function draw() {
  clear();
  // マウス座標に円を描く
  circle(mouseX, mouseY, 50 - (mouseX-mouseY));
}

// // 円が上に上昇するアニメーション
// let minus = 0;
// function draw() {
//   clear();
//   minus++;
//   circle(width / 2, height / 2 - minus, 50);
// }
