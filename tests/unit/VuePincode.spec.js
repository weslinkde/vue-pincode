import { mount } from "@vue/test-utils";
import VuePincode from "@/components/VuePincode.vue";

describe("VuePincode", () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(VuePincode);

  it("renders the correct markup", () => {
    expect(wrapper.find(".vue-pincode").exists()).toBe(true);
  });

  // it's also easy to check for the existence of elements
  it("has a button", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
