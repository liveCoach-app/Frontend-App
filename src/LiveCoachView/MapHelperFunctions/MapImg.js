import React from 'react'
import useImage from 'use-image';
import { Image } from 'react-konva';

export default function MapImg () {
  const [image] = useImage('http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png');
  return <Image image={image} width={window.innerWidth / 2.4} height={window.innerWidth / 2.4}/>;
};
