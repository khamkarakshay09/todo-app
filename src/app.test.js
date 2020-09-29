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

  const formElement = wrapper.find("form#qa-todo-form");
  const inputElement = wrapper.find("input#qa-todo-input");
  const submitBtn = wrapper.find("button#qa-submit-btn");
  const listItem = wrapper.find("div#qa-listItem");
  const todoCount = wrapper.find("p#qa-count");
  const allBtn = wrapper.find("button#All");
  const activeBtn = wrapper.find("button#Active");
  const completeBtn = wrapper.find("button#Completed");
  const noDate = wrapper.find("div#qa-no-data");

  it("Snapshot Test for App component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("1. Test for loading form", () => {
    expect(formElement).toHaveLength(1);
    expect(inputElement).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  });

  // it("2. Test for form input", () => {
  //   inputElement.simulate("change", {
  //     target: { value: "Task 1" },
  //   });
  //   expect(inputElement.text()).toBe("Task 1");
  // });

  it("3. Test for form submit", () => {
    inputElement.simulate("change", {
      target: { value: "Task 1" },
    });
    submitBtn.simulate("click");
    expect(inputElement.text()).toBe("");
  });

  it("4. Test for loading list", () => {
    expect(listItem).toHaveLength(0);
    expect(noDate).toHaveLength(1);
    expect(todoCount.text()).toBe("All(0)");
    expect(allBtn).toHaveLength(1);
    expect(activeBtn).toHaveLength(1);
    expect(completeBtn).toHaveLength(1);
  });

  it("5. Test for filter list", () => {
    allBtn.simulate('click');
    expect(noDate).toHaveLength(1);
    activeBtn.simulate("click");
    expect(noDate).toHaveLength(1);
    completeBtn.simulate("click");
    expect(noDate).toHaveLength(1);
  });
});
