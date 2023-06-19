import kleur from "kleur";

export function logError(title: string, message: any) {
  console.log(kleur.bold().red(title), message);
  console.log(kleur.bgRed("==================="));
}
export function logSuccess(title: string, message: any) {
  console.log(kleur.bold().green(title), message);
  console.log(kleur.bgGreen("==================="));
}
export function logNormal(title: string, message: any) {
  console.log(kleur.bold().blue(title), message);
  console.log(kleur.bgBlue("==================="));
}
export function logWarning(title: string, message: any) {
  console.log(kleur.bold().yellow(title), message);
  console.log(kleur.bgYellow("==================="));
}
