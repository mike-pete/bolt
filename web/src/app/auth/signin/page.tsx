import GoogleAuthButton from "~/app/_components/GoogleAuthButton";

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen justify-center">
      <GoogleAuthButton />
    </div>
  );
};

export default SignIn;
