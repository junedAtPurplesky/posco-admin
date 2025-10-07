import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";

export function Login() {
  return (
    <AuthCard title="Login">
      <form className="flex flex-col gap-4">
        <InputField  label="Employee ID" placeholder="Enter Employee ID" />
        <InputField
          label="Password"
          placeholder="Enter Password"
          type="password"
        />
           <span className="text-primary cursor-pointer hover:underline text-[0.8rem] font-semibold">Forget Password</span>
        <Button title="Login" type="submit"/>
      </form>
    </AuthCard>
  );
}
