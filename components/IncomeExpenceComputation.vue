<template>
  <div class="col-4">
    <div class="text-left">
      <div class="text-left">
        <h1>
          <span>
            <strong style="color:green">Income</strong> -
            <strong style="color:red">Expence</strong>
          </span>
          Computar
        </h1>
      </div>

      <!-- income -->
      <div>
        <div>
          <h3>Add <strong style="color:green">Income</strong></h3>
          <span>Select Income Category</span>
          <select v-model="selectedIncomeCategory" class="form-control sl">
            <option
              v-for="(item, i) in incomeCategories"
              :key="i"
              v-bind:value="item"
            >
              {{ item.type_name }}
            </option>
          </select>
          <span>Add Amount</span>
          <input
            type="number"
            class="form-control"
            v-model="incomeAmount"
            placeholder="Amount"
            @keyup.enter="addIncome(selectedIncomeCategory, incomeAmount)"
          />
          <button
            type="button"
            class="btn btn-outline-success form-control"
            @click.stop="addIncome(selectedIncomeCategory, incomeAmount)"
          >
            Add Income
          </button>
        </div>
        <!-- income -->

        <!-- expence -->
        <div>
          <h3>Add <strong style="color:red">Expence</strong></h3>
          <span>Select Category</span>
          <select v-model="selectedExpenceCategory" class="form-control sl">
            <option
              v-for="(item, i) in expenceCategories"
              :key="i"
              v-bind:value="item"
            >
              {{ item.type_name }}
            </option>
          </select>
          <span>Add Amount</span>
          <input
            type="number"
            class="form-control"
            v-model="expenceAmount"
            placeholder="Amount"
            @keyup.enter="addExpence(selectedExpenceCategory, expenceAmount)"
          />
          <button
            type="button"
            class="btn btn-outline-danger form-control"
            @click.stop="addExpence(selectedExpenceCategory, expenceAmount)"
          >
            Add Expence
          </button>
        </div>
        <!-- expence -->
      </div>
    </div>

    <div>
      <h3>Profite Now = {{ totalTempIncome - totalTempExpence }} TK</h3>
      <div
        class="list_div"
        v-for="(item, i) in tempIncomeExpenceArray"
        :key="i"
      >
        <h5 class="d-inline-block">{{ item }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { mapGetters } from "vuex";
export default {
  name: "IncomeCategory",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      incomeCategories: "getIncomeCat"
    })
  },
  data() {
    return {
      // incomeCategories: [],
      expenceCategories: [],
      incomeAmount: 0,
      selectedIncomeCategory: "",
      showModal: false,
      editCategoryObject: "",
      editCategoryIndex: "",
      tempIncomeExpenceArray: [],
      totalTempIncome: 0,
      totalTempExpence: 0,
      expenceAmount: 0,
      selectedExpenceCategory: ""
    };
  },
  methods: {
    async addIncome(selectedIncomeCategory, incomeAmount) {
      if (!selectedIncomeCategory || incomeAmount == 0)
        return alert("Pleasae Select Income and Income Amount");

      const res = await axios.get(
        "http://127.0.0.1:3333/getSingleIncomeItem/" +
          selectedIncomeCategory.id +
          ""
      );

      // console.log(res.data.amount + parseFloat(incomeAmount))
      if (res.status == 200) {
        await axios.post("http://127.0.0.1:3333/increseIncomeAmount", {
          id: res.data.id,
          amount: res.data.amount + parseFloat(incomeAmount)
        });

        var incomeNameAmount =
          "(+) " + selectedIncomeCategory.type_name + " " + incomeAmount + "TK";
        this.tempIncomeExpenceArray.push(incomeNameAmount);
        this.totalTempIncome = this.totalTempIncome + parseFloat(incomeAmount);
        //console.log(this.totalTempIncome)
      } else {
        console.log("something went wrong", res);
      }
    },

    async addExpence(selectedExpenceCategory, expenceAmount) {
      if (!selectedExpenceCategory || expenceAmount == 0)
        return alert("Pleasae Select Expence and Expence Amount");

      console.log(selectedExpenceCategory.id);

      const res = await axios.get(
        "http://127.0.0.1:3333/getSingleExpenceCategoryItem/" +
          selectedExpenceCategory.id +
          ""
      );

      // console.log(res.data.amount + parseFloat(expenceAmount))
      if (res.status == 200) {
        await axios.post("http://127.0.0.1:3333/increseExpenceAmount", {
          id: res.data.id,
          amount: res.data.amount + parseFloat(expenceAmount)
        });

        var expenceNameAmount =
          "(-) " +
          selectedExpenceCategory.type_name +
          " " +
          expenceAmount +
          "TK";
        this.tempIncomeExpenceArray.push(expenceNameAmount);
        this.totalTempExpence =
          this.totalTempExpence + parseFloat(expenceAmount);
        //console.log(this.totalTempIncome)
      } else {
        console.log("something went wrong", res);
      }
    },
    async addCategory() {
      if (this.category == "") return alert("please add category");
      const res = await axios.post(
        "http://127.0.0.1:3333/storeIncomeCategory",
        { type_name: this.category, amount: 0 }
      );
      if (res.status == 200) {
        //res.data.is_done = false
        //console.log(res.data)
        this.incomeCategories.push(res.data);
        this.category = "";
      } else {
        console.log("something went wrong", res);
      }
    },

    async deleteIncomeCatagory(categoryObj, index) {
      // console.log(categoryObj)
      // console.log(index)
      const res = await axios.post(
        "http://127.0.0.1:3333/destroyIncomeCategory",
        { id: categoryObj.id }
      );
      if (res.status == 200) {
        this.incomeCategories.splice(index, 1);
      } else {
        console.log("something went wrong", res);
      }
    },

    async editIncomeCatagory(categoryObj, index) {
      this.showModal = true;
      this.editCategoryObject = categoryObj;
      this.editCategoryIndex = index;
    },
    async updateCategory(editCategoryObject) {
      //console.log(editCategoryObject);
      if (this.editCategoryObject.type_name == "")
        return alert("please add category");
      const res = await axios.post(
        "http://127.0.0.1:3333/updateIncomeCategoryTypeName",
        { id: editCategoryObject.id, type_name: editCategoryObject.type_name }
      );
      // console.log(res)
      if (res.status == 200) {
        this.showModal = false;
        //res.data.is_done = false
        // console.log(res)
        // this.incomeCategories.push(res.data)
        // this.category = ''
      } else {
        console.log("something went wrong", res);
      }
    }
  },
  created() {
    // //Income Category getting API Start
    // axios
    //   .get("http://localhost:3333/showIncomeCategory")
    //   .then(response => {
    //     // handle success
    //     //self.posts = response.data
    //     this.incomeCategories = response.data;
    //     //console.log(response);
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.log(error);
    //   });
    // //Income Category getting API End
    // //Expence Category getting API Start
    // axios
    //   .get("http://localhost:3333/showExpenceCategory")
    //   .then(response => {
    //     // handle success
    //     //self.posts = response.data
    //     this.expenceCategories = response.data;
    //     //console.log(response);
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.log(error);
    //   });
    // //Expence Category getting API End
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.list_div {
  background: #e5e5e5;
  padding: 9px;
  margin-bottom: 2px;
  cursor: pointer;
}

.dropbtn {
  background-color: #04aa6d;
  color: white;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
