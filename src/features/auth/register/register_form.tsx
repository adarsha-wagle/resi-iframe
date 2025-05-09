import { Link, useSearchParams } from "react-router";

import { paths } from "@/config/paths";
import { useRegister } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { RegisterSchema, type TRegisterSchema } from "../common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInputField from "@/components/reusable/controlled_input_field";
import ButtonLoading from "@/components/reusable/button_loading";

type TRegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: TRegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <ControlledInputField
          control={control}
          name="firstName"
          errors={errors}
          label="First Name"
          required
        />
        <ControlledInputField
          control={control}
          name="lastName"
          errors={errors}
          label="Last Name"
          required
        />
        <ControlledInputField
          control={control}
          name="email"
          errors={errors}
          label="Email"
          required
        />
        <ControlledInputField
          control={control}
          name="password"
          errors={errors}
          label="Password"
          type="password"
          required
        />

        <div>
          <ButtonLoading
            isLoading={registering.isPending}
            type="submit"
            className="w-full"
            buttonText="Register"
            loadingText="Registering..."
          />
        </div>
      </form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
