import {FieldProps} from 'formik';

import Form from 'react-bootstrap/Form';

type ValidFormValue = string | undefined;

type FormShape = Record<string, ValidFormValue>;

type Props<T extends FormShape> = FieldProps<ValidFormValue, T> & {
  type?: string;
  placeholder?: string;
};

function FormControlFormikInput<T extends FormShape>(props: Props<T>) {
  const {field, form, type, placeholder} = props;
  const name = field.name;

  return (
    <Form.Control
      type={type || 'text'}
      placeholder={placeholder || ''}
      name={name}
      className={form.errors[name] && form.touched[name] ? 'border border-danger' : ''}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  )
};

export default FormControlFormikInput;