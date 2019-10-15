import { Carousel, CarouselProps } from "./Carousel";

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<Carousel>", () => {
  let props: CarouselProps;
  beforeEach(() => {
    props = {
      label: "carousel label",
      items: []
    };
  });
  function subject() {
    return render(<Carousel {...props} />);
  }
  afterEach(cleanup);

  describe("empty items", () => {
    it("has one region", () => {
      const { getAllByRole } = subject();
      expect(getAllByRole("region")).toHaveLength(1);
    });

    it("shows label 'carousel label'", () => {
      const { getByLabelText } = subject();
      expect(getByLabelText("carousel label")).toBeInTheDocument();
    });
  });

  describe("single item", () => {
    beforeEach(() => {
      props.items = [
        {
          id: "a",
          description: "first description",
          imageURL: "https://images.unsplash.com/1"
        }
      ];
    });

    it("has one figure", () => {
      const { getAllByRole } = subject();
      expect(getAllByRole("figure")).toHaveLength(1);
    });

    it("shows description text", () => {
      const { getByText } = subject();
      expect(getByText("first description")).toBeInTheDocument();
    });

    it("shows image with correct url", () => {
      const { getByRole } = subject();
      expect(getByRole("img")).toHaveAttribute(
        "src",
        "https://images.unsplash.com/1"
      );
    });
  });

  describe("two items", () => {
    beforeEach(() => {
      props.items = [
        {
          id: "a",
          description: "first description",
          imageURL: "https://images.unsplash.com/1"
        },
        {
          id: "b",
          description: "second description",
          imageURL: "https://images.unsplash.com/2"
        }
      ];
    });

    it("has two figures", () => {
      const { getAllByRole } = subject();
      expect(getAllByRole("figure")).toHaveLength(2);
    });

    it("shows first description text", () => {
      const { getByText } = subject();
      expect(getByText("first description")).toBeInTheDocument();
    });

    it("shows second description text", () => {
      const { getByText } = subject();
      expect(getByText("second description")).toBeInTheDocument();
    });

    it("shows first image with correct url", () => {
      const { getAllByRole } = subject();
      expect(getAllByRole("img")[0]).toHaveAttribute(
        "src",
        "https://images.unsplash.com/1"
      );
    });

    it("shows second image with correct url", () => {
      const { getAllByRole } = subject();
      expect(getAllByRole("img")[1]).toHaveAttribute(
        "src",
        "https://images.unsplash.com/2"
      );
    });
  });

  describe("three items", () => {
    beforeEach(() => {
      props.items = [
        {
          id: "a",
          description: "first description",
          imageURL: "https://images.unsplash.com/1"
        },
        {
          id: "b",
          description: "second description",
          imageURL: "https://images.unsplash.com/2"
        },
        {
          id: "c",
          description: "third description",
          imageURL: "https://images.unsplash.com/c"
        }
      ];
    });
    function subject() {
      const result = render(<Carousel {...props} />);
      const figures = result.getAllByRole("figure");
      const previousButton = result.getByText(/previous/i);
      const nextButton = result.getByText(/next/i);
      return {
        ...result,
        figures,
        previousButton,
        nextButton,
        countAriaCurrent() {
          return result.container.querySelectorAll("[aria-current]").length;
        }
      };
    }

    describe("when initialActiveIndex is…", () => {
      describe.each`
        initialActiveIndex | expectedCurrentFigure | expectStyleRegex
        ${undefined}       | ${0}                  | ${/left: 0px;/}
        ${0}               | ${0}                  | ${/left: 0px;/}
        ${1}               | ${1}                  | ${/left: -800px;/}
        ${2}               | ${2}                  | ${/left: -1600px;/}
      `(
        "set to $initialActiveIndex",
        ({
          initialActiveIndex,
          expectedCurrentFigure,
          expectStyleRegex
        }: {
          initialActiveIndex: number;
          expectedCurrentFigure: number;
          expectStyleRegex: RegExp;
        }) => {
          let result: ReturnType<typeof subject>;
          beforeEach(() => {
            props.initialActiveIndex = initialActiveIndex;
            result = subject();
          });

          describe(`figure at index ${expectedCurrentFigure}`, () => {
            it("is current", () => {
              expect(result.figures[expectedCurrentFigure]).toHaveAttribute(
                "aria-current",
                "true"
              );
            });
          });

          it("has only one current element", () => {
            expect(result.countAriaCurrent()).toEqual(1);
          });

          describe("list", () => {
            it(`has left offset of ${expectStyleRegex}`, () => {
              const listEl = result.getByRole("list");
              expect(listEl).toHaveAttribute(
                "style",
                expect.stringMatching(expectStyleRegex)
              );
            });
          });
        }
      );
    });

    describe("when previous button is…", () => {
      describe.each`
        times | expectedIndex
        ${1}  | ${2}
        ${2}  | ${1}
        ${3}  | ${0}
        ${4}  | ${2}
      `(
        "clicked $times time(s)",
        ({
          times,
          expectedIndex
        }: {
          times: number;
          expectedIndex: number;
        }) => {
          let result: ReturnType<typeof subject>;
          beforeEach(() => {
            result = subject();
            for (let i = 1; i <= times; i++) {
              fireEvent.click(result.previousButton);
            }
          });

          describe(`figure at index ${expectedIndex}`, () => {
            it("is current", () => {
              expect(result.figures[expectedIndex]).toHaveAttribute(
                "aria-current",
                "true"
              );
            });
          });

          it("has only one current element", () => {
            expect(result.countAriaCurrent()).toEqual(1);
          });
        }
      );
    });

    describe("when next button is…", () => {
      describe.each`
        times | expectedIndex
        ${1}  | ${1}
        ${2}  | ${2}
        ${3}  | ${0}
        ${4}  | ${1}
      `(
        "clicked $times time(s)",
        ({
          times,
          expectedIndex
        }: {
          times: number;
          expectedIndex: number;
        }) => {
          let result: ReturnType<typeof subject>;
          beforeEach(() => {
            result = subject();
            for (let i = 1; i <= times; i++) {
              fireEvent.click(result.nextButton);
            }
          });

          describe(`figure at index ${expectedIndex}`, () => {
            it("is current", () => {
              expect(result.figures[expectedIndex]).toHaveAttribute(
                "aria-current",
                "true"
              );
            });
          });

          it("has only one current element", () => {
            expect(result.countAriaCurrent()).toEqual(1);
          });
        }
      );
    });
  });
});
