import { IconExclamationCircle } from "@tabler/icons-react";
import GoogleAuthButton from "~/app/_components/GoogleAuthButton";

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="flex max-w-96 gap-2 rounded-lg border bg-zinc-50 p-2 text-red-600">
        <IconExclamationCircle size={20} />
        <p className="gap-2 text-sm font-semibold opacity-85">
          If your account {"hasn't"} been activated you {"won't"} be able to
          login.
        </p>
      </div>
      <GoogleAuthButton />
    </div>
  );
};

export default SignIn;
