import { Link, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { paths } from "@/config/paths";
import { useLogin } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { LoginSchema, type TLoginSchema } from "../common/types";
import ControlledInputField from "../../../components/reusable/controlled_input_field";
import ButtonLoading from "@/components/reusable/button_loading";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: TLoginSchema) => {
    login.mutate(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <ControlledInputField
          control={control}
          errors={errors}
          name="email"
          label="Enter your email"
          type="email"
        />
        <ControlledInputField
          control={control}
          errors={errors}
          name="password"
          label="Enter your password"
          type="password"
        />
        <div>
          <ButtonLoading
            isLoading={login.isPending}
            type="submit"
            className="w-full"
            buttonText="Log in"
            disabled={login.isPending}
            loadingText="Logging in..."
          />
        </div>
      </form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
