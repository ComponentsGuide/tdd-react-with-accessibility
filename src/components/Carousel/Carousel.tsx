import React, { useState } from "react";

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
  activeItemIndex?: number;
}
function CarouselItems({
  items,
  activeItemIndex
}: CarouselItemsProps): JSX.Element {
  return (
    <div>
      {items.map((item, index) => (
        <CarouselItem
          key={item.id}
          item={item}
          active={activeItemIndex === index}
        />
      ))}
    </div>
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
    <div role="region" aria-label={label}>
      <CarouselItems items={items} activeItemIndex={activeIndex} />
      <button onClick={() => {}}>Previous</button>
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
