import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, error, loading } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <div>Loding...</div>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h1>List of users</h1>
      <ul>
        {data.users.map((user) => (
          <li>
            {user.name}: {user.nationality}
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Interstellar... "
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() => fetchMovie({ variables: { name: movieSearched } })}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              {" "}
              <h1>
                MovieName: {movieSearchedData.movie.name}:{" "}
                {movieSearchedData.movie.yearOfPublication}{" "}
              </h1>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
