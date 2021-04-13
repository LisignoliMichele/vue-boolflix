var app = new Vue ({
   el: "#app",
   data:{
      searchURL: "https://api.themoviedb.org/3/search/",
      creditsURL: "https://api.themoviedb.org/3/",
      serieIndex: 0,
      moviesIndex: 0,
      movies: [],
      series:[],
      seriesCast: [],
      moviesCast: [],
      search: "",
      apiKey: "f89e14052a0d0db382004cc67a28c7d5",
      languages:[
         {
            language: "it-IT",
            title: "Titolo",
            originalName: "Titolo originale",
            vote: "Voto",
            overview: "Riassunto"
         },
         {
            language: "en-US",
            title: "Title",
            originalName: "Original name",
            vote: "Vote",
            overview: "Overview"
         },
         {
            language: "es-ES",
            title: "Título",
            originalName: "Nombre original",
            vote: "Votar",
            overview: "Descripción"
         },
         {
            language: "de-DE",
            title: "Titel",
            originalName: "Originaler Titel",
            vote: "Abstimmung",
            overview: "Überblick"
         },
         { 
            language: "zh-CN",
            title: "标题",
            originalName: "原名",
            vote: "投票",
            overview: "概述"
         },
         {
            language: "ru-RU",
            title: "Заголовок",
            originalName: "Оригинальное название" ,
            vote: "Голосование",
            overview: "Рассмотрение"
         },
            
      ],
      flags:["ad", "ae", "af", "al", "ar", "at", "ch", "cn", "cs", "da", "de", "en", "es", "et", "eu", "fi", "fr", "gl", "hi", "hr", "hu", "it", "ja", "ka", "ko", "ml", "nl", "no", "pl", "pt", "ru", "sr", "sv", "te", "th", "tl", "zr", "zh"],
      languagesIndex: 0,
      styleSearchWw: "",
      styleSearchBg: "",
      styleCancel__X: "",
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
                  console.log(this.seriesCast)
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
                  console.log(this.moviesCast)
               }
            })
      },
   }
});


  