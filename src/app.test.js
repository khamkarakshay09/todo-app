import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./app";

describe("App component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = wrapper.find("input#qa-todo-input");
  const submitBtn = wrapper.find("button#qa-submit-btn");
  it("Snapshot Test for App component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Todo Form", () => {
    expect(inputElement).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  });
});
