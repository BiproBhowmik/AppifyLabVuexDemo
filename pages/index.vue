<template>
  <div>
    <p>I am working here for {{ n_day }} days</p>
    <p>I am working here for {{ n_night }} night</p>

    <button v-on:click="incage">Increse</button>
    <button v-on:click="incageNight">Increse Night</button>

    <IncomeCategory />
    <ExpenceCategory />
    <IncomeExpenceComputation />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters({
      n_day: "getData",
      n_night: "getNight"
    })
  },
  methods: {
    incage: function() {
      console.log("Hi");
      this.$store.commit("incage", 1);
      console.log(this.$store.state.age);
    },
    incageNight() {
      this.$store.commit("incageNight", 5);
    }
  }
});
</script>
