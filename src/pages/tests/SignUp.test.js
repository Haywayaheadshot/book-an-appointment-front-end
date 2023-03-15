import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../SignUp';
import '@testing-library/jest-dom/extend-expect'; 

describe('SignUp component', () => {
  beforeEach(() => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  });

  it('should render the form', () => {
    const formElement = screen.getByRole('sign-up-form');
    expect(formElement).toBeInTheDocument();
  });

  // it('should update the name state when the input value changes', () => {
  //   const nameInput = screen.getByRole('Name');
  //   fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  //   expect(nameInput.value).toBe('John Doe');
  // });

  // it('should update the username state when the input value changes', () => {
  //   const usernameInput = screen.getByLabelText('Username');
  //   fireEvent.change(usernameInput, { target: { value: 'john.doe' } });
  //   expect(usernameInput.value).toBe('john.doe');
  // });

  // it('should update the password state when the input value changes', () => {
  //   const passwordInput = screen.getByLabelText('Password');
  //   fireEvent.change(passwordInput, { target: { value: 'password' } });
  //   expect(passwordInput.value).toBe('password');
  // });

  // it('should update the email state when the input value changes', () => {
  //   const emailInput = screen.getByLabelText('Email');
  //   fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  //   expect(emailInput.value).toBe('john.doe@example.com');
  // });
});
