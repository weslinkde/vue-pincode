<div align="center">
  <img width="200" height="200" src="src/assets/logo.png" alt="@weslink/vue-pincode">
</div>

### VuePincode

## Features
- Simple pincode input field
- Neumorphism styling
- Smooth animations

## Installation
In your Vue.js project:

```
npm install @weslink/vue-pincode
```

###### :speech_balloon: If you prefer static files, import assets from the `dist` folder

## Basic example
###### Login.vue
```Vue
<template>
  <div id="app">
    <div class="container">
      <vue-pincode ref="pincodeInput" @pincode="login" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VuePincode from "./components/VuePincode";

export default {
  name: "Login",
  components: {
    VuePincode
  },
  methods: {
    async login(pincode) {
      try {
        const { data } = await axios.post(`/login`, { pincode })
        this.$refs.pincodeInput.triggerSuccess();
        return { success: true, status: data.status }
      } catch (e) {
        this.$refs.pincodeInput.triggerMiss();
        return { success: false, status: e.response.data.status }
      }
    },
  }
};
</script>
```

## Events

| Event       | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| pincode     | Is triggered when the pincode is four characters long and passes it as parameter           |

## Project development
- `npm run serve` compiles and hot-reloads demo for development
- `npm run lint` lints and fixes files
- `npm run build` compiles and minifies production files and demo

## Licensing
Copyright (c) 2020 Dominik Lenz([Weslink GmbH](https://weslink.de)), [MIT License](LICENSE)