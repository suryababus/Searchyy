var watch = require("watch");
const { spawn } = require("child_process");

const runBuild = () => {
  console.clear();
  console.log("rebuilding...");
  const result = spawn("node", ["build.js"]);
  result.stdout.on("data", (data) => {
    console.log(`Info:\n${data}`);
  });

  result.stderr.on("data", (data) => {
    console.error(`Error:\n${data}`);
  });

  result.on("exit", (code, signal) => {
    console.log("build done with code ", code, signal);
    console.log("Watching...");
  });
};
runBuild();
watch.createMonitor("./src", function (monitor) {
  monitor.on("created", function (f, stat) {
    // Handle new files
    console.log("created");
    runBuild();
  });
  monitor.on("changed", function (f, curr, prev) {
    // Handle file changes
    console.log("changed");
    runBuild();
  });
  monitor.on("removed", function (f, stat) {
    // Handle removed files
    console.log("removed");
    runBuild();
  });
});
