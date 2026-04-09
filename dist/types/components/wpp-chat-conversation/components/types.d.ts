export type ChatImageData = {
  href: string;
  alt: string;
  linkHref?: string;
};
export type ChatImageGroupToken = {
  type: 'image_group';
  raw: string;
  images: ChatImageData[];
};
