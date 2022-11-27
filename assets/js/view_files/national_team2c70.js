var fixture_scroll = new Vue({
    el: '#fixtures_div_cont',
    data: {
      fixture_scroll: [],
      loading: true,
      first_load : true,
    },
    mounted () {
      this.fetchMatches();
    },
    methods: {
      fetchMatches: function () {
        
        this.loading = true;

        axios
        .get(base_url + "/api/national-team-fixtures/"+gender+"/"+age_group)
        .then(response => {
          console.log(response);
          
        this.fixture_scroll = response.data.fixtures;
        var start_position = parseInt(response.data.key);

        this.loading = false;

        if(this.fixture_scroll.length == 0){
          $("#fixtures_results").hide();
          $("a.link1").parent().hide();
        }

            this.first_load = false;
            setTimeout(function(){
              owl = jQuery("#fixture_scroll").owlCarousel({
                nav:true,
                navText:['',''],
                responsive : {
                    0 : {
                        items : 3,
                        startPosition: start_position,
                    },
                    480 : {
                        items : 3,
                        startPosition: start_position,
                    },
                    720 : {
                        items : 5,
                        startPosition: (start_position == 0)?0:start_position - 1,
                    },
                    1000 : {
                        items : 5,
                        startPosition: (start_position == 0)?0:start_position - 1,
                    },
                    1300 : {
                        items : 5,
                        startPosition: (start_position == 0)?0:start_position - 1,
                    }
                }
              });
            },500);

        });

      }
    }
});

var squad = new Vue({
  el: '#squad',
  data: {
    player_types: [
      { type : 2, name : "Goalkeepers"},
      { type : 4, name : "Defenders"},
      { type : 3, name : "Midfielders"},
      { type : 1, name : "Forwards"}
    ],
    players: [],
    officials: [],
    loading: true,
    show_players: true,
    show_type : 0,
  },
  mounted () {
    this.fetchSquad();
  },
  methods: {
    fetchSquad: function () {
      this.loading = true;
      axios
      .get(base_url + "/api/national-team/squad/"+gender+"/"+age_group)
      .then(response => {
          this.players = response.data.players;
          this.officials = response.data.officials;
          if(this.players.length == 0){
            $("#squad").hide();
            $("a.link3").parent().hide();
          }
      });
    },

    changePlayerType: function(type){
      console.log(type);
      this.show_type = type;
      if(type == -1){
        this.show_players = false;
      } else {
        this.show_players = true;
      }
    }

  }
});