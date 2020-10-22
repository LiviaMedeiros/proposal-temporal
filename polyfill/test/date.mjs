#! /usr/bin/env -S node --experimental-modules

/*
 ** Copyright (C) 2018-2019 Bloomberg LP. All rights reserved.
 ** This code is governed by the license found in the LICENSE file.
 */

import Demitasse from '@pipobscure/demitasse';
const { describe, it, report } = Demitasse;

import Pretty from '@pipobscure/demitasse-pretty';
const { reporter } = Pretty;

import { strict as assert } from 'assert';
const { equal, notEqual, throws } = assert;

import * as Temporal from 'proposal-temporal';
const { Date } = Temporal;

describe('Date', () => {
  describe('Structure', () => {
    it('Date is a Function', () => {
      equal(typeof Date, 'function');
    });
    it('Date has a prototype', () => {
      assert(Date.prototype);
      equal(typeof Date.prototype, 'object');
    });
    describe('Date.prototype', () => {
      it('Date.prototype has year', () => {
        assert('year' in Date.prototype);
      });
      it('Date.prototype has month', () => {
        assert('month' in Date.prototype);
      });
      it('Date.prototype has day', () => {
        assert('day' in Date.prototype);
      });
      it('Date.prototype has dayOfWeek', () => {
        assert('dayOfWeek' in Date.prototype);
      });
      it('Date.prototype has dayOfYear', () => {
        assert('dayOfYear' in Date.prototype);
      });
      it('Date.prototype has weekOfYear', () => {
        assert('weekOfYear' in Date.prototype);
      });
      it('Date.prototype has daysInWeek', () => {
        assert('daysInWeek' in Date.prototype);
      });
      it('Date.prototype has monthsInYear', () => {
        assert('monthsInYear' in Date.prototype);
      });
      it('Date.prototype.with is a Function', () => {
        equal(typeof Date.prototype.with, 'function');
      });
      it('Date.prototype.add is a Function', () => {
        equal(typeof Date.prototype.add, 'function');
      });
      it('Date.prototype.subtract is a Function', () => {
        equal(typeof Date.prototype.subtract, 'function');
      });
      it('Date.prototype.difference is a Function', () => {
        equal(typeof Date.prototype.difference, 'function');
      });
      it('Date.prototype.equals is a Function', () => {
        equal(typeof Date.prototype.equals, 'function');
      });
      it('Date.prototype.toDateTime is a Function', () => {
        equal(typeof Date.prototype.toDateTime, 'function');
      });
      it('Date.prototype.toYearMonth is a Function', () => {
        equal(typeof Date.prototype.toYearMonth, 'function');
      });
      it('Date.prototype.toMonthDay is a Function', () => {
        equal(typeof Date.prototype.toMonthDay, 'function');
      });
      it('Date.prototype.getFields is a Function', () => {
        equal(typeof Date.prototype.getFields, 'function');
      });
      it('Date.prototype.getISOFields is a Function', () => {
        equal(typeof Date.prototype.getISOFields, 'function');
      });
      it('Date.prototype.toString is a Function', () => {
        equal(typeof Date.prototype.toString, 'function');
      });
      it('Date.prototype.toJSON is a Function', () => {
        equal(typeof Date.prototype.toJSON, 'function');
      });
    });
    it('Date.from is a Function', () => {
      equal(typeof Date.from, 'function');
    });
    it('Date.compare is a Function', () => {
      equal(typeof Date.compare, 'function');
    });
  });
  describe('Construction', () => {
    let date;
    const calendar = Temporal.Calendar.from('iso8601');
    it('date can be constructed', () => {
      date = new Date(1976, 11, 18, calendar);
      assert(date);
      equal(typeof date, 'object');
    });
    it('date.year is 1976', () => equal(date.year, 1976));
    it('date.month is 11', () => equal(date.month, 11));
    it('date.day is 18', () => equal(date.day, 18));
    it('date.calendar is the object', () => equal(date.calendar, calendar));
    it('date.dayOfWeek is 4', () => equal(date.dayOfWeek, 4));
    it('date.dayOfYear is 323', () => equal(date.dayOfYear, 323));
    it('date.weekOfYear is 47', () => equal(date.weekOfYear, 47));
    it('date.daysInWeek is 7', () => equal(date.daysInWeek, 7));
    it('date.monthsInYear is 12', () => equal(date.monthsInYear, 12));
    it('`${date}` is 1976-11-18', () => equal(`${date}`, '1976-11-18'));
  });
  describe('date fields', () => {
    const date = new Date(2019, 10, 6);
    const datetime = { year: 2019, month: 10, day: 1, hour: 14, minute: 20, second: 36 };
    const fromed = new Date(2019, 10, 1);
    it(`(${date}).dayOfWeek === 7`, () => equal(date.dayOfWeek, 7));
    it(`Temporal.Date.from(${date}) is not the same object)`, () => notEqual(Date.from(date), date));
    it(`Temporal.Date.from(${JSON.stringify(datetime)}) instanceof Temporal.date`, () =>
      assert(Date.from(datetime) instanceof Date));
    it(`Temporal.Date.from(${JSON.stringify(datetime)}) === (${fromed})`, () =>
      assert(Date.from(datetime).equals(fromed)));
  });
  describe('.with manipulation', () => {
    const original = new Date(1976, 11, 18);
    it('date.with({ year: 2019 } works', () => {
      const date = original.with({ year: 2019 });
      equal(`${date}`, '2019-11-18');
    });
    it('date.with({ month: 5 } works', () => {
      const date = original.with({ month: 5 });
      equal(`${date}`, '1976-05-18');
    });
    it('date.with({ day: 17 } works', () => {
      const date = original.with({ day: 17 });
      equal(`${date}`, '1976-11-17');
    });
    it('date.with(monthDay) works', () => {
      const date = original.with(Temporal.MonthDay.from('01-01'));
      equal(`${date}`, '1976-01-01');
    });
    it('date.with(yearMonth) works', () => {
      const date = original.with(Temporal.YearMonth.from('1977-10'));
      equal(`${date}`, '1977-10-18');
    });
    it('invalid overflow', () => {
      ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
        throws(() => original.with({ day: 17 }, { overflow }), RangeError)
      );
    });
    it('options may only be an object or undefined', () => {
      [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
        throws(() => original.with({ day: 17 }, badOptions), TypeError)
      );
      [{}, () => {}, undefined].forEach((options) => equal(`${original.with({ day: 17 }, options)}`, '1976-11-17'));
    });
    it('object must contain at least one correctly-spelled property', () => {
      throws(() => original.with({}), TypeError);
      throws(() => original.with({ months: 12 }), TypeError);
    });
    it('incorrectly-spelled properties are ignored', () => {
      equal(`${original.with({ months: 12, day: 15 })}`, '1976-11-15');
    });
    it('date.with(iso date string)', () => {
      const date = original.with('2019-05-17');
      equal(`${date}`, '2019-05-17');
      const date2 = original.with('2019-05-17T12:34');
      equal(`${date2}`, '2019-05-17');
      const date3 = original.with('2019-05-17T12:34Z');
      equal(`${date3}`, '2019-05-17');
    });
    it('date.with(bad string)', () => {
      throws(() => original.with('42'), RangeError);
    });
    it('date.with(good string but irrelevant type)', () => {
      throws(() => original.with('18:05:42.577'), TypeError);
    });
  });
  describe('Date.toDateTime() works', () => {
    const date = Date.from('1976-11-18');
    const dt = date.toDateTime(Temporal.Time.from('11:30:23'));
    it('returns a Temporal.DateTime', () => assert(dt instanceof Temporal.DateTime));
    it('combines the date and time', () => equal(`${dt}`, '1976-11-18T11:30:23'));
    it('casts argument', () => {
      equal(`${date.toDateTime({ hour: 11, minute: 30, second: 23 })}`, '1976-11-18T11:30:23');
      equal(`${date.toDateTime('11:30:23')}`, '1976-11-18T11:30:23');
    });
    it('object must contain at least one correctly-spelled property', () => {
      throws(() => date.toDateTime({}), TypeError);
      throws(() => date.toDateTime({ minutes: 30 }), TypeError);
    });
    it('optional argument defaults to midnight', () => {
      equal(`${date.toDateTime()}`, '1976-11-18T00:00:00');
    });
  });
  describe('date.difference() works', () => {
    const date = new Date(1976, 11, 18);
    it('date.difference({ year: 1976, month: 10, day: 5 })', () => {
      const duration = date.difference(Date.from({ year: 1976, month: 10, day: 5 }));

      equal(duration.years, 0);
      equal(duration.months, 0);
      equal(duration.weeks, 0);
      equal(duration.days, 44);
      equal(duration.hours, 0);
      equal(duration.minutes, 0);
      equal(duration.seconds, 0);
      equal(duration.milliseconds, 0);
      equal(duration.microseconds, 0);
      equal(duration.nanoseconds, 0);
    });
    it('date.difference({ year: 2019, month: 11, day: 18 }, { largestUnit: "years" })', () => {
      const later = Date.from({ year: 2019, month: 11, day: 18 });
      const duration = later.difference(date, { largestUnit: 'years' });
      equal(duration.years, 43);
      equal(duration.months, 0);
      equal(duration.weeks, 0);
      equal(duration.days, 0);
      equal(duration.hours, 0);
      equal(duration.minutes, 0);
      equal(duration.seconds, 0);
      equal(duration.milliseconds, 0);
      equal(duration.microseconds, 0);
      equal(duration.nanoseconds, 0);
    });
    it('casts argument', () => {
      equal(`${date.difference({ year: 2019, month: 11, day: 5 })}`, '-P15692D');
      equal(`${date.difference('2019-11-05')}`, '-P15692D');
    });
    it('takes days per month into account', () => {
      const date1 = Date.from('2019-01-01');
      const date2 = Date.from('2019-02-01');
      const date3 = Date.from('2019-03-01');
      equal(`${date2.difference(date1)}`, 'P31D');
      equal(`${date3.difference(date2)}`, 'P28D');

      const date4 = Date.from('2020-02-01');
      const date5 = Date.from('2020-03-01');
      equal(`${date5.difference(date4)}`, 'P29D');
    });
    it('takes days per year into account', () => {
      const date1 = Date.from('2019-01-01');
      const date2 = Date.from('2019-06-01');
      const date3 = Date.from('2020-01-01');
      const date4 = Date.from('2020-06-01');
      const date5 = Date.from('2021-01-01');
      const date6 = Date.from('2021-06-01');
      equal(`${date3.difference(date1)}`, 'P365D');
      equal(`${date5.difference(date3)}`, 'P366D');
      equal(`${date4.difference(date2)}`, 'P366D');
      equal(`${date6.difference(date4)}`, 'P365D');
    });
    const feb20 = Date.from('2020-02-01');
    const feb21 = Date.from('2021-02-01');
    it('defaults to returning days', () => {
      equal(`${feb21.difference(feb20)}`, 'P366D');
      equal(`${feb21.difference(feb20, { largestUnit: 'auto' })}`, 'P366D');
      equal(`${feb21.difference(feb20, { largestUnit: 'days' })}`, 'P366D');
    });
    it('can return higher units', () => {
      equal(`${feb21.difference(feb20, { largestUnit: 'years' })}`, 'P1Y');
      equal(`${feb21.difference(feb20, { largestUnit: 'months' })}`, 'P12M');
      equal(`${feb21.difference(feb20, { largestUnit: 'weeks' })}`, 'P52W2D');
    });
    it('cannot return lower units', () => {
      throws(() => feb21.difference(feb20, { largestUnit: 'hours' }), RangeError);
      throws(() => feb21.difference(feb20, { largestUnit: 'minutes' }), RangeError);
      throws(() => feb21.difference(feb20, { largestUnit: 'seconds' }), RangeError);
      throws(() => feb21.difference(feb20, { largestUnit: 'milliseconds' }), RangeError);
      throws(() => feb21.difference(feb20, { largestUnit: 'microseconds' }), RangeError);
      throws(() => feb21.difference(feb20, { largestUnit: 'nanoseconds' }), RangeError);
    });
    it('does not include higher units than necessary', () => {
      const lastFeb20 = Date.from('2020-02-29');
      const lastFeb21 = Date.from('2021-02-28');
      equal(`${lastFeb21.difference(lastFeb20)}`, 'P365D');
      equal(`${lastFeb21.difference(lastFeb20, { largestUnit: 'months' })}`, 'P11M30D');
      equal(`${lastFeb21.difference(lastFeb20, { largestUnit: 'years' })}`, 'P11M30D');
    });
    it('weeks and months are mutually exclusive', () => {
      const laterDate = date.add({ days: 42 });
      const weeksDifference = laterDate.difference(date, { largestUnit: 'weeks' });
      notEqual(weeksDifference.weeks, 0);
      equal(weeksDifference.months, 0);
      const monthsDifference = laterDate.difference(date, { largestUnit: 'months' });
      equal(monthsDifference.weeks, 0);
      notEqual(monthsDifference.months, 0);
    });
    it('no two different calendars', () => {
      const date1 = new Date(2000, 1, 1);
      const date2 = new Date(2000, 1, 1, Temporal.Calendar.from('japanese'));
      throws(() => date1.difference(date2), RangeError);
    });
    it('options may only be an object or undefined', () => {
      [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
        throws(() => feb21.difference(feb20, badOptions), TypeError)
      );
      [{}, () => {}, undefined].forEach((options) => equal(`${feb21.difference(feb20, options)}`, 'P366D'));
    });
    const earlier = Date.from('2019-01-08');
    const later = Date.from('2021-09-07');
    it('throws on disallowed or invalid smallestUnit', () => {
      ['era', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds', 'nonsense'].forEach(
        (smallestUnit) => {
          throws(() => later.difference(earlier, { smallestUnit }), RangeError);
        }
      );
    });
    it('throws if smallestUnit is larger than largestUnit', () => {
      const units = ['years', 'months', 'weeks', 'days'];
      for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
        for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
          const largestUnit = units[largestIdx];
          const smallestUnit = units[smallestIdx];
          throws(() => later.difference(earlier, { largestUnit, smallestUnit }), RangeError);
        }
      }
    });
    it('assumes a different default for largestUnit if smallestUnit is larger than days', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'years' })}`, 'P3Y');
      equal(`${later.difference(earlier, { smallestUnit: 'months' })}`, 'P32M');
      equal(`${later.difference(earlier, { smallestUnit: 'weeks' })}`, 'P139W');
    });
    it('throws on invalid roundingMode', () => {
      throws(() => later.difference(earlier, { roundingMode: 'cile' }), RangeError);
    });
    const incrementOneNearest = [
      ['years', 'P3Y'],
      ['months', 'P32M'],
      ['weeks', 'P139W'],
      ['days', 'P973D']
    ];
    incrementOneNearest.forEach(([smallestUnit, expected]) => {
      const roundingMode = 'nearest';
      it(`rounds to nearest ${smallestUnit}`, () => {
        equal(`${later.difference(earlier, { smallestUnit, roundingMode })}`, expected);
        equal(`${earlier.difference(later, { smallestUnit, roundingMode })}`, `-${expected}`);
      });
    });
    const incrementOneCeil = [
      ['years', 'P3Y', '-P2Y'],
      ['months', 'P32M', '-P31M'],
      ['weeks', 'P139W', '-P139W'],
      ['days', 'P973D', '-P973D']
    ];
    incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
      const roundingMode = 'ceil';
      it(`rounds up to ${smallestUnit}`, () => {
        equal(`${later.difference(earlier, { smallestUnit, roundingMode })}`, expectedPositive);
        equal(`${earlier.difference(later, { smallestUnit, roundingMode })}`, expectedNegative);
      });
    });
    const incrementOneFloor = [
      ['years', 'P2Y', '-P3Y'],
      ['months', 'P31M', '-P32M'],
      ['weeks', 'P139W', '-P139W'],
      ['days', 'P973D', '-P973D']
    ];
    incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
      const roundingMode = 'floor';
      it(`rounds down to ${smallestUnit}`, () => {
        equal(`${later.difference(earlier, { smallestUnit, roundingMode })}`, expectedPositive);
        equal(`${earlier.difference(later, { smallestUnit, roundingMode })}`, expectedNegative);
      });
    });
    const incrementOneTrunc = [
      ['years', 'P2Y'],
      ['months', 'P31M'],
      ['weeks', 'P139W'],
      ['days', 'P973D']
    ];
    incrementOneTrunc.forEach(([smallestUnit, expected]) => {
      const roundingMode = 'trunc';
      it(`truncates to ${smallestUnit}`, () => {
        equal(`${later.difference(earlier, { smallestUnit, roundingMode })}`, expected);
        equal(`${earlier.difference(later, { smallestUnit, roundingMode })}`, `-${expected}`);
      });
    });
    it('nearest is the default', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'years' })}`, 'P3Y');
      equal(`${earlier.difference(later, { smallestUnit: 'years' })}`, '-P3Y');
    });
    it('rounds to an increment of years', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'years', roundingIncrement: 4 })}`, 'P4Y');
    });
    it('rounds to an increment of months', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'months', roundingIncrement: 10 })}`, 'P30M');
    });
    it('rounds to an increment of weeks', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'weeks', roundingIncrement: 12 })}`, 'P144W');
    });
    it('rounds to an increment of days', () => {
      equal(`${later.difference(earlier, { smallestUnit: 'days', roundingIncrement: 100 })}`, 'P1000D');
    });
    it('accepts singular units', () => {
      equal(
        `${later.difference(earlier, { largestUnit: 'year' })}`,
        `${later.difference(earlier, { largestUnit: 'years' })}`
      );
      equal(
        `${later.difference(earlier, { smallestUnit: 'year' })}`,
        `${later.difference(earlier, { smallestUnit: 'years' })}`
      );
      equal(
        `${later.difference(earlier, { largestUnit: 'month' })}`,
        `${later.difference(earlier, { largestUnit: 'months' })}`
      );
      equal(
        `${later.difference(earlier, { smallestUnit: 'month' })}`,
        `${later.difference(earlier, { smallestUnit: 'months' })}`
      );
      equal(
        `${later.difference(earlier, { largestUnit: 'day' })}`,
        `${later.difference(earlier, { largestUnit: 'days' })}`
      );
      equal(
        `${later.difference(earlier, { smallestUnit: 'day' })}`,
        `${later.difference(earlier, { smallestUnit: 'days' })}`
      );
    });
  });
  describe('date.add() works', () => {
    let date = new Date(1976, 11, 18);
    it('date.add({ years: 43 })', () => {
      equal(`${date.add({ years: 43 })}`, '2019-11-18');
    });
    it('date.add({ months: 3 })', () => {
      equal(`${date.add({ months: 3 })}`, '1977-02-18');
    });
    it('date.add({ days: 20 })', () => {
      equal(`${date.add({ days: 20 })}`, '1976-12-08');
    });
    it('new Date(2019, 1, 31).add({ months: 1 })', () => {
      equal(`${new Date(2019, 1, 31).add({ months: 1 })}`, '2019-02-28');
    });
    it('date.add(durationObj)', () => {
      equal(`${date.add(Temporal.Duration.from('P43Y'))}`, '2019-11-18');
    });
    it('casts argument', () => {
      equal(`${date.add('P43Y')}`, '2019-11-18');
    });
    it('constrain when overflowing result', () => {
      const jan31 = Date.from('2020-01-31');
      equal(`${jan31.add({ months: 1 })}`, '2020-02-29');
      equal(`${jan31.add({ months: 1 }, { overflow: 'constrain' })}`, '2020-02-29');
    });
    it('throw when overflowing result with reject', () => {
      const jan31 = Date.from('2020-01-31');
      throws(() => jan31.add({ months: 1 }, { overflow: 'reject' }), RangeError);
    });
    it('symmetrical with regard to negative durations', () => {
      equal(`${Date.from('2019-11-18').add({ years: -43 })}`, '1976-11-18');
      equal(`${Date.from('1977-02-18').add({ months: -3 })}`, '1976-11-18');
      equal(`${Date.from('1976-12-08').add({ days: -20 })}`, '1976-11-18');
      equal(`${Date.from('2019-02-28').add({ months: -1 })}`, '2019-01-28');
    });
    it("ignores lower units that don't balance up to a day", () => {
      equal(`${date.add({ hours: 1 })}`, '1976-11-18');
      equal(`${date.add({ minutes: 1 })}`, '1976-11-18');
      equal(`${date.add({ seconds: 1 })}`, '1976-11-18');
      equal(`${date.add({ milliseconds: 1 })}`, '1976-11-18');
      equal(`${date.add({ microseconds: 1 })}`, '1976-11-18');
      equal(`${date.add({ nanoseconds: 1 })}`, '1976-11-18');
    });
    it('adds lower units that balance up to a day or more', () => {
      equal(`${date.add({ hours: 24 })}`, '1976-11-19');
      equal(`${date.add({ hours: 36 })}`, '1976-11-19');
      equal(`${date.add({ hours: 48 })}`, '1976-11-20');
      equal(`${date.add({ minutes: 1440 })}`, '1976-11-19');
      equal(`${date.add({ seconds: 86400 })}`, '1976-11-19');
      equal(`${date.add({ milliseconds: 86400_000 })}`, '1976-11-19');
      equal(`${date.add({ microseconds: 86400_000_000 })}`, '1976-11-19');
      equal(`${date.add({ nanoseconds: 86400_000_000_000 })}`, '1976-11-19');
    });
    it('invalid overflow', () => {
      ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
        throws(() => date.add({ months: 1 }, { overflow }), RangeError)
      );
    });
    it('mixed positive and negative values always throw', () => {
      ['constrain', 'reject'].forEach((overflow) =>
        throws(() => date.add({ months: 1, days: -30 }, { overflow }), RangeError)
      );
    });
    it('options may only be an object or undefined', () => {
      [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
        throws(() => date.add({ months: 1 }, badOptions), TypeError)
      );
      [{}, () => {}, undefined].forEach((options) => equal(`${date.add({ months: 1 }, options)}`, '1976-12-18'));
    });
    it('object must contain at least one correctly-spelled property', () => {
      throws(() => date.add({}), TypeError);
      throws(() => date.add({ month: 12 }), TypeError);
    });
    it('incorrectly-spelled properties are ignored', () => {
      equal(`${date.add({ month: 1, days: 1 })}`, '1976-11-19');
    });
  });
  describe('date.subtract() works', () => {
    const date = Date.from('2019-11-18');
    it('date.subtract({ years: 43 })', () => {
      equal(`${date.subtract({ years: 43 })}`, '1976-11-18');
    });
    it('date.subtract({ months: 11 })', () => {
      equal(`${date.subtract({ months: 11 })}`, '2018-12-18');
    });
    it('date.subtract({ days: 20 })', () => {
      equal(`${date.subtract({ days: 20 })}`, '2019-10-29');
    });
    it('Date.from("2019-02-28").subtract({ months: 1 })', () => {
      equal(`${Date.from('2019-02-28').subtract({ months: 1 })}`, '2019-01-28');
    });
    it('Date.subtract(durationObj)', () => {
      equal(`${date.subtract(Temporal.Duration.from('P43Y'))}`, '1976-11-18');
    });
    it('casts argument', () => {
      equal(`${date.subtract('P43Y')}`, '1976-11-18');
    });
    it('constrain when overflowing result', () => {
      const mar31 = Date.from('2020-03-31');
      equal(`${mar31.subtract({ months: 1 })}`, '2020-02-29');
      equal(`${mar31.subtract({ months: 1 }, { overflow: 'constrain' })}`, '2020-02-29');
    });
    it('throw when overflowing result with reject', () => {
      const mar31 = Date.from('2020-03-31');
      throws(() => mar31.subtract({ months: 1 }, { overflow: 'reject' }), RangeError);
    });
    it('symmetrical with regard to negative durations', () => {
      equal(`${Date.from('1976-11-18').subtract({ years: -43 })}`, '2019-11-18');
      equal(`${Date.from('2018-12-18').subtract({ months: -11 })}`, '2019-11-18');
      equal(`${Date.from('2019-10-29').subtract({ days: -20 })}`, '2019-11-18');
      equal(`${Date.from('2019-01-28').subtract({ months: -1 })}`, '2019-02-28');
    });
    it("ignores lower units that don't balance up to a day", () => {
      equal(`${date.subtract({ hours: 1 })}`, '2019-11-18');
      equal(`${date.subtract({ minutes: 1 })}`, '2019-11-18');
      equal(`${date.subtract({ seconds: 1 })}`, '2019-11-18');
      equal(`${date.subtract({ milliseconds: 1 })}`, '2019-11-18');
      equal(`${date.subtract({ microseconds: 1 })}`, '2019-11-18');
      equal(`${date.subtract({ nanoseconds: 1 })}`, '2019-11-18');
    });
    it('subtracts lower units that balance up to a day or more', () => {
      equal(`${date.subtract({ hours: 24 })}`, '2019-11-17');
      equal(`${date.subtract({ hours: 36 })}`, '2019-11-17');
      equal(`${date.subtract({ hours: 48 })}`, '2019-11-16');
      equal(`${date.subtract({ minutes: 1440 })}`, '2019-11-17');
      equal(`${date.subtract({ seconds: 86400 })}`, '2019-11-17');
      equal(`${date.subtract({ milliseconds: 86400_000 })}`, '2019-11-17');
      equal(`${date.subtract({ microseconds: 86400_000_000 })}`, '2019-11-17');
      equal(`${date.subtract({ nanoseconds: 86400_000_000_000 })}`, '2019-11-17');
    });
    it('invalid overflow', () => {
      ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
        throws(() => date.subtract({ months: 1 }, { overflow }), RangeError)
      );
    });
    it('mixed positive and negative values always throw', () => {
      ['constrain', 'reject'].forEach((overflow) =>
        throws(() => date.subtract({ months: 1, days: -30 }, { overflow }), RangeError)
      );
    });
    it('options may only be an object or undefined', () => {
      [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
        throws(() => date.subtract({ months: 1 }, badOptions), TypeError)
      );
      [{}, () => {}, undefined].forEach((options) => equal(`${date.subtract({ months: 1 }, options)}`, '2019-10-18'));
    });
    it('object must contain at least one correctly-spelled property', () => {
      throws(() => date.subtract({}), TypeError);
      throws(() => date.subtract({ month: 12 }), TypeError);
    });
    it('incorrectly-spelled properties are ignored', () => {
      equal(`${date.subtract({ month: 1, days: 1 })}`, '2019-11-17');
    });
  });
  describe('date.toString() works', () => {
    it('new Date(1976, 11, 18).toString()', () => {
      equal(new Date(1976, 11, 18).toString(), '1976-11-18');
    });
    it('new Date(1914, 2, 23).toString()', () => {
      equal(new Date(1914, 2, 23).toString(), '1914-02-23');
    });
  });
  describe('Date.from() works', () => {
    it('Date.from("1976-11-18")', () => {
      const date = Date.from('1976-11-18');
      equal(date.year, 1976);
      equal(date.month, 11);
      equal(date.day, 18);
    });
    it('Date.from("2019-06-30")', () => {
      const date = Date.from('2019-06-30');
      equal(date.year, 2019);
      equal(date.month, 6);
      equal(date.day, 30);
    });
    it('Date.from("+000050-06-30")', () => {
      const date = Date.from('+000050-06-30');
      equal(date.year, 50);
      equal(date.month, 6);
      equal(date.day, 30);
    });
    it('Date.from("+010583-06-30")', () => {
      const date = Date.from('+010583-06-30');
      equal(date.year, 10583);
      equal(date.month, 6);
      equal(date.day, 30);
    });
    it('Date.from("-010583-06-30")', () => {
      const date = Date.from('-010583-06-30');
      equal(date.year, -10583);
      equal(date.month, 6);
      equal(date.day, 30);
    });
    it('Date.from("-000333-06-30")', () => {
      const date = Date.from('-000333-06-30');
      equal(date.year, -333);
      equal(date.month, 6);
      equal(date.day, 30);
    });
    it('Date.from(1976-11-18) is not the same object', () => {
      const orig = new Date(1976, 11, 18);
      const actual = Date.from(orig);
      notEqual(actual, orig);
    });
    it('Date.from({ year: 1976, month: 11, day: 18 }) == 1976-11-18', () =>
      equal(`${Date.from({ year: 1976, month: 11, day: 18 })}`, '1976-11-18'));
    it('Date.from({ year: 2019, day: 15 }) throws', () => throws(() => Date.from({ year: 2019, day: 15 }), TypeError));
    it('Date.from({ month: 12 }) throws', () => throws(() => Date.from({ month: 12 }), TypeError));
    it('object must contain at least the required correctly-spelled properties', () => {
      throws(() => Date.from({}), TypeError);
      throws(() => Date.from({ year: 1976, months: 11, day: 18 }), TypeError);
    });
    it('incorrectly-spelled properties are ignored', () => {
      equal(`${Date.from({ year: 1976, month: 11, day: 18, days: 15 })}`, '1976-11-18');
    });
    it('Date.from(required prop undefined) throws', () =>
      throws(() => Date.from({ year: undefined, month: 11, day: 18 }), TypeError));
    it('Date.from(number) is converted to string', () => Date.from(19761118).equals(Date.from('19761118')));
    it('basic format', () => {
      equal(`${Date.from('19761118')}`, '1976-11-18');
      equal(`${Date.from('+0019761118')}`, '1976-11-18');
    });
    it('mixture of basic and extended format', () => {
      equal(`${Date.from('1976-11-18T152330.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('19761118T15:23:30.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('1976-11-18T15:23:30.1+0000')}`, '1976-11-18');
      equal(`${Date.from('1976-11-18T152330.1+0000')}`, '1976-11-18');
      equal(`${Date.from('19761118T15:23:30.1+0000')}`, '1976-11-18');
      equal(`${Date.from('19761118T152330.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('19761118T152330.1+0000')}`, '1976-11-18');
      equal(`${Date.from('+001976-11-18T152330.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('+0019761118T15:23:30.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('+001976-11-18T15:23:30.1+0000')}`, '1976-11-18');
      equal(`${Date.from('+001976-11-18T152330.1+0000')}`, '1976-11-18');
      equal(`${Date.from('+0019761118T15:23:30.1+0000')}`, '1976-11-18');
      equal(`${Date.from('+0019761118T152330.1+00:00')}`, '1976-11-18');
      equal(`${Date.from('+0019761118T152330.1+0000')}`, '1976-11-18');
    });
    it('no junk at end of string', () => throws(() => Date.from('1976-11-18junk'), RangeError));
    it('options may only be an object or undefined', () => {
      [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
        throws(() => Date.from({ year: 1976, month: 11, day: 18 }, badOptions), TypeError)
      );
      [{}, () => {}, undefined].forEach((options) =>
        equal(`${Date.from({ year: 1976, month: 11, day: 18 }, options)}`, '1976-11-18')
      );
    });
    describe('Overflow', () => {
      const bad = { year: 2019, month: 1, day: 32 };
      it('reject', () => throws(() => Date.from(bad, { overflow: 'reject' }), RangeError));
      it('constrain', () => {
        equal(`${Date.from(bad)}`, '2019-01-31');
        equal(`${Date.from(bad, { overflow: 'constrain' })}`, '2019-01-31');
      });
      it('throw when bad overflow', () => {
        [new Date(1976, 11, 18), { year: 2019, month: 1, day: 1 }, '2019-01-31'].forEach((input) => {
          ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
            throws(() => Date.from(input, { overflow }), RangeError)
          );
        });
      });
    });
  });
  describe('Date.compare works', () => {
    const d1 = Date.from('1976-11-18');
    const d2 = Date.from('2019-06-30');
    it('equal', () => equal(Date.compare(d1, d1), 0));
    it('smaller/larger', () => equal(Date.compare(d1, d2), -1));
    it('larger/smaller', () => equal(Date.compare(d2, d1), 1));
    it('casts first argument', () => {
      equal(Date.compare({ year: 1976, month: 11, day: 18 }, d2), -1);
      equal(Date.compare('1976-11-18', d2), -1);
    });
    it('casts second argument', () => {
      equal(Date.compare(d1, { year: 2019, month: 6, day: 30 }), -1);
      equal(Date.compare(d1, '2019-06-30'), -1);
    });
    it('object must contain at least the required properties', () => {
      throws(() => Date.compare({ year: 1976 }, d2), TypeError);
      throws(() => Date.compare(d1, { year: 2019 }), TypeError);
    });
  });
  describe('Date.equal works', () => {
    const d1 = Date.from('1976-11-18');
    const d2 = Date.from('2019-06-30');
    it('equal', () => assert(d1.equals(d1)));
    it('unequal', () => assert(!d1.equals(d2)));
    it('casts argument', () => {
      assert(!d2.equals({ year: 1976, month: 11, day: 18 }));
      assert(!d2.equals('1976-11-18'));
    });
    it('object must contain at least the required properties', () => {
      throws(() => d2.equals({ year: 1976 }), TypeError);
    });
  });
  describe("Comparison operators don't work", () => {
    const d1 = Date.from('1963-02-13');
    const d1again = Date.from('1963-02-13');
    const d2 = Date.from('1976-11-18');
    it('=== is object equality', () => equal(d1, d1));
    it('!== is object equality', () => notEqual(d1, d1again));
    it('<', () => throws(() => d1 < d2));
    it('>', () => throws(() => d1 > d2));
    it('<=', () => throws(() => d1 <= d2));
    it('>=', () => throws(() => d1 >= d2));
  });
  describe('Min/max range', () => {
    it('constructing from numbers', () => {
      throws(() => new Date(-271821, 4, 18), RangeError);
      throws(() => new Date(275760, 9, 14), RangeError);
      equal(`${new Date(-271821, 4, 19)}`, '-271821-04-19');
      equal(`${new Date(275760, 9, 13)}`, '+275760-09-13');
    });
    it('constructing from property bag', () => {
      const tooEarly = { year: -271821, month: 4, day: 18 };
      const tooLate = { year: 275760, month: 9, day: 14 };
      ['reject', 'constrain'].forEach((overflow) => {
        [tooEarly, tooLate].forEach((props) => {
          throws(() => Date.from(props, { overflow }), RangeError);
        });
      });
      equal(`${Date.from({ year: -271821, month: 4, day: 19 })}`, '-271821-04-19');
      equal(`${Date.from({ year: 275760, month: 9, day: 13 })}`, '+275760-09-13');
    });
    it('constructing from ISO string', () => {
      ['reject', 'constrain'].forEach((overflow) => {
        ['-271821-04-18', '+275760-09-14'].forEach((str) => {
          throws(() => Date.from(str, { overflow }), RangeError);
        });
      });
      equal(`${Date.from('-271821-04-19')}`, '-271821-04-19');
      equal(`${Date.from('+275760-09-13')}`, '+275760-09-13');
    });
    it('converting from DateTime', () => {
      const min = Temporal.DateTime.from('-271821-04-19T00:00:00.000000001');
      const max = Temporal.DateTime.from('+275760-09-13T23:59:59.999999999');
      equal(`${min.toDate()}`, '-271821-04-19');
      equal(`${max.toDate()}`, '+275760-09-13');
    });
    it('converting from YearMonth', () => {
      const min = Temporal.YearMonth.from('-271821-04');
      const max = Temporal.YearMonth.from('+275760-09');
      throws(() => min.toDateOnDay(1), RangeError);
      throws(() => max.toDateOnDay(30), RangeError);
      equal(`${min.toDateOnDay(19)}`, '-271821-04-19');
      equal(`${max.toDateOnDay(13)}`, '+275760-09-13');
    });
    it('converting from MonthDay', () => {
      const jan1 = Temporal.MonthDay.from('01-01');
      const dec31 = Temporal.MonthDay.from('12-31');
      const minYear = -271821;
      const maxYear = 275760;
      throws(() => jan1.toDateInYear(minYear), RangeError);
      throws(() => dec31.toDateInYear(maxYear), RangeError);
      equal(`${jan1.toDateInYear(minYear + 1)}`, '-271820-01-01');
      equal(`${dec31.toDateInYear(maxYear - 1)}`, '+275759-12-31');
    });
    it('adding and subtracting beyond limit', () => {
      const min = Date.from('-271821-04-19');
      const max = Date.from('+275760-09-13');
      ['reject', 'constrain'].forEach((overflow) => {
        throws(() => min.subtract({ days: 1 }, { overflow }), RangeError);
        throws(() => max.add({ days: 1 }, { overflow }), RangeError);
      });
    });
  });
  describe('date.getFields() works', () => {
    const calendar = Temporal.Calendar.from('iso8601');
    const d1 = Date.from({ year: 1976, month: 11, day: 18, calendar });
    const fields = d1.getFields();
    it('fields', () => {
      equal(fields.year, 1976);
      equal(fields.month, 11);
      equal(fields.day, 18);
      equal(fields.calendar, calendar);
    });
    it('enumerable', () => {
      const fields2 = { ...fields };
      equal(fields2.year, 1976);
      equal(fields2.month, 11);
      equal(fields2.day, 18);
      equal(fields2.calendar, calendar);
    });
    it('as input to from()', () => {
      const d2 = Date.from(fields);
      equal(Date.compare(d1, d2), 0);
    });
    it('as input to with()', () => {
      const d2 = Date.from('2019-06-30').with(fields);
      equal(Date.compare(d1, d2), 0);
    });
  });
  describe('date.getISOFields() works', () => {
    const d1 = Date.from('1976-11-18');
    const fields = d1.getISOFields();
    it('fields', () => {
      equal(fields.isoYear, 1976);
      equal(fields.isoMonth, 11);
      equal(fields.isoDay, 18);
      equal(fields.calendar.id, 'iso8601');
    });
    it('enumerable', () => {
      const fields2 = { ...fields };
      equal(fields2.isoYear, 1976);
      equal(fields2.isoMonth, 11);
      equal(fields2.isoDay, 18);
      equal(fields2.calendar, fields.calendar);
    });
    it('as input to constructor', () => {
      const d2 = new Date(fields.isoYear, fields.isoMonth, fields.isoDay, fields.calendar);
      assert(d2.equals(d1));
    });
  });
  describe('date.withCalendar()', () => {
    const d1 = Date.from('1976-11-18');
    it('works', () => {
      const calendar = Temporal.Calendar.from('iso8601');
      equal(`${d1.withCalendar(calendar)}`, '1976-11-18');
    });
    it('casts its argument', () => {
      equal(`${d1.withCalendar('iso8601')}`, '1976-11-18');
    });
  });
});

import { normalize } from 'path';
if (normalize(import.meta.url.slice(8)) === normalize(process.argv[1])) {
  report(reporter).then((failed) => process.exit(failed ? 1 : 0));
}