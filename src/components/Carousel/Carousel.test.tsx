import { Carousel, CarouselProps } from "./Carousel";

import React from "react";
import { render, cleanup } from "@testing-library/react";
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
    it("has empty text content", () => {
      const result = subject();
      expect(result.container).toHaveTextContent("");
    });

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

    describe("when second item (index 1) is active", () => {
      let figures: Array<HTMLElement>;
      beforeEach(() => {
        props.initialActiveIndex = 1;

        const { getAllByRole } = subject();
        figures = getAllByRole("figure");
      });

      describe("first figure", () => {
        it("is not current", () => {
          expect(figures[0]).not.toHaveAttribute("aria-current");
        });
      });

      describe("second figure", () => {
        it("is current", () => {
          expect(figures[1]).toHaveAttribute("aria-current", "true");
        });
      });
    });
  });
});
