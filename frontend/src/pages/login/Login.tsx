import {FC, useCallback, useContext} from 'react';
import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {AuthenticationContext} from '../../contexts';
import {callLogin} from '../../services/apis';

import {DatePickerFormikInput, FormControlFormikInput} from '../../components';

import styles from './Login.module.css';

type LoginForm = {
  username: string;
  password: string;
  logindate: string;
};

type LoginFormErrors = Partial<Record<keyof LoginForm, string>>;

function validateLoginForm(form: LoginForm): LoginFormErrors {
  const errors: LoginFormErrors = {};
  if (!form.username || typeof form.username !== 'string') {
    errors.username = 'Username is required';
  }
  if (!form.password || typeof form.password !== 'string') {
    errors.password = 'Password is required';
  }
  if (!form.logindate || typeof form.logindate !== 'string') {
    errors.logindate = 'Login date is required';
  }
  return errors;
}

const Login: FC<{}> = () => {
  const {setLoggedIn} = useContext(AuthenticationContext);

  const handleSubmitLoginForm = useCallback(
    async (form: LoginForm) => {
      const loginResponse = await callLogin({username: form.username, password: form.password});
      setLoggedIn(loginResponse);
    },
    [setLoggedIn],
  );

  return (
    <Formik<LoginForm>
      initialValues={{
        username: '',
        password: '',
        logindate: new Date().toISOString(),
      }}
      validate={validateLoginForm}
      onSubmit={handleSubmitLoginForm}
    >
      <FormikForm className={styles.loginform + ' p-3 border rounded'}>
        <h1 className="text-center">Spotiphy</h1>

        <Form.Group controlId="username_input">
          <Form.Label>Username</Form.Label>
          <Field
            name="username"
            type="text"
            placeholder="Enter Username"
            component={FormControlFormikInput}
          />
          <ErrorMessage name="username" render={(msg: string) => <small className="text-danger">{msg}</small>} />
        </Form.Group>

        <Form.Group controlId="password_input">
          <Form.Label>Password</Form.Label>
          <Field
            name="password"
            type="password"
            placeholder="Enter Password"
            component={FormControlFormikInput}
          />
          {/* <Field as={Form.Control} name="password" type="password" placeholder="Enter password" /> */}
          <ErrorMessage name="password" render={(msg: string) => <small className="text-danger">{msg}</small>} />
        </Form.Group>

        <Form.Group controlId="password_input">
          <Form.Label>Login Date</Form.Label>
          <Field
            name="logindate"
            component={DatePickerFormikInput}
          />
          {/* <Field as={Form.Control} name="password" type="password" placeholder="Enter password" /> */}
          <ErrorMessage name="logindate" render={(msg: string) => <small className="text-danger">{msg}</small>} />
        </Form.Group>

        <Button block variant="primary" type="submit">
          Login
        </Button>
      </FormikForm>
    </Formik>
  );
};

export default Login;
