import { Button } from "@/components/shadcn/ui/button";
import { OAuthproviders } from "./OAuthProviders";
import { Link, navigate, usePageContext } from "rakkasjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Loader } from "lucide-react";
import { PBTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";


interface SignupFormProps {}
type TSignupformSchema = {
  email:string;
  username:string;
  password:string;
  passwordConfirm:string;
};

export function SignUpForm({}: SignupFormProps) {
  const show_form = true;
  const [show, setShow] = useState(false);
  const page_ctx = usePageContext();
  const qc = useQueryClient();

  const { handleChange, input, error, setError, setInput, validateInputs } =
    useFormHook<TSignupformSchema>({
      initialValues: {
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      },
    });
  const mutation = useMutation({
    mutationFn: (vars: typeof input) => {
      return tryCatchWrapper(
        // @ts-expect-error
        page_ctx.locals.pb?.collection("pocketbook_user").create(input),
      );
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        qc.invalidateQueries({ queryKey: ["pocketbook_user"] });
        toast("Welcome" + data?.data?.username, {
          type: "success",
        });
        navigate("/dashboard");
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const is_valid = validateInputs((ipt) => {
      if (ipt.password !== ipt.passwordConfirm) {
        setError({
          name: "passwordConfirm",
          message: "passwords do not match",
        });
        return false;
      }
      return true;
    });
    e.preventDefault();
    if (is_valid) {
      mutation.mutate(input);
    }
    // mutation.mutate(input);
  }
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col gap-4">
        {show_form && (
          <form
            className="w-full h-full  flex flex-col items-center justify-center gap-4"
            // method="POST"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <PBTheTextInput
              field_key={"email"}
              field_name="Email"
              type="email"
              required
              val={input.email}
              onChange={handleChange}
              validation_error={error}
              pb_error={mutation.data?.error}
              label_classname="min-w-fit text-sm text-accent capitalize"
            />
            <PBTheTextInput
              field_key={"username"}
              field_name="Useranme"
              type="text"
              required
              min={4}
              val={input.username}
              onChange={handleChange}
              validation_error={error}
              pb_error={mutation.data?.error}
              label_classname="min-w-fit text-sm text-accent capitalize"
            />
            <PBTheTextInput
              field_key={"password"}
              field_name="password"
              type={show ? "text" : "password"}
              required
              min={8}
              onChange={handleChange}
              val={input.password}
              validation_error={error}
              pb_error={mutation.data?.error}
              label_classname="min-w-fit text-sm text-accent capitalize"
            />
            <PBTheTextInput
              field_key={"passwordConfirm"}
              field_name="passwordConfirm"
              type={show ? "text" : "password"}
              required
              min={8}
              onChange={handleChange}
              val={input.passwordConfirm}
              validation_error={error}
              pb_error={mutation.data?.error}
              label_classname="min-w-fit text-sm text-accent capitalize"
            />

            <PBTheTextInput
              field_key={"show"}
              field_name={"show password"}
              onChange={(e) => setShow(e.target.checked)}
              type="checkbox"
              className="checkbox"
              container_classname="border-none flex flex-row-reverse gap-3 items-center justify-end "
              label_classname="min-w-fit text-sm"
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-sm btn-outline min-w-[50%]"
            >
              {" "}
              Sign Up{" "}
              {mutation.isPending && <Loader className="animate-spin" />}
            </Button>
          </form>
        )}
        {mutation.data?.error && (
          <div className="w-full flex justify-center">
            <p className="bg-error-content text-error text-sm p-2 rounded-e-lg ">
              {mutation.data.error?.message}
            </p>
          </div>
        )}
        {show_form && (
          <div className="w-full flex items-center justify-center">
            <span className="w-full border-t" />
            <span className="bg-background px-2 text-muted-foreground min-w-fit">
              Or continue with
            </span>
            <span className="w-full border-t" />
          </div>
        )}

        <OAuthproviders />
      </div>
      {show_form && (
        <p className=" text-sm">
          Already have an account ?{" "}
          <Link href="/auth" className="text-accent">
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
