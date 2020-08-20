export function randomError() {
  const errors = [
    "The goose got loose",
    "Hackers are in the mainframe",
    "The system is busy",
    "Rebels are infiltrating the Death Star",
    "There was an unknown error",
    "Try again",
    "Low system power",
    "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
  ];

  return errors[Math.floor(Math.random() * errors.length)];
}
