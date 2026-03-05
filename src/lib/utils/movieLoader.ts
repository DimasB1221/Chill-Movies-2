import { ImageLoaderProps } from "next/image";

const movieLoader = ({ src, width }: ImageLoaderProps) => {
  return `https://image.tmdb.org/t/p/w500${src}`;
};

export default movieLoader;
