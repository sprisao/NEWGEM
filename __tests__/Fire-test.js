import React from "react";
import renderer from "react-test-renderer";
import FireTest from "../FireTest";

describe("파이어테스트", () => {
  test("화면이 정상적으로 들어오는가", () => {
    const screen = renderer.create(<FireTest />).toJSON();
    expect(screen).toMatchSnapshot();
  });
  test("타이틀이 정상적으로 보여지는가", () => {
    const screen = renderer.create(<FireTest />).toJSON();
    const title = screen.getByText("Practice TDD");
    expect(title).toBeDefined();
  });
});
//   test("화면이 정상적으로 들어오는가", () => {
//     const screen = renderer.create(<FireTest />).toJSON();
//     expect(screen).toMatchSnapshot();
//   }),
//   test("화면이 정상적으로 들어오는가", () => {
//     const screen = renderer.create(<FireTest />).toJSON();
//     expect(screen).toMatchSnapshot();
//   }),
//   test("화면이 정상적으로 들어오는가", () => {
//     const screen = renderer.create(<FireTest />).toJSON();
//     expect(screen).toMatchSnapshot();
//   }),
