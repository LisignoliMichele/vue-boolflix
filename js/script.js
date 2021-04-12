var app = new Vue ({
   el: "#app",
   data:{
      movies: [],
      search: ""
   },
   methods:{
      getMovie: function(){
         axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
               api_key: "f89e14052a0d0db382004cc67a28c7d5",
               query: this.search,
               language: "it-IT"
            }
         })
         .then((serverAnswer) => {
            this.movies = [],
            serverAnswer.data.results.forEach((movie) => { 

               console.log(movie.vote_average)
               console.log(movie.vote_average / 2)
               console.log(Math.round(movie.vote_average / 2))

               movie.vote_average = Math.round(movie.vote_average / 2);
               this.movies.push(movie)
            this.search = '';
             });
         });
      }
      
   }
});


