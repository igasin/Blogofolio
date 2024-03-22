import {
  films,
  getAllUniqueGenres,
  getAllUniqueActors,
  sortFilmsByRating,
  getNewArrayFilmsShortenedProps,
  filterFilmsByYear,
  filterFilmsByTitle,
  filterFilmsByTitleOrPlot,
  filterFilmsByField,
} from './homeWork21';

describe('getAllUniqueGenres', () => {
  it('should return all unique genres', () => {
    const uniqueGenres = getAllUniqueGenres(films);
    expect(uniqueGenres).toEqual(['Action', 'Sci-Fi', 'Adventure', 'Drama', 'Fantasy']);
  });
});

describe('getAllUniqueActors', () => {
  it('should return all unique actors', () => {
    const uniqueActors = getAllUniqueActors(films);
    expect(uniqueActors).toEqual(['Scarlett Johansson', 'Florence Pugh', 'David Harbour', 'Daniel Radcliffe', 'Emma Watson', 'Rupert Grint', 'Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Richard Harris']);
  });
});

describe('sortFilmsByRating', () => {
  it('should return films sorted by rating in descending order', () => {
    const sortedFilms = sortFilmsByRating(films);
    const ratings = sortedFilms.map(film => film.imdbRating);
    expect(ratings).toEqual([8.6, 8.1, 7.6, 7.6, 6.9, 'abc', 0, false]);
  });
});

describe('getNewArrayFilmsShortenedProps', () => {
  it('should return an array of films with shortened properties', () => {
    const shortenedFilms = getNewArrayFilmsShortenedProps(films);
    expect(shortenedFilms.length).toEqual(films.length);
    expect(shortenedFilms[0]).toEqual({
      id: 1,
      title: 'Black Widow',
      released: '09 Jul 2021',
      plot: 'Natasha Romanoff confronts the darker partsof her ledger when a dangerous conspiracy with ties to her pastarises.',
    });
  });
});

describe('filterFilmsByYear', () => {
  it('should return films released in the specified year', () => {
    const filteredFilms = filterFilmsByYear(films, 2009);
    expect(filteredFilms.length).toEqual(1);
    expect(filteredFilms[0].title).toEqual('Harry Potter and the Half-Blood Prince');
  });
});

describe('filterFilmsByTitle', () => {
  it('should return films with titles containing the specified string', () => {
    const filteredFilms = filterFilmsByTitle(films, 'Harry Potter');
    expect(filteredFilms.length).toEqual(3);
    expect(filteredFilms.map(film => film.title)).toEqual([
      'Harry Potter and the Deathly Hallows: Part2',
      'Harry Potter and the Half-Blood Prince',
      "Harry Potter and the Sorcerer's Stone",
    ]);
  });
});

describe('filterFilmsByTitleOrPlot', () => {
  it('should return films with titles or plots containing the specified string', () => {
    const filteredFilms = filterFilmsByTitleOrPlot(films, 'Voldemort');
    expect(filteredFilms.length).toEqual(2);
    expect(filteredFilms.map(film => film.title)).toEqual([
      'Harry Potter and the Deathly Hallows: Part2',
      'Harry Potter and the Half-Blood Prince',
    ]);
  });
});

describe('filterFilmsByField', () => {
  it('should return films filtered by a specific field and value', () => {
    const filteredFilms = filterFilmsByField(films, 'country', 'United Kingdom');
    expect(filteredFilms.length).toEqual(3);
    expect(filteredFilms.map(film => film.title)).toEqual([
      'Harry Potter and the Deathly Hallows: Part2',
      'Harry Potter and the Half-Blood Prince',
      "Harry Potter and the Sorcerer's Stone",
    ]);
  });
});
