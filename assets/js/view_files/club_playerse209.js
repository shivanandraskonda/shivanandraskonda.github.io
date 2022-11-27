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
      .get(base_url + "/api/club/squad/"+club_id+"/"+tournament_type)
      .then(response => {
          this.players = response.data.players;
          if(this.players.length == 0){
            $("#squad").hide();
          }
      });
    }

  }
});