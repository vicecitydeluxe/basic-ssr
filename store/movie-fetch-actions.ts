import { ActionTree } from 'vuex';
import { RootState } from '~/types/types';
import $axios from '@/api/config';
import { error } from '@/types/types';

interface State {}

interface GetFilmsPayload {
  s: string;
  page: number;
}

interface MovieFetchActions extends ActionTree<State, RootState> {
  getAllFilms(context: any, payload: GetFilmsPayload): Promise<any>;

  getSpecificFilm(context: any, movieId: string): Promise<any>;
}

const actions: MovieFetchActions = {
  getAllFilms({ commit }, payload: GetFilmsPayload) {
    return new Promise((resolve, reject) => {
      $axios({
        method: 'GET',
        url: 'https://www.omdbapi.com/',
        params: {
          apikey: 'dc9ce8dd',
          s: payload.s,
          page: payload.page,
        },
      })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err: error) => {
          console.error(err);
          reject(err);
        });
    });
  },

  getSpecificFilm({ commit }, movieId: string) {
    return new Promise((resolve, reject) => {
      $axios({
        method: 'GET',
        url: 'https://www.omdbapi.com/',
        params: {
          apikey: 'dc9ce8dd',
          i: movieId,
        },
      })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err: error) => {
          console.error(err);
          reject(err);
        });
    });
  },
};

export default {
  actions,
};
