var top_scorers = new Vue({
      el: '#top_scorers',
      data: {
        top_scorers: [],
        loading: true,
      },
      mounted () {
        this.fetchTopScorers();
      },
      methods: {
        fetchTopScorers: function () {
          
          this.loading = true;

          axios
          .get(base_url + "/api/baby-leagues/top-scorers")
          .then(response => {
            console.log(response);
            this.loading = false;
            this.top_scorers = response.data.players;
          });

        }
      }
  });

  var leagues = new Vue({
      el: '#leagues',
      data: {
        leagues: [],
        states: [],
        max : max,
        selected_state : 0,
        page_number : 1,
        loading_leagues: true,
      },
      mounted () {
        this.fetchLeagues(this.selected_state, this.page_number);
      },
      methods: {
        refreshList: function(){
          this.page_number = 1;
          this.fetchLeagues(this.selected_state, 1);
        },

        fetchLeagues: function (selected_state, page_number) {
          
          this.loading_leagues = true;
          axios
          .post(
            base_url + "/api/baby-leagues/ongoing",
            {state_id : this.selected_state, page_number : this.page_number, max: this.max}
          )
          .then(response => {
            this.loading_leagues = false;
            console.log(response);
            this.leagues = response.data.leagues;
            this.states = response.data.states;
          });

        }
      }
  });