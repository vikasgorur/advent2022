import { read, readFileSync } from "fs";

function isMarker(chars: string[]): boolean {
  return new Set<string>(chars).size == chars.length;
}

function solution1() {
  const input = readFileSync("src/six/input.txt", "utf-8").trim();
  let buf = new Array<string>;

  console.time("solution1");
  let i = 0;
  for (i = 0; i < 4; i++) { buf.push(input[i]); }

  while (i < input.length) {
    if (isMarker(buf)) { console.log (i+1); console.log(buf); break; }

    i++;
    buf.shift(); buf.push(input[i]);
  }
  console.timeEnd("solution1");
}

function solution2() {
  const input = readFileSync("src/six/input.txt", "utf-8").trim();
  let buf = new Array<string>;

  console.time("solution2");
  let i = 0;
  for (i = 0; i < 14; i++) { buf.push(input[i]); }

  while (i < input.length) {
    if (isMarker(buf)) { console.log (i+1); console.log(buf); break; }

    i++;
    buf.shift(); buf.push(input[i]);
  }
  console.timeEnd("solution2");
}

export function solution() {
  solution2();
}