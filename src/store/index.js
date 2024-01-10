import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import moviesReducer from '../features/movies/movieSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movies: moviesReducer,

  },
})