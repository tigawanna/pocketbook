import { Link, navigate, usePageContext } from "rakkasjs";
import { OAuthproviders } from "./OAuthProviders";
import { Button } from "@/components/shadcn/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailPasswordLogin } from "@/lib/pb/client";
import { toast } from "react-toastify";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { Loader, Unlock } from "lucide-react";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { PBTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const page_ctx = usePageContext();
  const [show, setShow] = useState(false);
  const qc = useQueryClient();
  const show_form = true;
  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<{ usernameOrEmail: string; password: string }>({
      initialValues: {
        password: "",
        usernameOrEmail: "",
      },
    });

  const mutation = useMutation({
    mutationFn: (vars: { usernameOrEmail: string; password: string }) => {
      return emailPasswordLogin(vars.usernameOrEmail, vars.password);
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        qc.invalidateQueries({ queryKey: ["pocketbook_user"] });
        toast("Welcome back " + data?.data?.record?.username, {
          type: "success",
        });
        navigate("/dashboard");
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  const pw_reset_request_mutation = useMutation({
    mutationFn: (vars: { email: string }) => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("pocketbook_user")
          .requestPasswordReset(vars.email),
      );
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        toast("Password reset request sent, check your email", {
          type: "success",
        });
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  // function resetPassordUrl(){
  //   page_ctx.url.searchParams.get("reset_password")
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if(emailRegex.test(input.usernameOrEmail)){
  //     page_ctx.url.searchParams.set("email", input.usernameOrEmail);
  //   }
  //   page_ctx.url.pathname = "/auth/reset"
  //   return page_ctx.url.toString()
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
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
            <h1 className="text-2xl font-bold">Sign In</h1>

            <PBTheTextInput
              field_key={"usernameOrEmail"}
              field_name="usernameOrEmail"
              label_classname="min-w-fit text-sm text-accent capitalize"
              onChange={handleChange}
              required
              val={input.usernameOrEmail}
            />

            <PBTheTextInput
              field_key={"password"}
              field_name="password"
              type={show ? "text" : "password"}
              label_classname="min-w-fit text-sm text-accent capitalize"
              required
              min={8}
              onChange={handleChange}
              val={input.password}
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
              Sign in{" "}
              {mutation.isPending && <Loader className="animate-spin" />}
            </Button>
          </form>
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
        <div className="flex flex-col gap-2">
          <p className=" text-sm">
            New here ? Create an account ?{" "}
            <Link href="/auth/signup" className="text-accent">
              Sign up
            </Link>
          </p>
          <button
            className="btn btn-outline btn-sm flex text-xs gap-2 h-2 "
            disabled={pw_reset_request_mutation.isPending}
            onClick={() =>
              pw_reset_request_mutation.mutate({ email: input.usernameOrEmail })
            }
          >
            <h3>Forgot password</h3>
            <Unlock className="h-4 w-4 text-red-600" />
            {pw_reset_request_mutation.isPending && (
              <Loader className="animate-spin" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
