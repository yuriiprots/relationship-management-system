import { FC } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const FormInput: FC<FormInputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="mb-2 flex flex-col">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <input
        className="my-2 w-full rounded border border-gray-300 p-2"
        name={name}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
