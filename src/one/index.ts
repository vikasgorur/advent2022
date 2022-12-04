import { readFileSync } from "fs";
import _ from "underscore";

interface Elf {
  items: number[],
  totalCalories: number
}

function readInput(): Elf[] {
  const lines = readFileSync("src/one/input.txt", "utf-8").split("\n");
  
  let elves: Elf[] = Array();
  let items: number[] = [];
  let total: number = 0;

  for (let l of lines) {
    let n = Number(l);

    if (n == 0) {
      elves.push({ items: items, totalCalories: total });
      items = [];
      total = 0;
    } else {
      items.push(n);
      total += n;
    }
  }

  return elves;
}

export function solution() {
  const elves = readInput();
  // part 1
  console.log(_.max(_.pluck(elves, "totalCalories")));

  // part 2
  const top3 = _.reduce(
    _.pluck(elves, "totalCalories").sort().reverse().slice(0, 3),
    (sum, x) => sum+x,
    0
  );
  console.log(top3);
}
