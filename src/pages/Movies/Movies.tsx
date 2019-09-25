import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Container, Card} from '../../components/StyledComponents';
import {useSelector, useDispatch} from 'react-redux';
import {movieListSelector} from '../../modules/movies/selectors';
import {MoviesActions} from '../../modules/movies/actions';

export const Movies = () => {
  const movies = useSelector(movieListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesActions.getMovies());
  }, [dispatch]);

  return (
    <Container>
      <Card>
        {movies ? (
          movies.map(movie => <Text>{movie}</Text>)
        ) : (
          <ActivityIndicator size="large" />
        )}
      </Card>
    </Container>
  );
};
