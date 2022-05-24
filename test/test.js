"use strict";

import assert from "assert";
import path from "path";
import generate from "markdown-it-testgen";

describe("markdown-it-imsize", function () {
  var md = require("markdown-it")({
    html: true,
    linkify: true,
    typography: true,
  }).use(require("../lib"));
  generate(path.join(__dirname, "fixtures/markdown-it-imsize/imsize.txt"), md);
});

describe("markdown-it-imsize (chained)", function () {
  var md = require("markdown-it")({
    html: true,
    linkify: true,
    typography: true,
  })
    .use(require("../lib"))
    .use(function (md, config) {
      md.renderer.rules.image = function (tokens, idx, _options, _env, _self) {
        var token = tokens[idx];
        assert.equal(token.content, "test alt value");
      };
    });

  it("preserves token content", function () {
    md.render("![test alt value](https://image.com/image.png)");
  });
});
