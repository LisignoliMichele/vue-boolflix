var app = new Vue ({
   el: "#app",
   data:{
      searchURL: "https://api.themoviedb.org/3/search/",
      creditsURL: "https://api.themoviedb.org/3/",
      genresURL: "https://api.themoviedb.org/3/genre/",
      serieIndex: 0,
      moviesIndex: 0,
      movies: [],
      series:[],
      seriesCast: [],
      moviesCast: [],
      genersTV: [],
      genersMovie: [],
      selectedTvGenre: "",
      selectedMoviesGenre: "",
      secectedMoviesGenre: "",
      search: "",
      apiKey: "f89e14052a0d0db382004cc67a28c7d5",
      languages:[
         {  
            name: "IT",
            language: "it-IT",
            sectionTvTitle: "Serie TV",
            sectionMoviesTitle: "Film",
            title: "Titolo",
            originalName: "Titolo originale",
            vote: "Voto",
            overview: "Riassunto",
            charactersButton: "scopri gli attori",
            placeholder: "Titoli, persone, generi"
         },
         {
            name:"EN",
            language: "en-US",
            sectionTvTitle: "TV Series",
            sectionMoviesTitle: "Movies",
            title: "Title",
            originalName: "Original name",
            vote: "Vote",
            overview: "Overview",
            charactersButton: "find actors",
            placeholder: "Titles, people, genres"
         },
         {
            name:"ES",
            language: "es-ES",
            title: "Título",
            sectionTvTitle: "Series de Televisión",
            sectionMoviesTitle: "Película",
            originalName: "Nombre original",
            vote: "Votar",
            overview: "Descripción",
            charactersButton: "descubrir actores",
            placeholder: "Títulos, personas, géneros"
         },
         {
            name:"DE",
            language: "de-DE",
            title: "Titel",
            sectionTvTitle: "TV-Serie",
            sectionMoviesTitle: "Filme",
            originalName: "Originaler Titel",
            vote: "Abstimmung",
            overview: "Überblick",
            charactersButton: "Schauspieler finden",
            placeholder: "Titel, Menschen, Genres"
         },
         { 
            name:"中国",
            language: "zh-CN",
            title: "标题",
            sectionTvTitle: "电视剧",
            sectionMoviesTitle: "电影",
            originalName: "原名",
            vote: "投票",
            overview: "概述",
            charactersButton: "寻找演员",
            placeholder: "头衔，人物，体裁"
         },
         {
            name:"RU",
            language: "ru-RU",
            title: "Заголовок",
            sectionTvTitle: "Серия ТВ",
            sectionMoviesTitle: "Кино",
            originalName: "Оригинальное название" ,
            vote: "Голосование",
            overview: "Рассмотрение",
            charactersButton: "найти актеров",
            placeholder: "Названия, люди, жанры"
         }   
         ],
         flags:["ad", "ae", "af", "al", "ar", "at", "ch", "cn", "cs", "da", "de", "en", "es", "et", "eu", "fi", "fr", "gl", "hi", "hr", "hu", "it", "ja", "ka", "ko", "ml", "nl", "no", "pl", "pt", "ru", "sr", "sv", "te", "th", "tl", "zr", "zh"],
         languagesIndex: 0,
         styleSearchWw: "",
         styleSearchBg: "",
         styleCancel__X: "",
         opening_layer: "",
   },
   methods:{

      searchActive: function(){
         if (this.styleSearchWw == ''){
               this.styleSearchWw = 'styleSearchWw__active';
               this.styleSearchBg = 'styleSearchBg__active';      
         }
      },
      showXdelete: function(){
         if (this.search != ''){
            this.styleCancel__X ='cancel__X__active';
         }else{
            this.styleCancel__X ='';
         }
      },
      xDelete: function(){
         this.search = "",
         this.styleCancel__X ='';
      },
      getMovie: function(){  
         axios.get(this.searchURL + "movie", {
            params: {
               api_key: this.apiKey,
               query: this.search,
               language: this.languages[this.languagesIndex].language,
            }
         })
         .then((serverAnswer) => {
            this.movies = [],
            serverAnswer.data.results.forEach((movie) => { 

               movie.vote_average = Math.round(movie.vote_average / 2);
               this.movies.push(movie)
               // this.styleSearchWw = '';
               // this.styleSearchBg = '';
             });
         });

         axios.get(this.searchURL + "tv", {
            params: {
               api_key: this.apiKey,
               query: this.search,
               language: this.languages[this.languagesIndex].language,
            }
         })
         .then((serverAnswer) => {
            this.series = [];
            serverAnswer.data.results.forEach((serie) => { 
         
               serie.vote_average = Math.round(serie.vote_average / 2);
               this.series.push(serie);
               // this.search = '';
               // this.styleSearchWw = '';
               // this.styleSearchBg = '';
               
             });
         });
      },
      printselected: function(){
         console.log(this.selectedGenre)
      },
      getTvCredits: function(){
         this.seriesCast = [],
         axios.get(this.creditsURL + "tv/" + this.series[this.serieIndex].id + "/credits?v", {
            params: {
               api_key: this.apiKey,
            }
            })
            .then((serverAnswer) =>{
               if (serverAnswer.data.cast.length != 0){
                  if (serverAnswer.data.cast.length > 5){
                     for(let i = 0; i < 5; i++){
                        this.seriesCast.push(serverAnswer.data.cast[i].name);
                     }
                  }else{
                     serverAnswer.data.cast.forEach((character) =>{
                        this.seriesCast.push(character.name);
                     })
                  }
               }
            })
      },
      getMovieCredits: function(){
         this.moviesCast = [],
         axios.get(this.creditsURL + "movie/" + this.movies[this.moviesIndex].id + "/credits?v", {
            params: {
               api_key: this.apiKey,
            }
            })
            .then((serverAnswer) =>{
               if (serverAnswer.data.cast.length != 0){
                  if (serverAnswer.data.cast.length > 5){
                     for(let i = 0; i < 5; i++){
                        this.moviesCast.push(serverAnswer.data.cast[i].name);
                     }
                  }else{
                     serverAnswer.data.cast.forEach((character) =>{
                        this.moviesCast.push(character.name);
                     })
                  }
               }
            })
      },
      hide:function(){
         setTimeout(this.opening_layer = "displaynone"
         , 2000)
      },
   },
   mounted: function(){
         
     

      axios.get(this.genresURL + "tv/list",{
         params: {
            api_key: this.apiKey,
            query: this.search,
            language: "en_EN",
         }
         })
         .then((serverAnswer) =>{
            serverAnswer.data.genres.forEach((genre) =>{
               this.genersTV.push(genre)
            })
         })
      axios.get(this.genresURL + "movie/list",{
         params: {
            api_key: this.apiKey,
            query: this.search,
            language: "en_EN",
         }
         })
         .then((serverAnswer) =>{
            serverAnswer.data.genres.forEach((genre) =>{
               this.genersMovie.push(genre)
            })
         })
      
   },
   
   
   computed:{
      filtredTVseries: function(){
          return this.series.filter((serie) =>{
                  return serie.genre_ids.includes(this.selectedTvGenre)
               })
      },
      filtredMovies: function(){
            return this.movies.filter((movie) =>{
                 return movie.genre_ids.includes(this.secectedMoviesGenre)
              })
      }

   }

});
