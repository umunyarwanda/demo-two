export interface Series {
  id: number;
  title: string;
  posterPath: string;
  firstAirDate: string;
  rating: number;
  overview: string;
  seasons: number;
  genre: string[];
}

export const series: Series[] = [
  {
    id: 1,
    title: "Breaking Bad",
    posterPath: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    firstAirDate: "2008-01-20",
    rating: 9.5,
    overview: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future as a terminal lung cancer diagnosis pushes him to the brink.",
    seasons: 5,
    genre: ["Crime", "Drama", "Thriller"]
  },
  {
    id: 2,
    title: "Game of Thrones",
    posterPath: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    firstAirDate: "2011-04-17",
    rating: 9.3,
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    seasons: 8,
    genre: ["Action", "Adventure", "Drama"]
  },
  {
    id: 3,
    title: "Stranger Things",
    posterPath: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    firstAirDate: "2016-07-15",
    rating: 8.7,
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    seasons: 4,
    genre: ["Drama", "Fantasy", "Horror"]
  },
  {
    id: 4,
    title: "The Crown",
    posterPath: "https://image.tmdb.org/t/p/w500/7k7oKzJmBHTGqgHhQb3j8tNkqGf.jpg",
    firstAirDate: "2016-11-04",
    rating: 8.7,
    overview: "The story of Queen Elizabeth II and the events that shaped the second half of the twentieth century.",
    seasons: 6,
    genre: ["Biography", "Drama", "History"]
  },
  {
    id: 5,
    title: "The Mandalorian",
    posterPath: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    firstAirDate: "2019-11-12",
    rating: 8.8,
    overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    seasons: 3,
    genre: ["Action", "Adventure", "Sci-Fi"]
  },
  {
    id: 6,
    title: "The Witcher",
    posterPath: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    firstAirDate: "2019-12-20",
    rating: 8.2,
    overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    seasons: 3,
    genre: ["Action", "Adventure", "Drama"]
  },
  {
    id: 7,
    title: "The Boys",
    posterPath: "https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg",
    firstAirDate: "2019-07-26",
    rating: 8.7,
    overview: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
    seasons: 4,
    genre: ["Action", "Comedy", "Crime"]
  },
  {
    id: 8,
    title: "Wednesday",
    posterPath: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    firstAirDate: "2022-11-23",
    rating: 8.1,
    overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
    seasons: 1,
    genre: ["Comedy", "Crime", "Fantasy"]
  }
]; 