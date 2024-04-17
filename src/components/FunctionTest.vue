<template>
  <div>
    <input type="text" v-model="input">
    <select v-model="currentUnit">
      <option v-for="unit of units" :key="unit" >{{unit}}</option>
    </select>
    <button @click="convertBytes(input, currentUnit)">calculate</button>
    <p v-if="error">{{error}}</p>
    <p>Result: {{result}}</p>
  </div>
</template>

<script>
export default {

  data: () => {
    return {
      input: null,
      units: ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      currentUnit: null,
      error: '',
      result: ''
    }
  },
  methods: {
    convertBytes(bytes, unit) {
      if (this.error) {
        this.error = ''
      }
      console.log(typeof (bytes), unit);
      if (bytes < 0 || !bytes) {
        this.error = 'Input value must be a non-negative number.'
      }

      switch (unit) {
        case 'bytes':
          this.result =  `${bytes} ${unit}`
          break
        case 'KB':
          this.result = `${bytes / 1024} ${unit}` ;
          break
        case 'MB':
          this.result = `${bytes / (1024 * 1024)} ${unit}`;
          break
        case 'GB':
          this.result = `${bytes / (1024 * 1024 * 1024)} ${unit}`;
          break
        case 'TB':
          this.result = `${bytes / (1024 * 1024 * 1024 * 1024)} ${unit}`;
          break
        case 'PB':
          this.result = `${bytes / (1024 * 1024 * 1024 * 1024 * 1024)} ${unit}`;
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

