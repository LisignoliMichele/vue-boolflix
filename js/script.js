var app = new Vue ({
   el: "#app",
   data:{
      movies: [],
      search: ""
   },
   methods:{
      getMovie: function(){
         var self = this;
         axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
               api_key: "f89e14052a0d0db382004cc67a28c7d5",
               query: self.search,
               language: "it-IT"
            }
         })
         .then((serverAnswer) => {
            this.movies = serverAnswer.data.results
            this.search = ''
            console.log(this.movies)
         });  
      }
   }
});
