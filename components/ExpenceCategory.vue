<template>
  <div class="col-4">


    <div class="text-left">
      <div class="text-left">
        <h1> <span style="color:red"> <strong>Expence</strong> </span> Category</h1>
        <div>
          <input class="form-control" v-model="category" placeholder="Add Category" @keyup.enter="addCategory">
          <button type="button" class="btn btn-outline-danger form-control" @click.stop="addCategory">Add Category</button>
        </div>

      </div>

      <div>
        <h3>All Category List</h3>
        <div class="list_div" v-for="(item, i) in expenceCategories" :key="i">
          <h5 class="d-inline-block">{{ item.type_name }}</h5>
          <h6 class="d-inline-block pl-2">( {{ item.amount }} TK)</h6>

          <div class="dropdown float-right">
            <button class="dropbtn">Actions</button>
            <div class="dropdown-content">
              <a @click.stop="editExpenceCatagory(item, i)">Edit</a>
              <a @click.stop="deleteExpenceCatagory(item, i)">Delete</a>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- Modal Start -->

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Update Category</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input class="form-control" v-model="editCategoryObject.type_name" placeholder="Add Category">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                  <button @click.stop="updateCategory(editCategoryObject)" type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Modal End -->
    
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'ExpenceCategory',
  props: {
    msg: String
  },
  data(){
    return{
      expenceCategories: [],
      category: '',
      showModal: false,
      editCategoryObject: '',
      editCategoryIndex: ''
    }
  },
  methods: {
    async addCategory(){
     if(this.category == '') return alert('please add category')
       const res = await axios.post('http://127.0.0.1:3333/storeExpenceCategory', {type_name: this.category, amount: 0})
     if(res.status == 200){
          //res.data.is_done = false
          //console.log(res.data)
          this.expenceCategories.push(res.data)
          this.category = ''
        }else{
          console.log('something went wrong', res)
        }
      },

      async deleteExpenceCatagory(categoryObj, index)
      {
          // console.log(categoryObj)
          // console.log(index)
          const res = await axios.post('http://127.0.0.1:3333/destroyExpenceCategory', {id: categoryObj.id})
          if(res.status == 200){
            this.expenceCategories.splice(index, 1)
          }else{
            console.log('something went wrong', res)
          }
        },

        async editExpenceCatagory(categoryObj, index)
        {
          this.showModal = true
          this.editCategoryObject = categoryObj
          this.editCategoryIndex = index
        },
        async updateCategory(editCategoryObject)
        {
          console.log(editCategoryObject);
          if(this.editCategoryObject.type_name == '') return alert('please add category')
           const res = await axios.post('http://127.0.0.1:3333/updateExpenceCategoryTypeName', {id: editCategoryObject.id, type_name: editCategoryObject.type_name })
     // console.log(res)
     if(res.status == 200){
      this.showModal = false
          //res.data.is_done = false
          // console.log(res)
          // this.expenceCategories.push(res.data)
          // this.category = ''
        }else{
          console.log('something went wrong', res)
        }
      },

      
    },
    created()
    {
      axios.get('http://localhost:3333/showExpenceCategory')
      .then((response)=> {
      // handle success
      //self.posts = response.data
      this.expenceCategories = response.data

      //console.log(response);
    })
      .catch((error)=> {
      // handle error
      console.log(error);
    });
    }
  }
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


  .list_div{
    background: #e5e5e5;
    padding: 9px;
    margin-bottom: 2px;
    cursor: pointer;
  }



  .dropbtn {
    background-color: #DC3545;
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
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {background-color: #ddd;}

  .dropdown:hover .dropdown-content {display: block;}

  .dropdown:hover .dropbtn {background-color: #9f222e;}

  /* Modal Start*/
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  /* Modal End*/

  </style>
