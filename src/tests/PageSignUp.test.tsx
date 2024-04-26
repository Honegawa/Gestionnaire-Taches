import PageSignUp from "../pages/PageSignUp";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import { waitFor, render, fireEvent } from "@testing-library/react";
import Axios from "axios";
import './../pages/PageSignUp.css';

describe("Inscription", () => {
  
  it("Test d'affichage de la confirmation d'inscription", async () => {

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
          <PageSignUp />
      </BrowserRouter>
    );

    const mock = jest.spyOn(Axios, "post");
    mock.mockImplementation(() => Promise.resolve(
      {
          status: 201,
          data: {
            message: "User Created",
          },
      }
    ));

    const emailInput = getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@test.mail" } });

    const passwordInput = getByLabelText("Mot de passe") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "test" } });

    const button = getByText("S'Inscrire");
    fireEvent.click(button);

    await waitFor(
      () => expect(getByText('Félicitation, vous êtes bien inscrit !')).toBeInTheDocument()
    );

  });
});
