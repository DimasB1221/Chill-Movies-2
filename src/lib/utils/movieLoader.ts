import { ImageLoaderProps } from "next/image";

const movieLoader = ({ src }: ImageLoaderProps) => {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `https://image.tmdb.org/t/p/w500${src}`;
};

export default movieLoader;
