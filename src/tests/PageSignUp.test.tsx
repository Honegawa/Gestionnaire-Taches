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

    // SIMULE UNE 201 si l'api AXIOS POST est appellé
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
    const mail = emailInput.value;

    const passwordInput = getByLabelText("Mot de passe") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "test" } });
    const mdp = passwordInput.value;

    const button = getByText("S'Inscrire");
    fireEvent.click(button);

    const mockedUser:any = {
      email: mail,
      password: mdp,
    }

    await Axios.post('http://localhost:5678/api/users/signup', mockedUser);

    // waitFor permet d'attendre que
    await waitFor(
      () => expect(getByText('Féliciation, vous êtes bien inscrit !')).toBeInTheDocument()
    );

  });
});
