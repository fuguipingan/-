let obj1 = {
  presets: ["@vue/cli-plugin-babel/preset"]

};
let obj2 = {
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
module.exports = obj1;
