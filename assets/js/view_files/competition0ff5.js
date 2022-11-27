var fixture_scroll = new Vue({
    el: '#fixtures_div',
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
        .get(base_url + "/api/competition/fixtures/"+tournament_type)
        .then(response => {
          console.log(response);
          
        this.fixture_scroll = response.data.fixtures;
        var start_position = parseInt(response.data.key);

        this.loading = false;

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
                        items : 3,
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


var results = new Vue({
    el: '#results',
    data: {
      results: [],
      loading: true
    },
    mounted () {
      this.fetchResults();
    },
    methods: {
      fetchResults: function () {
        
        this.loading = true;

        axios
        .get(base_url + "/api/competition/results/"+tournament_type)
        .then(response => {
            this.results = response.data.results;
            this.loading = false;

        });

      }
    }
});

var points_table = new Vue({
    el: '#points-table',
    data: {
      points_table: [],
      top_scorers: [],
      open_stage_id: 0,
      open_group_id: 0,
      open_groups: [],
      open_group: [],
      loading: true
    },
    mounted () {
      this.fetchPT();
      this.topScorer();
    },
    methods: {
      fetchPT: function () {
        
        this.loading = true;

        axios
        .get(base_url + "/api/competition/points-table/"+tournament_type)
        .then(response => {
            
            this.points_table = response.data.points_table;
            this.open_stage_id = response.data.points_table[0].stage_id;

            this.open_groups = response.data.points_table[0].groups;
            
            this.open_group = response.data.points_table[0].groups[0];
            this.open_group_id = response.data.points_table[0].groups[0].id;

            this.loading = false;

        });

      },

      switchStage: function(stage){
        this.open_stage_id = stage.stage_id;
        this.open_groups = stage.groups;
        this.open_group = stage.groups[0];
        this.open_group_id = stage.groups[0].id;
      },

      switchGroup: function(group){
        this.open_group = group;
        this.open_group_id = group.id;
      },

      topScorer: function () {
        
        this.loading_top_scorer = true;
        axios
        .get(base_url + "/api/competition/stats/"+tournament_type)
        .then(response => {
            
            this.top_scorers = response.data.top_scorers;

            this.loading_top_scorer = false;

        });

      }

    }
});

var clubs = new Vue({
    el: '#clubs',
    data: {
      seasons: [],
      clubs: [],
      season_id : 0,
      loading: true
    },
    mounted () {
      this.fetchClubs();
    },
    methods: {
      fetchClubs: function () {
        this.loading = true;
        axios
        .get(base_url + "/api/competition/teams/"+tournament_type+"/"+this.season_id)
        .then(response => {
          if(response.data.seasons.length > 0){
            this.seasons = response.data.seasons;
          }

          this.clubs = response.data.teams;
          this.season_id = response.data.season_id;
        });

      },

      changeSeason: function(){
        this.fetchClubs();
      }

    }
});