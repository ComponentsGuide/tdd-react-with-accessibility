import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import styles from "./Carousel.module.scss";

export interface CarouselInputItem {
  id: string;
  imageURL: string;
  description: string;
}

function CarouselItem({
  item,
  active
}: {
  item: CarouselInputItem;
  active: boolean;
}) {
  return (
    <figure key={item.id} aria-current={active ? "true" : undefined}>
      <img src={item.imageURL} />
      <figcaption>{item.description}</figcaption>
    </figure>
  );
}

interface CarouselItemsProps {
  items: Array<CarouselInputItem>;
  activeItemIndex: number;
}
function CarouselItems({
  items,
  activeItemIndex
}: CarouselItemsProps): JSX.Element {
  const style = useSpring({ left: activeItemIndex * -800 });

  return (
    <animated.ol style={style}>
      {items.map((item, index) => (
        <li key={item.id}>
          <CarouselItem item={item} active={activeItemIndex === index} />
        </li>
      ))}
    </animated.ol>
  );
}

export interface CarouselProps {
  label: string;
  items: Array<CarouselInputItem>;
  initialActiveIndex?: number;
}
export function Carousel({
  label,
  items,
  initialActiveIndex = 0
}: CarouselProps): JSX.Element {
  const [activeIndex, updateActiveIndex] = useState(initialActiveIndex);

  return (
    <div role="region" aria-label={label} className={styles.component}>
      <CarouselItems items={items} activeItemIndex={activeIndex} />
      <button
        onClick={() => {
          updateActiveIndex(index => (index - 1 + items.length) % items.length);
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          updateActiveIndex(index => (index + 1) % items.length);
        }}
      >
        Next
      </button>
    </div>
  );
}
