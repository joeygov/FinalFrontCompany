<template>
  <div>
    <input
      type="file"
      name="file"
      ref="myFileRef"
      multiple
      accept="/*image"
      @change="beforeUpload"
    />
    <button type="button" v-on:click="uploadFile()">Upload</button>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      file: "",
    }
  },
  methods: {
    beforeUpload() {
      this.file = this.$refs.myFileRef.files;


    },
    uploadFile: function () {

      let formData = new FormData();

      formData.append('img', this.file);
      for (let i = 0; i < this.file.length; i++) {
        formData.append("img", this.file[i]);
      }
      this.$axios.post(`http://localhost:5000/uploadMultiple`,
        formData
      ).then(res => {
        console.log(res);
        alert(res)
      })
        .catch(error => {
          console.error("file upload failed", error);
        });
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
}
</script>
