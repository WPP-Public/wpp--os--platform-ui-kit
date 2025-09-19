export interface BasicOption {
  id: number | string;
  label: string;
  disabled?: boolean;
}

export interface CountryOption extends BasicOption {
  flag: string;
  nativeName: string;
}

export interface MovieOption extends BasicOption {
  year: number;
  rating: number;
  unavailable: boolean;
}

export const fruitOptions = [
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
  },
  {
    id: 3,
    label: 'Cherry',
  },
  {
    id: 4,
    label: 'Durian',
  },
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
  {
    id: 7,
    label: 'Grape',
  },
  {
    id: 8,
    label: 'Orange',
  },
  {
    id: 9,
    label: 'Apple',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 11,
    label: 'Watermelon',
  },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 14,
    label: 'Apricot',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 16,
    label: 'Melon',
  },
]

export const countryOptions: CountryOption[] = [
  {
    id: 1,
    flag: "🇦🇺",
    label: "Australia",
    nativeName: "Commonwealth of Australia",
  },
  {
    id: 2,
    flag: "🇧🇪",
    label: "Belgium",
    nativeName: "Koninkrijk België / Royaume de Belgique / Königreich Belgien",
  },
  {
    id: 3,
    flag: "🇨🇦",
    label: "Canada",
    nativeName: "Canada",
  },
  {
    id: 4,
    flag: "🇩🇪",
    label: "Germany",
    nativeName: "Bundesrepublik Deutschland",
  },
  {
    id: 5,
    flag: "🇯🇵",
    label: "Japan",
    nativeName: "日本国",
  },
  {
    id: 6,
    flag: "🇳🇱",
    label: "Netherlands",
    nativeName: "Nederland",
  },
  {
    id: 7,
    flag: "🇵🇱",
    label: "Poland",
    nativeName: "Rzeczpospolita Polska",
  },
  {
    id: 8,
    flag: "🇸🇪",
    label: "Sweden",
    nativeName: "Konungariket Sverige",
  },
  {
    id: 9,
    flag: "🇺🇦",
    label: "Ukraine",
    nativeName: "Україна",
  },
  {
    id: 10,
    flag: "🇺🇸",
    label: "United States",
    nativeName: "United States of America",
  },
];

export const movieOptions: MovieOption[] = [
  {
    id: "tt1392190",
    label: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    unavailable: false,
  },
  {
    id: "tt6320628",
    label: "Spider-Man: Far from Home",
    year: 2019,
    rating: 7.4,
    unavailable: false,
  },
  {
    id: "tt1160419",
    label: "Dune",
    year: 2021,
    rating: 8.1,
    unavailable: false,
  },
  {
    id: "tt3315342",
    label: "Logan",
    year: 2017,
    rating: 8.1,
    unavailable: true,
  },
  {
    id: "tt4912910",
    label: "Mission: Impossible - Fallout",
    year: 2018,
    rating: 7.7,
    unavailable: false,
  },
  {
    id: "tt0499549",
    label: "Avatar",
    year: 2009,
    rating: 7.9,
    unavailable: false,
  },
  {
    id: "tt5013056",
    label: "Dunkirk",
    year: 2017,
    rating: 7.8,
    unavailable: false,
  },
  {
    id: "tt2948356",
    label: "Zootopia",
    year: 2016,
    rating: 8,
    unavailable: false,
  },
  {
    id: "tt0468569",
    label: "The Dark Knight",
    year: 2008,
    rating: 9.1,
    unavailable: false,
  },
  {
    id: "tt0119707",
    label: "Mortal Kombat: Annihilation",
    year: 1997,
    rating: 3.6,
    unavailable: false,
  },
  {
    id: "tt1074638",
    label: "Skyfall",
    year: 2012,
    rating: 7.8,
    unavailable: true,
  },
  {
    id: "tt0076759",
    label: "Star Wars: A New Hope (Episode IV)",
    year: 1977,
    rating: 8.6,
    unavailable: false,
  },
  {
    id: "tt0103064",
    label: "Terminator 2: Judgment Day",
    year: 1991,
    rating: 8.6,
    unavailable: false,
  },
  {
    id: "tt1211837",
    label: "Doctor Strange",
    year: 2016,
    rating: 7.5,
    unavailable: false,
  },
  {
    id: "tt0425112",
    label: "Hot Fuzz",
    year: 2007,
    rating: 7.8,
    unavailable: false,
  },
  {
    id: "tt0107290",
    label: "Jurassic Park",
    year: 1993,
    rating: 8.2,
    unavailable: false,
  },
  {
    id: "tt0120737",
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    rating: 8.9,
    unavailable: false,
  },
  {
    id: "tt0088763",
    label: "Back to the Future",
    year: 1985,
    rating: 8.6,
    unavailable: false,
  },
];

const hugeList: BasicOption[] = [];

for (let i = 1; i <= 1000; i++) {
  hugeList.push({
    id: i,
    label: `Item ${i}`,
  });
}

export const hugeListOptions = hugeList;

export const isInfiniteLastPage = (search: string, page: number) =>
  page > 6 - Math.round((search.length * 2) / 3);

export const getOptionLabel = (
  value: string | number,
  optionsList: BasicOption[]
): string => {
  const currOption = optionsList.find((option) => option.id === value);

  if (currOption) {
    return currOption.label;
  }

  return "";
};

export const generateInfiniteResults = (
  search: string,
  page: number,
  itemsPerPage = 20
): BasicOption[] => {
  const isLastPage = isInfiniteLastPage(search, page);
  const fillPart = ((search.length + page) % 5) / 5;
  const itemsCount = isLastPage
    ? Math.floor((fillPart * itemsPerPage) / 2 + itemsPerPage / 2)
    : itemsPerPage;

  return Array.from({ length: itemsCount }).map((_, index) => {
    const itemNumber = itemsPerPage * page + index + 1;

    return {
      id: `${search ? `s-${search}` : "all"}-${itemNumber}`,
      label: `${search ? `Item '${search}'` : "All items"} ${itemNumber}`,
    };
  });
};
