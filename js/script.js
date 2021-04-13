var app = new Vue ({
   el: "#app",
   data:{
      searchURL: "https://api.themoviedb.org/3/search/",
      kindIndex: 0,
      movies: [],
      series:[],
      search: "",
      apiKey: "f89e14052a0d0db382004cc67a28c7d5",
      languages:[
         {
            language: "it-IT",
            flag: "img/IT_flag.png",
            title: "Titolo",
            originalName: "Titolo originale",
            vote: "Voto",
            overview: "Riassunto"
         },
         {
            language: "en-US",
            flag: "img/EN_flag.png",
            title: "Title",
            originalName: "Original name",
            vote: "Vote",
            overview: "Overview"
         },
         {
            language: "es-ES",
            flag: "img/ES_flag.png",
            title: "Título",
            originalName: "Nombre original",
            vote: "Votar",
            overview: "Descripción"
         },
         {
            language: "de-DE",
            flag: "img/DE_flag.png",
            title: "Titel",
            originalName: "Originaler Titel",
            vote: "Abstimmung",
            overview: "Überblick"
         },
         { 
            language: "zh-CN",
            flag: "img/CI_flag.png",
            title: "标题",
            originalName: "原名",
            vote: "投票",
            overview: "概述"
         },
         {
            language: "ru-RU",
            flag: "img/RU_flag.png",
            title: "Заголовок",
            originalName: "Оригинальное название" ,
            vote: "Голосование",
            overview: "Рассмотрение"
         },
            
      ],
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
               language: this.languages[this.languagesIndex].language,
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
               language: this.languages[this.languagesIndex].language,
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