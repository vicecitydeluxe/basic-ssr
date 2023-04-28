import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';
import { RootState } from '~/types/types';
import movieFetchActions from './movie-fetch-actions';

Vue.use(Vuex);

const modules: ModuleTree<RootState> = {
  movieFetchActions,
};

const createStore = () => {
  return new Vuex.Store({
    modules,
  });
};

export default createStore;
