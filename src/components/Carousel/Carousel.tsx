import React from "react";

export interface CarouselInputItem {
  id: string;
  imageURL: string;
  description: string;
}

function CarouselItem({ item }: { item: CarouselInputItem }) {
  return (
    <figure key={item.id}>
      <img src={item.imageURL} />
      <figcaption>{item.description}</figcaption>
    </figure>
  );
}

export interface CarouselProps {
  items: Array<CarouselInputItem>;
}
export function Carousel({ items }: CarouselProps): JSX.Element {
  return (
    <div role="region" aria-label="Gallery">
      {items.map(item => (
        <CarouselItem key={item.id} item={item} />
      ))}
    </div>
  );
}
