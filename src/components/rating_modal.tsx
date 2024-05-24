'use client';
import { Button, Modal, Text, Image, Flex } from '@mantine/core';
import { IMovie } from '../../lib/movie';
import NotRatedStar from '../../public/star_not_rated.svg';
import RatingStar from '../../public/rating_star.svg';
import { ReactElement, useState } from 'react';

export default function RatingModal({
  movie,
  opened,
  close,
}: {
  movie: IMovie;
  opened: boolean;
  close: () => void;
}) {
  const [currentRating, setCurrentRating] = useState(0);

  const [starsArray, setStarsArray] = useState<ReactElement[]>(
    Array(10)
      .fill(0)
      .map((_, index) => (
        <Image
          src={NotRatedStar.src}
          alt={'Not rated star'}
          key={index}
          onClick={() => {
            choosenStar(index);
          }}
        />
      )),
  );

  function choosenStar(choosenStarIndex: number) {
    setCurrentRating(choosenStarIndex + 1);
    let newArray: ReactElement[] = [];
    starsArray.forEach((_, index) => {
      if (index <= choosenStarIndex) {
        newArray[index] = (
          <Image
            w={28}
            h={28}
            src={RatingStar.src}
            alt={'Rating star'}
            key={index}
            onClick={() => {
              choosenStar(index);
            }}
          />
        );
      } else {
        newArray[index] = (
          <Image
            w={28}
            h={28}
            src={NotRatedStar.src}
            alt={'Not rated star'}
            key={index}
            onClick={() => {
              choosenStar(index);
            }}
          />
        );
      }
    });

    setStarsArray(newArray);
  }

  function submitRating() {
    localStorage.setItem(`movie-${movie.id}`, String(currentRating));
  }

  function resetRating() {
    localStorage.removeItem(`movie-${movie.id}`);
  }

  return (
    <Modal opened={opened} onClose={close} title={'Your rating'} centered>
      <Text fw={700}>{movie?.original_title}</Text>
      <Flex gap={8}>{starsArray}</Flex>
      <Button onClick={submitRating} bg={'grape'}>
        Save
      </Button>
      <Button onClick={resetRating} variant="subtle" color="grape">
        Remove rating
      </Button>
    </Modal>
  );
}
