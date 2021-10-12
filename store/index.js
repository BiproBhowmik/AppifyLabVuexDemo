//import Vuex from 'vuex'
import Vue from "vue";
import Vuex from "vuex";

export const axios = require("axios"); //new

Vue.use(Vuex);

export const strict = false;

export const state = () => ({
  day: 100,
  night: 20,
  incomeCategories: []
});

// common getters
export const getters = {
  getData(state) {
    return state.day;
  },

  getIncomeCat(state) {
    return state.incomeCategories;
  },

  getNight(state) {
    return state.night;
  }
};

//mutations for changing data from action
export const mutations = {
  incage(state, da) {
    state.day++;
  },

  incageNight(state, da) {
    state.night += da;
  },

  getincomeCategory(state) {
    axios
      .get("http://localhost:3333/showIncomeCategory")
      .then(response => {
        // handle success
        //self.posts = response.data
        state.incomeCategories = response.data;

        // console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
};

// actionns for commiting mutations
export const actions = {};
