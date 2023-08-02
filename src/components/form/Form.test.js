import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Form from "./Form";
import { act } from "react-dom/test-utils";

function renderFormProvider() {
  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
  return { store };
}

describe("form component", () => {
  beforeEach(() => {});

  test("submit button should be disabled by default", () => {
    renderFormProvider();
    const button = screen.getByLabelText("submit-button");
    expect(button).toBeDisabled();
  });

  test("should show error about message length", () => {
    renderFormProvider();
    const textarea = screen.getByLabelText("textarea");

    act(() => {
      userEvent.type(textarea, "Hello");
      userEvent.tab();
    });

    const errorMessageLength = screen.queryByText(
      "The minimum length of message is 10 characters."
    );
    expect(errorMessageLength).not.toBeNull();
  });

  test("should have enabled button if all inputs are valid", () => {
    renderFormProvider();

    const firstName = screen.getByLabelText("first-name");
    const lastName = screen.getByLabelText("last-name");
    const email = screen.getByLabelText("email");
    const textarea = screen.getByLabelText("textarea");

    act(() => {
      userEvent.type(firstName, "John");
      userEvent.type(lastName, "Doe");
      userEvent.type(email, "dot@dot.ua");
      userEvent.type(
        textarea,
        "Just to be sure that length is bigger than 10 chars."
      );
    });

    const button = screen.getByLabelText("submit-button");

    expect(button).not.toBeDisabled();
  });

  test("should save feedback in store", () => {
    const { store } = renderFormProvider();

    const firstName = screen.getByLabelText("first-name");
    const lastName = screen.getByLabelText("last-name");
    const email = screen.getByLabelText("email");
    const textarea = screen.getByLabelText("textarea");

    const mockedValues = {
      firstName: "John",
      lastName: "Doe",
      email: "dot@dot.ua",
      message: "Just to be sure that length is bigger than 10 chars.",
    };

    act(() => {
      userEvent.type(firstName, mockedValues.firstName);
      userEvent.type(lastName, mockedValues.lastName);
      userEvent.type(email, mockedValues.email);
      userEvent.type(textarea, mockedValues.message);
    });

    const button = screen.getByLabelText("submit-button");

    act(() => {
      userEvent.click(button);
      expect(store.getState().feedbacks[0]).toEqual(mockedValues);
    });
  });

  test("pop up should be visible on form submit", () => {
    renderFormProvider();

    const firstName = screen.getByLabelText("first-name");
    const lastName = screen.getByLabelText("last-name");
    const email = screen.getByLabelText("email");
    const textarea = screen.getByLabelText("textarea");

    act(() => {
      userEvent.type(firstName, "John");
      userEvent.type(lastName, "Doe");
      userEvent.type(email, "dot@dot.ua");
      userEvent.type(
        textarea,
        "Just to be sure that length is bigger than 10 chars."
      );
    });

    const button = screen.getByLabelText("submit-button");

    act(() => {
      userEvent.click(button);
      const popUp = screen.getByLabelText("submit-message");
      expect(popUp).toHaveStyle({ right: "-360px" });
    });
  });

  test("shoud show errors for each input fiels on focus and then blur", () => {
    renderFormProvider();

    const firstName = screen.getByLabelText("first-name");
    const lastName = screen.getByLabelText("last-name");
    const email = screen.getByLabelText("email");
    const textarea = screen.getByLabelText("textarea");

    act(() => {
      userEvent.type(firstName, "{tab}");
      userEvent.type(lastName, "{tab}");
      userEvent.type(email, "{tab}");
      userEvent.type(textarea, "{tab}");
      userEvent.tab();
    });

    const errors = screen.getAllByText("This field is required!");
    expect(errors).toHaveLength(4);
  });
});
