import { UserSignUpForm } from "@/components/form/components/UserSignupForm";

export default function page({}){
return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserSignUpForm />
    </main>
);
}
