import { UserSigninForm } from "@/components/form/UserSigninForm";

export default function page({}) {
  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center p-2">
      <UserSigninForm />
    </div>
  );
}
