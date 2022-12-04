import { readFileSync } from "fs";
import _ from "underscore";

function itemPriority(it: string): number {
  if (it >= "A" && it <= "Z") {
    return it.charCodeAt(0) - 65 + 27;
  } else if (it >= "a" && it <= "z") {
    return it.charCodeAt(0) - 97 + 1;
  } else {
    return 0; // shouldn't happen
  }
}

function priorityForLine(line: number[]): number {
  let c1: boolean[] = new Array<boolean>(53);
  let c2: boolean[] = new Array<boolean>(53);

  let cutoff = line.length / 2;
  let answer = 0;

  line.forEach((n, i) => {
    if (i < cutoff) {
      c1[n] = true;
    } else {
      c2[n] = true;
      if (c1[n] && c2[n]) {
        answer = n;
      }
    }
  });
  return answer;
}

function badgeForGroup(lines: number[][]): number {
  let e1: boolean[] = new Array<boolean>(53);
  let e2: boolean[] = new Array<boolean>(53);
  let e3: boolean[] = new Array<boolean>(53);

  let answer = 0;

  lines[0].forEach((n, i) => e1[n] = true);
  lines[1].forEach((n, i) => e2[n] = true);
  lines[2].forEach((n, i) => {
    e3[n] = true;
    if (e1[n] && e2[n] && e3[n]) {
      answer = n;
    }
  });

  return answer;
}

function solution1() {
  const lines = readFileSync("src/three/input.txt", "utf-8").split("\n");

  let sum = 0;
  for (let l of lines) {
    let line: number[] = _.map(l.split(""), itemPriority);
     sum += priorityForLine(line);
  }

  console.log(sum);
}

function solution2() {
  const lines = readFileSync("src/three/input.txt", "utf-8").split("\n");

  let sum = 0;
  let i = 0;
  while (i < lines.length - 3) {
    let slice = lines.slice(i, i+3);
    let group = _.map(slice, (line) => _.map(line.split(""), itemPriority));
    sum += badgeForGroup(group);
    i += 3;
  }

  console.log(sum);
}

export function solution() {
  solution1();
  solution2();
}