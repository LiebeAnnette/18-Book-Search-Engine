import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function SignupForm() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h4>Sign Up</h4>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder="Your password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Signup failed! {error.message}</div>}
      </div>
    </main>
  );
}

export default SignupForm;
