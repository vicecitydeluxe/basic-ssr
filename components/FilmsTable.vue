<template>
  <div>

    <DataView
        :value="movies"
        :layout="layout.value"
        :rows="9"
        :totalRecords="totalResult"
        @page="fetchMovies"
        lazy
        paginator
    >

      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
              <span class="p-input-icon-left">
                 <i class="pi pi-search"/>
                  <InputText type="text" v-model="searchMovieDebounced" placeholder="Search for a movie"/>
               </span>
          </div>
          <div class="col-6" style="text-align: right">
            <SelectButton v-model="layout" :options="layoutOptions" dataKey="value">
              <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
              </template>
            </SelectButton>
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12" v-show="!isLoading">
          <div class="product-list-item">
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.movieTitle }}</div>
              <img :src="slotProps.data.image" alt="poster">
              <div class="product-description-list">{{ slotProps.data.year }}</div>
              <Button label="Show info" style="width: 100%;" @click="fetchAdditionalInfo(slotProps.data.id)"/>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4" v-show="!isLoading">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
            </div>
            <div class="product-grid-item-content">
              <div class="product-name">{{ slotProps.data.movieTitle }}</div>
              <img :src="slotProps.data.image" alt="poster">
              <div class="product-description">{{ slotProps.data.year }}</div>
            </div>
            <div class="product-grid-item-bottom">
              <Button label="Show info" style="width: 100%;" @click="fetchAdditionalInfo(slotProps.data.id)"/>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    <Dialog
        header="Detailed info"
        :visible.sync="modalShowFlag"
        :containerStyle="{width: '50vw'}"
    >
      <p class="m-0">
        <b>Main plot: </b> {{ modalInfo.description }}<br>
        <br> <b>Was released:</b> {{ modalInfo.released }}
        <br> <b>IMDB rating: </b>{{ modalInfo.rating }}
      </p>
    </Dialog>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataView from 'primevue/dataview'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import {fetchMoviesParams, MovieData, allMoviesRespond, Movie, error} from "@/types/types";

export default Vue.extend({
  name: 'TableView',
  components: {DataView, SelectButton, Button, InputText, Dialog},
  data() {
    return {
      // films data
      movies: [] as { movieTitle: string, year: string, image: string, id: string }[],
      movieQuery: 'Batman',
      searchMovieDebounced: null,
      // additional
      modalShowFlag: false,
      modalInfo: {
        rating: '',
        released: '',
        description: '',
      },
      // data handling
      isLoading: false,
      timeout: 0,
      // layout
      layout: {value: 'grid', icon: 'pi pi-th-large'},
      layoutOptions: [{value: 'list', icon: 'pi pi-bars'}, {value: 'grid', icon: 'pi pi-th-large'}],
      totalResult: 0,
    }
  },
  watch: {
    searchMovieDebounced(n: string): void {
      clearTimeout(this.timeout)
      // @ts-ignore TODO: how to provide Timeout type?
      this.timeout = setTimeout(() => {
        this.movieQuery = n
        this.fetchMovies({page: 0})
      }, 500)
    }
  },
  created() {
    this.fetchMovies({page: 0})
  },
  methods: {
    fetchMovies(data: fetchMoviesParams): void {
      this.isLoading = true
      this.$store.dispatch('getAllFilms', {page: data.page + 1, s: this.movieQuery})
          .then((res: allMoviesRespond) => {
            if (res.Error) {
              console.error(res.Error)
              return
            }
            this.totalResult = +res.totalResults
            this.movies = res.Search.map((el: MovieData) => ({
              movieTitle: el.Title,
              year: el.Year,
              image: el.Poster,
              id: el.imdbID
            }))
            this.isLoading = false
          })
          .catch((err: error) => {
            console.error(err)
          })
    },
    fetchAdditionalInfo(movieId: string): void {
      this.$store.dispatch('getSpecificFilm', movieId)
          .then((res: Movie) => {
            this.modalInfo.rating = res.imdbRating
            this.modalInfo.released = res.Released
            this.modalInfo.description = res.Plot
            this.modalShowFlag = true
          })
          .catch((err: error) => {
            console.error(err)
          })
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/films-table.scss';
</style>
