import { readFileSync } from "fs";
import colors from "colors/safe";

const rows: number[][] = new Array<Array<number>>();
const cols: number[][] = new Array<Array<number>>();

function addTree(r: number, c: number, height: number) {
  if (!rows[r]) {
    rows[r] = new Array<number>();
  }
  rows[r].push(height);

  if (!cols[c]) {
    cols[c] = new Array<number>();
  }
  cols[c].push(height);
}

function isTreeVisible(r: number, c: number): boolean {
  let blocked = function(
    line: number[],
    pos: number,
    direction: 1 | -1
  ): boolean {

    if (direction == -1) {
      for (let i = pos-1; i >= 0; i--) {
        if (line[i] >= line[pos]) { return true; }
      }
    } else if (direction == 1) {
      for (let i = pos+1; i < line.length; i++) {
        if (line[i] >= line[pos]) { return true; }
      }
    }
    return false;
  }

/*  console.log(`${rows[r][c]}`);
  console.log(`blocked left = ${blocked(rows[r], c, -1)}`);
  console.log(`blocked right = ${blocked(rows[r], c, 1)}`);
  console.log(`blocked up = ${blocked(cols[c], r, -1)}`);
  console.log(`blocked down = ${blocked(cols[c], r, 1)}`);*/

  return !blocked(rows[r], c, -1) // left
    || !blocked(rows[r], c, 1)    // right
    || !blocked(cols[c], r, -1)   // up
    || !blocked(cols[c], r, 1);   // down
}

/* Count the number of interior trees visible */
function countVisibleTrees(): number {
  let count = 0;

  console.log(colors.green(rows[0].join("")));
  for (let r = 1; r < rows.length - 1; r++) {
    process.stdout.write(colors.green(String(rows[r][0])));

    for (let c = 1; c < cols.length - 1; c++) {
      if (isTreeVisible(r, c)) {
        count++;
        process.stdout.write(colors.green(String(rows[r][c])));
      } else {
        process.stdout.write(String(rows[r][c]));
      }
    }

    console.log(colors.green(String(rows[r][cols.length - 1])));
  }
  console.log(colors.green(String(rows[rows.length - 1].join(""))));

  return count;
}

function solution1() {
  const lines = readFileSync("src/eight/input.txt", "utf-8").split("\n");

  console.time("solution1");
  for (let r = 0; r < lines.length; r++) {
    let trees = lines[r].split("").map(Number);
    for (let c = 0; c < trees.length; c++) {
      addTree(r, c, trees[c]);
    }
  }

  let visible = 2*(rows.length + cols.length) - 4 + countVisibleTrees();
  console.timeEnd("solution1");

  console.log(visible);
}

function scenicScore(r: number, c: number): number {
  let viewDistance = function(
    line: number[],
    pos: number,
    direction: 1 | -1
  ): number {

    let distance = 0;
    if (direction == -1) {
      for (let i = pos-1; i >= 0; i--) {
        distance++;
        if (line[i] >= line[pos]) { return distance; }
      }
    } else if (direction == 1) {
      for (let i = pos+1; i < line.length; i++) {
        distance++;
        if (line[i] >= line[pos]) { return distance; }
      }
    }

    return distance;
  }

  let left = viewDistance(rows[r], c, -1);
  let right = viewDistance(rows[r], c, 1);
  let up = viewDistance(cols[c], r, -1);
  let down = viewDistance(cols[c], r, 1);

  //console.log(`(${r}, ${c}) left: ${left}, right: ${right}, up: ${up}, down: ${down}`);
  return left * right * up * down;
}

function solution2() {
  const lines = readFileSync("src/eight/input.txt", "utf-8").split("\n");

  console.time("solution2");
  for (let r = 0; r < lines.length; r++) {
    let trees = lines[r].split("").map(Number);
    for (let c = 0; c < trees.length; c++) {
      addTree(r, c, trees[c]);
    }
  }

  let maxScenicScore = 0;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols.length; c++) {
      let score = scenicScore(r, c);
      //console.log(`${r}, ${c}: ${score}`);
      if (score > maxScenicScore) {
        maxScenicScore = score;
      }
    }
  }
  console.timeEnd("solution2");

  console.log(maxScenicScore);
}

export function solution() {
  solution2();
}