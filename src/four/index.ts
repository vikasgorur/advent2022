import { readFileSync } from "fs";
import _ from "underscore";

interface Span {
  start: number,
  end: number
}

interface Pair {
  s1: Span,
  s2: Span
}

export function fullyContained(p: Pair): boolean {
  let small: Span, big: Span;
  if ((p.s1.end - p.s1.start) <= (p.s2.end - p.s2.start)) {
    small = p.s1; big = p.s2;
  } else {
    small = p.s2; big = p.s1;
  }

  return (small.start >= big.start) && (small.end <= big.end);
}

function areDisjoint(p: Pair): boolean {
  return (p.s1.end < p.s2.start) || (p.s2.end < p.s1.start);
}

function parseLine(line: string): Pair {
  let [e1, e2] = line.split(",");
  let [start1, end1] = e1.split("-").map(Number);
  let [start2, end2] = e2.split("-").map(Number);

  return {
    s1: { start: start1, end: end1 },
    s2: { start: start2, end: end2 }
  }
}

export function solution() {
  const lines = readFileSync("src/four/input.txt", "utf-8").split("\n");

  console.time("solution1");
  let count1 = 0;
  for (let line of lines) {
    if (line && fullyContained(parseLine(line))) {
      count1++;
    }
  }
  console.timeEnd("solution1");
  console.log(count1);

  console.time("solution2");
  let count2 = 0;
  for (let line of lines) {
    if (line && !areDisjoint(parseLine(line))) {
      count2++;
    }
  }
  console.timeEnd("solution2");
  console.log(count2);
}