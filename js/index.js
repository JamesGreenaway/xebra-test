// @ts-check
/**
 *
 * @typedef { import("./index").Pet } Pet
 * @typedef { import("./index").Dog } Dog
 */

// @ts-ignore
const xebra = Xebra;
const { SUPPORTED_OBJECTS } = xebra;

const UNSUPPORTED_OBJECTS = [
  "mira.channel",
  "mira.frame",
  "mira.motion",
  "jpatcher",
  "patcherview",
];

const supportedObjects = SUPPORTED_OBJECTS.filter(
  (/** @type {string} */ x) => !UNSUPPORTED_OBJECTS.includes(x)
);

var options = {
  hostname: "192.168.0.11", // localhost
  port: 8086,
  supported_objects: supportedObjects,
};
var xebraState = new xebra.State(options);

xebraState.on("object_added", function (object) {
  console.log("Added new object", object._type);
});

xebraState.on("object_removed", function (object) {
  console.log("Removed an object", object._type);
});

xebraState.connect();

xebraState.on("loaded", () => {
  let patchers = xebraState.getPatchers();
  patchers.forEach((patcher) => {
    console.log("Patcher", patcher.name);
  });
});
