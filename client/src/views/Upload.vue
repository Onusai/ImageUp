<template>
  <div class="content">
    <Header title="Upload" />
    <SelectFile @selected="selectedFile" v-if="state == 'select'" />
    <SelectOptions @selected="selectedOptions" v-if="state == 'options'" />
  </div>
</template>

<script>
import axios from 'axios';

import Header from '../components/Header';
import SelectFile from '../components/upload/SelectFile';
import SelectOptions from '../components/upload/SelectOptions';

export default {
  name: 'Upload',
  components: {
    Header,
    SelectFile,
    SelectOptions,
  },
  data: function() {
    return {
      file: null,
      options: null,
      state: 'select',
    };
  },
  methods: {
    selectedFile(file) {
      this.file = file;
      this.state = 'options';
    },
    selectedOptions(options) {
      this.options = options;
      this.upload();
    },
    upload() {
      let formData = new FormData();
      formData.append('image', this.file, this.file.name);
      formData.append('options', JSON.stringify(this.options));

      axios
        .post('/api/img/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          this.$router.push(`/i/${res.data.uuid}`);
        })
        .catch(res => {
          console.log(`Upload Failed!  ${res}`);
        });
    },
  },
  watch: {
    '$store.getters.reload': function(val) {
      if (val) {
        this.file = null;
        this.state = 'select';
        this.$store.dispatch('setReload', false);
      }
    },
  },
};
</script>

<style scoped></style>
