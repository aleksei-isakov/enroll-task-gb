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

      const calculateBytesCount = (bytes, times) => {
         if (!times) {
           return bytes
         }
          bytes /= 1024
          times -= 1
          return calculateBytesCount(bytes, times)
      }

      if (this.error) {
        this.error = '';
      }
      if (!bytes) {
        this.result = '0'
        return
      }
      if (bytes < 0) {
        this.error = 'Input value must be a non-negative number.';
        return;
      }

      const unitsMap = {
        bytes: 0,
        KB: 1,
        MB: 2,
        GB: 3,
        TB: 4,
        PB: 5,
        EB: 6,
        ZB: 7,
        YB: 8
      };

      const times = unitsMap[unit];
      const convertedBytes = calculateBytesCount(bytes, times);
      this.result = `${convertedBytes} ${unit}`;
    }
    //   if (this.error) {
    //     this.error = '';
    //   }
    //
    //   if (bytes < 0 || !bytes) {
    //     this.error = 'Input value must be a non-negative number.';
    //     return;
    //   }
    //
    //   const unitsMap = {
    //     bytes: 1,
    //     KB: 1024,
    //     MB: 1024,
    //     GB: 1024,
    //     TB: 1024,
    //     PB: 1024,
    //     EB: 1024,
    //     ZB: 1024,
    //     YB: 1024
    //   };
    //
    //   const convert = (bytes, unitIndex) => {
    //     if (unitIndex === 0) {
    //       return `${bytes} bytes`;
    //     }
    //
    //     const currentUnit = this.units[unitIndex];
    //     const currentUnitValue = unitsMap[currentUnit];
    //     const convertedBytes = bytes / currentUnitValue;
    //     return convert(convertedBytes, unitIndex - 1);
    //   };
    //
    //   this.result = convert(bytes, this.units.indexOf(unit));
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>

