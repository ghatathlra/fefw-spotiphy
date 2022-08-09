import {useCallback} from 'react';
import {FieldProps} from 'formik';

import DatePicker from 'react-datepicker';

type ValidFormValue = string | undefined;

type FormShape = Record<string, ValidFormValue>;

type Props<T extends FormShape> = FieldProps<ValidFormValue, T>;

function DatePickerFormikInput<T extends FormShape>(props: Props<T>) {
  const {field, form} = props;
  const name = field.name;

  const handleDateSelect = useCallback((date: Date) => {
    const isoString = date.toISOString();
    const event = {target: {name, value: isoString}};
    field.onChange(event);
  }, [field, name]);

  const handleDateChange = useCallback((date: Date) => {
    const isoString = date.toISOString();
    const event = {target: {name, value: isoString}};
    field.onChange(event);
  }, [field, name]);

  const handleBlur = useCallback(() => {
    const event = {target: {name}};
    field.onBlur(event);
  }, [field, name]);

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      className={form.errors[name] && form.touched[name] ? 'form-control border border-danger' : 'form-control'}
      selected={new Date(field.value || Date.now())}
      onSelect={handleDateSelect}
      onChange={handleDateChange}
      onBlur={handleBlur}
    />
  )
};

export default DatePickerFormikInput;