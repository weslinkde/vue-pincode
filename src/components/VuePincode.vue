<template>
  <div
    class="vue-pincode"
    :class="pincodeSuccess ? 'vue-pincode--success' : ''"
  >
    <div
      class="vue-pincode__fields"
      :class="pincodeError ? 'vue-pincode__fields--miss' : ''"
    >
      <span :class="pincode.length >= 1 ? 'active' : ''" />
      <span :class="pincode.length >= 2 ? 'active' : ''" />
      <span :class="pincode.length >= 3 ? 'active' : ''" />
      <span :class="pincode.length >= 4 ? 'active' : ''" />
    </div>
    <div class="vue-pincode__numbers">
      <button
        v-for="(number, idx) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="idx"
        class="shadow"
        @click="clickPinButton(number)"
        :disabled="buttonDisabled"
      >
        <span>{{ number }}</span>
      </button>
      <div />
      <button @click="clickPinButton(0)" :disabled="buttonDisabled">
        <span>0</span>
      </button>
      <button
        class="vue-pincode__undo"
        @click="resetPincode"
        :disabled="buttonDisabled"
      >
        <span>
          <undo-icon />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import UndoIcon from "./UndoIcon";

export default {
  name: "VuePincode",
  components: { UndoIcon },
  data() {
    return {
      pincode: "",
      pincodeError: false,
      pincodeSuccess: false
    };
  },
  computed: {
    pincodeLength() {
      return this.pincode.length;
    },
    buttonDisabled() {
      return this.pincodeError || this.pincodeSuccess;
    }
  },
  watch: {
    pincode() {
      if (this.pincodeLength === 4) {
        this.$emit("pincode", this.pincode);
      }
    }
  },
  destroyed() {
    this.resetPincode();
  },
  methods: {
    clickPinButton(pressedNumber) {
      if (this.pincodeLength < 4) {
        this.pincode = this.pincode + pressedNumber;
      }
    },
    resetPincode() {
      this.pincode = "";
      this.pincodeError = false;
      this.pincodeSuccess = false;
    },

    triggerMiss() {
      this.pincodeError = true;
      setTimeout(() => this.resetPincode(), 800);
    },

    triggerSuccess() {
      this.pincodeSuccess = true;
      setTimeout(() => this.resetPincode(), 2500);
    }
  }
};
</script>

<style scoped lang="scss">
.vue-pincode {
  padding: 15px;

  &__fields {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 200px;
    padding: 0 20px;
    margin: 20px auto 50px;

    &--miss {
      animation: miss 0.8s ease-out 1;
    }

    span {
      height: 14px;
      width: 14px;
      box-shadow: inset 0 0 0 2px #36485e;
      background-color: transparent;
      border-radius: 100%;
      position: relative;
      display: inline-block;
      text-align: center;
      transition: box-shadow 0.2s linear;

      &.active {
        box-shadow: inset 0 0 0 7px #36485e;
      }
    }
  }

  &__numbers {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 20px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      color: #36485e;
      background: #e8e8e8;
      user-select: none;
      font-size: 24px;
      outline: none;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.5);
      transition: all 0.2s linear;
      box-shadow: 7px 7px 15px #36485e36, -4px -4px 13px #ffffff,
        inset 4px 4px 8px rgba(209, 217, 230, 0.35),
        inset -8px -8px 8px rgba(255, 255, 255, 0.3);

      &:hover {
        box-shadow: 4px 2px 18px #36485e36, -4px -4px 13px #ffffff,
          inset 6px 6px 16px rgba(209, 217, 230, 0.8),
          inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      }

      &:active {
        box-shadow: 4px 2px 18px #36485e36, -4px -4px 13px #ffffff,
          inset 6px 6px 16px rgba(209, 217, 230, 0.8),
          inset -8px -8px 8px rgba(255, 255, 255, 0.2);
        transform: translateY(2px);
      }

      span {
        opacity: 1;
        transition: all 0.2s linear;
      }
    }
  }

  &--success {
    .vue-pincode__numbers {
      button {
        box-shadow: 0 0 0 #bbcfda, 0 0 0 #ffffff,
          inset 0 0 0 rgba(209, 217, 230, 0.35),
          inset 0 0 0 rgba(255, 255, 255, 0.3);
        transform: translateY(2px);
        color: #36485e52;

        span {
          opacity: 0.4;
        }
      }
    }

    .vue-pincode__fields {
      span {
        box-shadow: inset 0 0 0 7px #41b883;
      }
    }

    .vue-pincode__undo {
      svg {
        fill: #36485e52;
      }
    }
  }

  &__undo {
    span {
      transform: translateY(3px);
    }

    svg {
      width: 32px;
      height: 32px;
      transform: rotate(45deg);
      transition: transform 0.3s cubic-bezier(0.85, 0, 0.15, 1);
      fill: #36485e;
    }

    &:hover {
      svg {
        transform: rotate(-135deg);
      }
    }
  }
}

@keyframes miss {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-25px, 0);
  }
  20% {
    transform: translate(25px, 0);
  }
  30% {
    transform: translate(-20px, 0);
  }
  40% {
    transform: translate(20px, 0);
  }
  50% {
    transform: translate(-10px, 0);
  }
  60% {
    transform: translate(10px, 0);
  }
  70% {
    transform: translate(-5px, 0);
  }
  80% {
    transform: translate(5px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
