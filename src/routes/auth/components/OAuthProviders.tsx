import { oneClickOauthLogin } from "@/lib/pb/client";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GithubIcon, Loader } from "lucide-react";
import { navigate, usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const page_ctx = usePageContext()
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (provider: "github" | "google") => {
      return tryCatchWrapper(oneClickOauthLogin(provider));
    },
    onSuccess(data, variables, context) {
      if (data && data?.data) {
        toast("Welcome" + data?.data?.username, {
          type: "success",
        });
        qc.invalidateQueries({ queryKey: ["pocketbook_user"] });
        const navigate_to = page_ctx.url.searchParams.get("redirect");
        navigate(navigate_to??"/");
      }
      if (data.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <button
          onClick={() => mutation.mutate("github")}
          disabled={mutation.isPending}
          className="btn btn-wide btn-outline text-lg"
        >
          <GithubIcon className="" />
          Github
          {mutation.isPending && <Loader className="animate-spin" />}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
