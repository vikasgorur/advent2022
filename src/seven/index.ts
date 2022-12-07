import { readFileSync } from "fs";
import _ from "underscore";

enum DirentType {
  FILE,
  DIR
}

interface Dirent {
  name: string,
  type: DirentType,
  children: Dirent[]

  /* For a file this is its own size; for a dir its the size of all its children (recursively) */
  size: number
}

const root: Dirent = {
  name: "/",
  type: DirentType.DIR,
  children: [],
  size: 0
}

let cwds: Dirent[] = [root];

function runLs(output: string[]) {
  for (let line of output) {
    let [first, second] = line.split(" ");
    let node: Dirent;

    if (first == "dir") {
      node = { name: second, type: DirentType.DIR, children: [], size: 0 };
    } else {
      node = { name: second, type: DirentType.FILE, children: [], size: Number(first) }
    }
    _.last(cwds)?.children?.push(node);
  }
}

function findInChildren(name: string, children: Dirent[]): Dirent | undefined {
  return _.find(children, (e) => e.name == name);
}

function runCd(cmd: string) {
  let [_dont_care, name] = cmd.split(" ");

  if (name == "..") {
    cwds.pop();
  } else if (name != "/") {
    let cwd = _.last(cwds) as Dirent;
    let node = findInChildren(name, cwd.children);
    cwds.push(node as Dirent);
  }
}

let lessThan100k: number[] = [];

function dirSize(d: Dirent): number {
  for (let c of d.children) {
    if (c.type == DirentType.FILE) {
      d.size += c.size;
    } else {
      d.size += dirSize(c);
    }
  }

  if (d.size < 100_000) {
    lessThan100k.push(d.size);
  }
  return d.size;
}

function processInput() {
  const commands = readFileSync("src/seven/input.txt", "utf-8")
    .replace("$ ", "") // remove the $ on the first line
    .split("\n$");

  for (let c of commands) {
    let lines = c.split("\n");
    let cmd = lines[0].trim();

    let output: string[] = [];
    if (lines.length > 1) {
      output = lines.slice(1);
    }

    if (cmd.startsWith("cd")) {
      runCd(cmd);
    } else if (cmd.startsWith("ls")) {
      runLs(output);
    }
  }

  dirSize(root);
}

function solution1() {
  console.log(_.reduce(lessThan100k, (total: number, x: number) => x + total));
}

let allSizes: Dirent[] = [];

function gatherSizes(d: Dirent) {
  allSizes.push(d);
  for (let e of d.children) {
    if (e.type == DirentType.DIR) {
      gatherSizes(e);
    }
  }
}

function solution2() {
  gatherSizes(root);

  let spaceNeeded = 30_000_000 - (70_000_000 - root.size);
  allSizes = _.sortBy(allSizes, (d) => d.size);

  let toDelete = _.find(allSizes, (d) => d.size >= spaceNeeded);
  console.log(toDelete?.size);
}

export function solution() {
  processInput();
  solution1();
  solution2();
}