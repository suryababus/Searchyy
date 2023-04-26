//Profiler function to track time taken for given function to execute with one argument

export function ProfileFunction(
  functionName: string,
  functionToProfile: Function,
  functionArg: any
) {
  let startTime = new Date().getTime();
  functionToProfile(functionArg);
  let endTime = new Date().getTime();
  let timeTaken = endTime - startTime;
}
