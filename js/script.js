var app = new Vue ({
   el: "#app",
   data:{
      searchURL: "https://api.themoviedb.org/3/search/",
      kindIndex: 0,
      movies: [],
      series:[],
      search: "",
      apiKey: "f89e14052a0d0db382004cc67a28c7d5",
      languages: ["it-IT", "en-US", "es-ES", "zh-CN", "de-DE", "ru-RU"],
      languagesIndex: 0,
      styleSearchWw: "",
      styleSearchBg: "",
   },
   methods:{

      searchActive: function(){
         if (this.styleSearchWw == ''){
               this.styleSearchWw = 'styleSearchWw__active';
               this.styleSearchBg = 'styleSearchBg__active';
         }
      },
      getMovie: function(){
         
         axios.get(this.searchURL + "movie", {
            params: {
               api_key: this.apiKey,
               query: this.search,
               language: this.languages[this.languagesIndex],
            }
         })
         .then((serverAnswer) => {
            this.movies = [],
            serverAnswer.data.results.forEach((movie) => { 

               movie.vote_average = Math.round(movie.vote_average / 2);
               this.movies.push(movie)
               this.styleSearchWw = '';
               this.styleSearchBg = '';
             });
         });

         axios.get(this.searchURL + "tv", {
            params: {
               api_key: this.apiKey,
               query: this.search,
               language: this.languages[this.languagesIndex],
            }
         })
         .then((serverAnswer) => {
            this.series = [];
            serverAnswer.data.results.forEach((serie) => { 
         
               serie.vote_average = Math.round(serie.vote_average / 2);
               this.series.push(serie);
               this.search = '';
               this.styleSearchWw = '';
               this.styleSearchBg = '';
               
             });
         });

      },  
   }
});