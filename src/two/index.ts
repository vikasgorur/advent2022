import { readFileSync } from "fs";
import _ from "underscore";

enum Choice {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Outcome {
  Loss = 0,
  Draw = 3,
  Win = 6
}

// Scores of a round for player 2 (second level key)
const scores = {
  [Choice.Rock]: {
    [Choice.Rock]: Outcome.Draw,
    [Choice.Paper]: Outcome.Win,
    [Choice.Scissors]: Outcome.Loss,
  },
  [Choice.Paper]: {
    [Choice.Rock]: Outcome.Loss,
    [Choice.Paper]: Outcome.Draw,
    [Choice.Scissors]: Outcome.Win,
  },
  [Choice.Scissors]: {
    [Choice.Rock]: Outcome.Win,
    [Choice.Paper]: Outcome.Loss,
    [Choice.Scissors]: Outcome.Draw,
  }
}

interface Round {
  player1: Choice,
  player2: Choice
}

const p1Map = {
  "A": Choice.Rock,
  "B": Choice.Paper,
  "C": Choice.Scissors
}

function parseLine(p1: "A" | "B" | "C", p2: "X" | "Y" | "Z"): Round {
  const player2 = {
    "X": Choice.Rock,
    "Y": Choice.Paper,
    "Z": Choice.Scissors
  }

  return { player1: p1Map[p1], player2: player2[p2] }
}

function parseLine2(p1: "A" | "B" | "C", p2: "X" | "Y" | "Z"): Round {
  const player1 = p1Map[p1];
  const outcomeMap = {
    "X": Outcome.Loss,
    "Y": Outcome.Draw,
    "Z": Outcome.Win
  }
  const outcomeNeeded = outcomeMap[p2];

  let player2: Choice;
  for (let k of _.keys(scores[player1])) {
    // @ts-ignore
    if (scores[player1][k] == outcomeNeeded) {
      // @ts-ignore
      player2 = k;
    }
  }

  // @ts-ignore
  return { player1: player1, player2: player2 };
}

export function solution1() {
  const lines = readFileSync("src/two/input.txt", "utf-8").split("\n");
  let score = 0;

  for (let line of lines) {
    if (line) {
      let [p1, p2] = line.split(" ");
      //console.log(p1, p2);
      // @ts-ignore
      let round = parseLine(p1, p2);
      score += round.player2 + scores[round.player1][round.player2];
    }
  }

  console.log(score);
}

export function solution2() {
  const lines = readFileSync("src/two/input.txt", "utf-8").split("\n");
  let score: number = 0;

  for (let line of lines) {
    if (line) {
      let [p1, p2] = line.split(" ");
      //console.log(p1, p2);
      // @ts-ignore
      let round = parseLine2(p1, p2);
      score += Number(round.player2) + Number(scores[round.player1][round.player2]);
    }
  }

  console.log(score);
}

export function solution() {
  //solution1();
  solution2();
}