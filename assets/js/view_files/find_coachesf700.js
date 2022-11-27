var find_coaches = new Vue({
    el: '#find_coaches',
    data: {
      states: [],
      licenses: [],
      coaches : [],
      types : [],
      loading: true,
      loading_coaches: true,
      total: 0,
      show_filter: false,
      show_pagination: false,
      max_page: 1,
      pages: [],
      filter : {
        selected_licenses: [],
        selected_states: [],
        selected_types: [],
        search_name : "",
        page_number : 1,
        max: 8
      }
    },
    mounted () {
      this.fetchDetails();
      this.fetchCoaches(true);
    },
    methods: {

      selectItem: function(ar_type, value, reload){
        var items = this.filter[ar_type];
        var idx = items.indexOf(value);
        if(idx > -1){
          items.splice(idx,1);
        } else {
          items.push(value);
        }

        this.filter[ar_type] = items;
        
        if(reload){
          this.fetchCoaches(true);
        } else {
          
        }
      },

      fetchDetails: function () {
        
        this.loading = true;

        axios
        .get(base_url + "/api/"+type+"/init")
        .then(response => {
          this.loading = false;
          this.states = response.data.states;
          this.licenses = response.data.licenses;
          this.types = response.data.types;
        });

      },

      fetchCoaches: function (reset_paging) {
        
        if(this.show_filter){
          this.closeFilter();
        }

        this.loading_coaches = true;
        if(reset_paging) {
          this.filter.page_number = 1;
          this.show_pagination = false;
        }

        axios
        .post(base_url + "/api/"+type+"/filter",this.filter)
        .then(response => {
          this.coaches = response.data.members;
          this.loading_coaches = false;
          if(this.filter.page_number == 1){
            this.total = response.data.total;
            this.setPagination();

          }

        });

      },

      setPagination: function(){
          if(this.total > this.filter.max){
              this.show_pagination = true;
              this.max_page = Math.ceil(this.total/this.filter.max);
              this.setCurrentPageList();
          } else {
              this.show_pagination = false;
          }
      },

      setCurrentPageList: function(){
          var pages = [];
          if(this.filter.page_number == 1){
              pages.push(1);    
              pages.push(2);    
              if(this.max_page > 2) pages.push(3);    
          } else {
              if(this.max_page == this.filter.page_number && this.max_page > 2){
                  pages.push(this.filter.page_number - 2);
              }
              pages.push(this.filter.page_number - 1);    
              pages.push(this.filter.page_number);
              if(this.max_page != this.filter.page_number){
                  pages.push(this.filter.page_number + 1);
              }
          }

          this.pages = pages;
      },

      handlePage: function(page_number){
          // console.log(page_number);
          if(page_number < 1 || page_number > this.max_page || page_number == this.filter.page_number){
              return;
          }

          this.filter.page_number = page_number;
          this.setCurrentPageList();
          this.fetchCoaches(false);
      },

      openFilter: function(){
        var height = $(window).height() - 100;
        $(".mobile-filters .filters").css( "height", height+"px" );

        this.show_filter = !this.show_filter;
        $(".mob-filters").show();
        $(".page-overlay").show();
      },

      closeFilter: function(){
        this.show_filter = !this.show_filter;
        $(".mob-filters").hide();
        $(".page-overlay").hide();
      }

    }
});