import {FC, useCallback, useContext} from 'react';
import {Formik, Form as FormikForm, Field, ErrorMessage, FieldProps} from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {AuthenticationContext} from '../../contexts';
import {callLogin} from '../../services/apis';

import styles from './Login.module.css';

type LoginForm = {
  username: string;
  password: string;
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
  return errors;
}

const Login: FC<{}> = () => {
  const {setLoggedIn} = useContext(AuthenticationContext);

  const handleSubmitLoginForm = useCallback(async (form: LoginForm) => {
    const loginResponse = await callLogin({username: form.username, password: form.password});
    setLoggedIn(loginResponse);
  }, [setLoggedIn]);

  return (
    <Formik<LoginForm>
      initialValues={{
        username: '',
        password: '',
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
            render={({field, form}: FieldProps<LoginForm, LoginForm>) => (
              <Form.Control
                type="text"
                placeholder="Enter username"
                name={field.name}
                className={form.errors.username && form.touched.username ? 'border border-danger' : ''}
                value={field.value.username}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <ErrorMessage name="username" render={(msg: string) => <small className="text-danger">{msg}</small>} />
        </Form.Group>

        <Form.Group controlId="password_input">
          <Form.Label>Password</Form.Label>
          <Field
            name="password"
            render={({field, form}: FieldProps<LoginForm, LoginForm>) => (
              <Form.Control
                type="password"
                placeholder="Enter password"
                name={field.name}
                className={form.errors.password && form.touched.password ? 'border border-danger' : ''}
                value={field.value.password}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {/* <Field as={Form.Control} name="password" type="password" placeholder="Enter password" /> */}
          <ErrorMessage name="password" render={(msg: string) => <small className="text-danger">{msg}</small>} />
        </Form.Group>

        <Button block variant="primary" type="submit">
          Login
        </Button>
      </FormikForm>
    </Formik>
  );
};

export default Login;
