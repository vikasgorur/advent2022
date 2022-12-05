import { readFileSync } from "fs";
import _ from "underscore";

let stacks: string[][] = new Array<string[]>();

interface Move {
  count: number
  from: number,
  to: number,
}

function parseLine(line: string) {
  for (let i = 0; i < line.length; i += 4) {
    if (line[i] == "[") {
      let whichStack = (i / 4) + 1;
      if (!stacks[whichStack]) {
        stacks[whichStack] = new Array<string>();
      }

      // add to beginning of array so that push() & pop() later work 
      // as expected
      stacks[whichStack].unshift(line[i + 1]);
    }
  }
}

function parseMove(line: string): Move {
  let regex = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/;
  let result = line.match(regex);

  let count = 0;
  let from = 0;
  let to = 0;

  if (result) {
    count = Number(result.groups?.count);
    from = Number(result.groups?.from);
    to = Number(result.groups?.to);
  }

  return {
    count: count,
    from: from,
    to: to
  };
}

function runMove1(move: Move) {
  for (let i = 0; i < move.count; i++) {
    let item = stacks[move.from].pop() as string;
    stacks[move.to].push(item);
  }
}

function runMove2(move: Move) {
  let items = [];
  for (let i = 0; i < move.count; i++) {
    items.push(stacks[move.from].pop() as string);
  }
  for (let i of items.reverse()) {
    stacks[move.to].push(i);
  }
}

export function solution() {
  const lines = readFileSync("src/five/input.txt", "utf-8").split("\n");

  for (let l of lines) {
    if (l.indexOf("[") != -1) {
      parseLine(l);
    } else if (l.indexOf("move") != -1) {
      runMove2(parseMove(l));
    } else {
      // do nothing - blank line or the line with "1 2 3 ..."
    }
  }

  let tops = "";
  for (let st of stacks) {
    if (st) {
      tops += st.pop();
    }
  }
  console.log(tops);
}