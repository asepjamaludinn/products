import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { ErrorText } from "@/components/atoms/ErrorText";

export const FormField = ({ label, name, error, ...inputProps }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} {...inputProps} />
    <ErrorText>{error}</ErrorText>
  </div>
);
