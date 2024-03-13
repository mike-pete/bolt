import GoogleAuthButton from "~/app/_components/GoogleAuthButton";

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <GoogleAuthButton />
    </div>
  );
};

export default SignIn;
