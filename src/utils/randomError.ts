import errorMessages from "../data/errorMessages.json";

export function randomError() {
  return errorMessages[Math.floor(Math.random() * errorMessages.length)];
}
