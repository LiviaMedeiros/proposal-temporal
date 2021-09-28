// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.calendar.prototype.inleapyear
description: Throw a TypeError if the receiver is invalid
features: [Symbol, Temporal]
---*/

const inLeapYear = Temporal.Calendar.prototype.inLeapYear;

assert.sameValue(typeof inLeapYear, "function");

assert.throws(TypeError, () => inLeapYear.call(undefined), "undefined");
assert.throws(TypeError, () => inLeapYear.call(null), "null");
assert.throws(TypeError, () => inLeapYear.call(true), "true");
assert.throws(TypeError, () => inLeapYear.call(""), "empty string");
assert.throws(TypeError, () => inLeapYear.call(Symbol()), "symbol");
assert.throws(TypeError, () => inLeapYear.call(1), "1");
assert.throws(TypeError, () => inLeapYear.call({}), "plain object");
assert.throws(TypeError, () => inLeapYear.call(Temporal.Calendar), "Temporal.Calendar");
assert.throws(TypeError, () => inLeapYear.call(Temporal.Calendar.prototype), "Temporal.Calendar.prototype");