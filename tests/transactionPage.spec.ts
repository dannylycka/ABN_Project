import { mount } from "@vue/test-utils";
import "jest";
import { describe, expect, test } from "@jest/globals";
import transactionPage from "../src/components/transactionPage.vue";

describe("transaction component", () => {
  test("render", () => {
    const wrapper = mount(transactionPage);

    expect(wrapper).toBeDefined();
  });
});
