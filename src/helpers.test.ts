import test from "ava";
import {
  uniq,
  uniqByProperty,
  isAbbr,
  clearText,
  countWords,
  getWeekNumber
} from "./helpers";

test("uniq", (t) => {
  t.deepEqual(uniq([1, 1, 2, 3, 4, 2]), [1, 2, 3, 4]);
});

test("uniqByProperty", (t) => {
  t.deepEqual(uniqByProperty([{ id: 1 }, { id: 1 }, { id: 2 }], "id"), [
    { id: 1 },
    { id: 2 }
  ]);
});

test("#isAbbr", (t) => {
  t.is(isAbbr("ABBR"), true, "ABBR is an abbreviation");
  t.is(isAbbr("aBBR"), false, "aBBR is not an abbreviation");
  t.is(isAbbr("A Abbr"), false, "A Abbr is not an abbreviation");
  t.is(isAbbr("A ABBR"), true, "A ABBR is an abbreviation");
  t.is(isAbbr("189 & 9"), false, "189 & 9 not abbreviation");
});

test("#clearText", (t) => {
  t.is(clearText("Async (node)"), "Async node");
  t.is(clearText("iPhone #5"), "iPhone 5");
  t.is(clearText("iPhone & -= &&"), "iPhone");
  t.is(clearText("iPhone $^@^%*#^*(#()*#_*_)(@_)(@ &+-iPad"), "iPhone iPad");
  t.is(
    clearText(`This is a super, super text:)
    * No?`),
    "This is a super super text No"
  );
});

test("#countWords", (t) => {
  t.is(countWords("Async (node)"), 2);
  t.is(countWords("iPhone alfa"), 2);
  t.is(countWords("Ștefan"), 1);
  t.is(countWords("iPhone 2"), 2);
  t.is(countWords(""), 0);
});

test("#getWeekNumber", (t) => {
  t.is(getWeekNumber(new Date(2018, 9, 3)), 40);
});
