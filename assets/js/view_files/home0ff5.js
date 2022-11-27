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
        .get(base_url + "/api/latest-fixtures")
        .then(response => {
          // console.log(response);
          
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
                    650 : {
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


//points table start
if(typeof points_table_data !== 'undefined'){
  var point_table = new Vue({
    el: '#point_table',
    data: {
      points_table: [],
      league_slug: points_table_data.league_slug,
      league_name: points_table_data.league_name,
      open_index: 0,
      loading: true
    },
    mounted () {
      this.fetchPT(this.league_slug, this.league_name);
    },
    methods: {
      fetchStage: function (value) {
        if(this.open_index != value){
          this.open_index = value;
        } else this.open_index = -1;
        
      },

      fetchPT: function(value,name){
        
        this.league_slug = value;
        this.league_name = name;
        this.loading = true;
        this.points_table.stages = [];

        let form_data = new FormData;
        form_data.append('action', 'points_table');
        form_data.append('league_slug', this.league_slug);

        axios
          .get(base_url + "/api/stats/points-table/"+this.league_slug,form_data)
          .then(response => {
            this.loading = false;
            this.points_table = response.data;
            this.open_index = response.data.stages[0].stage_id;
          });
      }
    }
  });
}
//points table end

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(messageEvent,function(e) {
  console.log(e);
  if(e.origin == 'https://www.the-aiff.com/portal'){
      jQuery("#aiff-iframe iframe").css('height', parseInt(e.data) + "px");
    }
},false);