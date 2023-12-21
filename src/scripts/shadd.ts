import { exec, execSync } from "child_process";

function insatllShadcnComponents(){
//  get cli args
const args = process?.argv?.slice(2);
if(args.length == 0){
 console.log('please provide a component name');
 process.exit(1);
}
exec(`npx shadcn-ui@latest add ${args.join(' ')}`,{},(err, stdout, stderr) => {
  if (err) {
    console.log(`error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
})
exec(`npx daisify shadcn`,{},(err, stdout, stderr) => {
  if (err) {
    console.log(`error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
}

insatllShadcnComponents()
