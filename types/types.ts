export interface fetchMoviesParams {
    page: number;
    first?: number;
    rows?: number;
    pageCount?: number;
}

export interface MovieData {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface allMoviesRespond {
    Search: MovieData[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export interface Movie {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: { Source: string; Value: string }[];
    Metascore?: string;
    imdbRating: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
}

export interface error {
    Error: string,
    Response: string
}

export interface RootState {}
