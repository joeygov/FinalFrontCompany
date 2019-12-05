<template>
  <div>
    <Header />
    <v-data-table :headers="headers" :items="vehicle" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>List of Items</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card @submit.prevent="onSubmit" enctype="multipart/form-data">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3TKS6OkngaenOk2gXHAuEziDGtxAJ2IhS0njI6G6_uOWbhSEe&s"
                    height="200px"
                  ></v-img>
                  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                    <div class="fields">
                      <label>Upload File</label>
                      <br />
                      <input type="file" ref="file" @change="onSelect" />
                    </div>
                    <div class="fields">
                      <button>Submit</button>
                    </div>
                  </form>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Kind of Vehicle"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.brand" label="Brand"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.sit" label="Sitting Capacity"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.loc" label="Location"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.rate" label="Rate"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Header from "..//components/Header.vue";
import axios from "axios";
export default {
  components: {
    Header
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Image",
        align: "left",
        sortable: false,
        value: "img"
      },
      { text: "Type of Vehicle", value: "name", sortable: false },
      { text: "Brand", value: "brand", sortable: false },
      { text: "Sitting Capacity", value: "sit", sortable: false },
      { text: "Location", value: "loc", sortable: false },
      { text: "Rate", value: "rate", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    vehicle: [],
    editedIndex: -1,
    editedItem: {
      img: "",
      name: "",
      brand: "",
      sit: 0,
      loc: "",
      rate: ""
    },
    defaultItem: {
      img: "",
      name: "",
      brand: "",
      sit: 0,
      loc: "",
      rate: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post("http://localhost:5000/upload", formData);
        this.message = "Uploaded!!";
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
    },

    dashboard() {
      this.$router.push("/");
    },
    notify() {
      this.$router.push("/notifications");
    },
    item() {
      this.$router.push("/item");
    },
    profile() {
      this.$router.push("/profile");
    },
    initialize() {
      this.vehicle = [
        {
          img: "",
          name: "Car",
          brand: "Ferrari",
          sit: 0,
          loc: "Talisay",
          rate: "300/day"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.vehicle.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.vehicle.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.vehicle.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.vehicle[this.editedIndex], this.editedItem);
      } else {
        this.vehicle.push(this.editedItem);
      }
      this.close();
    }
  }
};

//   beforeUpload() {
//     this.file = this.$refs.myFileRef.files;
//   },
//   uploadFile: function() {
//     let formData = new FormData();
//     formData.append("file", this.file);
//      for (let i = 0; i < this.file.length; i++) {
//     formData.append("file", this.file[i]);
//     this.$axios
//       .post(`http://localhost:5000/upload`, formData)
//       .then(res => {
//         console.log(res);
//         alert(res);
//       })
//       .catch(error => {
//         console.error("file upload failed", error);
//       });
//      }
//  },
</script>




