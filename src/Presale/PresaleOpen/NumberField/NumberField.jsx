import { forwardRef } from "react";
import NumberFormat from "react-number-format";

const NumberField = ({ onChange, ...rest }, ref) => {
  return (
    <NumberFormat
      {...rest}
      getInputRef={ref}
      decimalScale={0}
      onValueChange={({ value }) => {
        onChange({
          target: {
            name: rest.name,
            value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

export default forwardRef(NumberField);
