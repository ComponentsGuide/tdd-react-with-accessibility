import React from "react";

export interface CarouselInputItem {
  id: string;
  imageURL: string;
  description: string;
}

function CarouselItem({ item, active }: { item: CarouselInputItem, active: boolean }) {
  return (
    <figure key={item.id} aria-current={active ? "true" : undefined}>
      <img src={item.imageURL} />
      <figcaption>{item.description}</figcaption>
    </figure>
  );
}

export interface CarouselProps {
  items: Array<CarouselInputItem>;
  activeItemIndex?: number;
}
export function Carousel({ items, activeItemIndex }: CarouselProps): JSX.Element {
  return (
    <div role="region" aria-label="Gallery">
      {items.map((item, index) => (
        <CarouselItem key={item.id} item={item} active={activeItemIndex === index} />
      ))}
    </div>
  );
}
