var fixture_scroll = new Vue({
  el: '#calendar',
  data: {
    loading: true,
    event_types: [],
    month : month,
    year : year,
    season_id : season_id,
    gender : 0,
    gender_name : "All",
    month_name : "",
    month_last_date : 0,
    days: [],
    months: [],
    seasons: [],
    tournament: {},
    weeks: [],
    season: {},
    type_of_calendar : 0,
    events: [],
    total_events : 0,
    event_type : event_type,
    public : public,
    view_all: false
  },
  mounted () {

    if(month != 0) this.type_of_calendar = 1;

    this.fetchCalendar();
  },
  methods: {
    fetchCalendar: function () {
      
      this.loading = true;

      if(this.event_type == 0){

          axios
          .post(base_url + "/api/calendar",{ 
            month : this.month,
            season_id : this.season_id,
            gender: this.gender,
            public: this.public,
            year : this.year
          })
          .then(response => {
            this.loading = false;
            this.event_types = response.data.events;
            this.months = response.data.months;
            this.season = response.data.season;
            this.seasons = response.data.seasons;
            if(this.month != 0){
              this.month_name = response.data.month_name;
              this.month_last_date = response.data.month_last_date;
              this.days = response.data.days;
            }
          });

      } else {

        if(this.month == 0){
          this.view_all = true;
          this.month_name = "All";
        }

        axios
          .post(base_url + "/api/calendar/event",{ 
            month : this.month,
            season_id : this.season_id,
            event_type: this.event_type,
            public: this.public,
            year : this.year,
            view_all: this.view_all ? 1 : 0
          })
          .then(response => {

            this.loading = false;
            this.weeks = response.data.weeks;
            this.type_of_calendar = 2;

            this.months = response.data.months;
            this.season = response.data.season;
            this.seasons = response.data.seasons;
            this.tournament = response.data.tournament;

            if(!this.view_all){
              this.month_name = response.data.month_name;
            }

            this.events = response.data.events;
            this.total_events = response.data.total_events;

          });

      }
      

    },

    viewAllFixtures: function(){
      this.view_all = true;
      this.month_name = "All";
      this.fetchCalendar();
    },

    changeSeason: function(season){
      this.season = season;
      this.season_id = season.id;
      this.fetchCalendar();
    },

    changeGender: function(gender){
      this.gender = gender;
      
      if(gender == 0) this.gender_name = "All"; 
      if(gender == 1) this.gender_name = "Men"; 
      if(gender == 2) this.gender_name = "Women";

      this.fetchCalendar();
    },

    changeMonth: function(month){
      this.month = month;
      this.view_all = false;
      this.fetchCalendar();
    },

    changeYear: function(year){
      this.year = year;
      this.fetchCalendar();
    },

    changeSeason: function(season){
      this.season = season;
      this.season_id = season.id;
      this.fetchCalendar();
    },

    prevMonth: function(){
      this.month = this.month - 1;
      if(this.month < 1) {
        this.month = 12;
        this.year = this.year - 1;
      }
      this.fetchCalendar();
    },

    nextMonth: function(){
      this.month = this.month + 1;
      if(this.month > 12) {
        this.month = 1;
        this.year = this.year + 1;
      }
      this.fetchCalendar();
    }

  }
});