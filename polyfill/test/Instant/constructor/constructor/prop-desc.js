// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.instant
description: The "Instant" property of Temporal
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(
  typeof Temporal.Instant,
  "function",
  "`typeof Instant` is `function`"
);

verifyProperty(Temporal, "Instant", {
  writable: true,
  enumerable: false,
  configurable: true,
});