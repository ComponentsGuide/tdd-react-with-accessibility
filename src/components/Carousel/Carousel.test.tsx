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

    describe("current item", () => {
      describe("initially", () => {
        let result: ReturnType<typeof subject>;
        beforeEach(() => {
          result = subject();
        });

        describe("first figure", () => {
          it("is current", () => {
            const [firstFigure] = result.figures;
            expect(firstFigure).toHaveAttribute("aria-current");
          });
        });

        it("has only one current element", () => {
          expect(result.countAriaCurrent()).toEqual(1);
        });
      });

      describe("when previous button is…", () => {
        describe.each`
        times | expectedIndex
        ${1} | ${2}
        ${2} | ${1}
        ${3} | ${0}
        ${4} | ${2}
        `("clicked $times time(s)", ({ times, expectedIndex }: { times: number; expectedIndex: number }) => {
          let result: ReturnType<typeof subject>;
          beforeEach(() => {
            result = subject();
            for (let i = 1; i <= times; i++) {
              fireEvent.click(result.previousButton);
            }
          });

          describe(`figure at index ${expectedIndex}`, () => {
            it("is current", () => {
              expect(result.figures[expectedIndex]).toHaveAttribute("aria-current", "true");
            });
          });
  
          it("has only one current element", () => {
            expect(result.countAriaCurrent()).toEqual(1);
          });
        });
      });

      describe("when next button is…", () => {
        describe.each`
        times | expectedIndex
        ${1} | ${1}
        ${2} | ${2}
        ${3} | ${0}
        ${4} | ${1}
        `("clicked $times time(s)", ({ times, expectedIndex }: { times: number; expectedIndex: number }) => {
          let result: ReturnType<typeof subject>;
          beforeEach(() => {
            result = subject();
            for (let i = 1; i <= times; i++) {
              fireEvent.click(result.nextButton);
            }
          });

          describe(`figure at index ${expectedIndex}`, () => {
            it("is current", () => {
              expect(result.figures[expectedIndex]).toHaveAttribute("aria-current", "true");
            });
          });
  
          it("has only one current element", () => {
            expect(result.countAriaCurrent()).toEqual(1);
          });
        });
      });

      describe("when second item (index 1) is initially active", () => {
        let result: ReturnType<typeof subject>;
        beforeEach(() => {
          props.initialActiveIndex = 1;
          result = subject();
        });

        describe("second figure", () => {
          it("is current", () => {
            const [, secondFigure] = result.figures;
            expect(secondFigure).toHaveAttribute("aria-current", "true");
          });
        });
      });
    });
  });
});
