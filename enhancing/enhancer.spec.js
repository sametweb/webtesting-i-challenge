const enhancer = require("./enhancer.js");
const { succeed, fail, repair, get } = enhancer;
// test away!

let item = { name: "Excalibur", enhancement: 10, durability: 50 };

describe("repair()", () => {
  it("restores durability to 100", () => {
    expect(repair(item)).toEqual(expect.objectContaining({ durability: 100 }));
  });
});

describe("success()", () => {
  it("enhancement increases by 1", () => {
    expect(succeed(item)).toEqual(
      expect.objectContaining({ enhancement: item.enhancement + 1 })
    );
  });

  it("enhancement = 20 ? enhancement is not changed", () => {
    expect(succeed({ ...item, enhancement: 20 })).toEqual(
      expect.objectContaining({ enhancement: 20 })
    );
  });

  it("The durability of the item is not changed.", () => {
    expect(succeed(item)).toEqual(
      expect.objectContaining({ durability: item.durability })
    );
  });
});

describe("fail()", () => {
  it("if enhancement < 15 => the durability -5", () => {
    expect(fail(item)).toEqual(
      expect.objectContaining({ durability: item.durability - 5 })
    );
  });

  it("if enhancement >= 15 => the durability -10", () => {
    expect(fail({ ...item, enhancement: 15 })).toEqual(
      expect.objectContaining({ durability: item.durability - 10 })
    );
  });

  it("if enhancement > 16 => the enhancement -1", () => {
    expect(fail({ ...item, enhancement: 17 })).toEqual(
      expect.objectContaining({ enhancement: 16 })
    );
  });
});

describe("get()", () => {
  it("does not change the name if enhancement = 0", () => {
    expect(get({ ...item, enhancement: 0 })).toEqual(
      expect.objectContaining({ name: item.name })
    );
  });

  it("adds enhancement level in front of name in brackets", () => {
    expect(get({ ...item, enhancement: 10 })).toEqual(
      expect.objectContaining({ name: `[+${item.enhancement}] ${item.name}` })
    );
  });
});
