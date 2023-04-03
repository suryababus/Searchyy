var watch = require("watch");
const { spawn } = require("child_process");

const runBuild = () => {
  console.log("rebuilding...");
  const result = spawn("node", ["build.js"]);
  console.log("build done.");
  console.clear();
  console.log("Watching...");
};
runBuild();
watch.createMonitor(
  "./src",
  function (monitor) {
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
  }
);
