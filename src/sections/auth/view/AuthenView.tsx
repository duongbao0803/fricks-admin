import LoginForm from "../LoginForm";

const AuthenView = () => {
  return (
    <main className="flex flex-grow bg-[hsl(0,0%,97%)]">
      <section className="container mx-auto grid h-screen flex-grow flex-row place-items-center bg-[hsl(0,0%,97%)]">
        <LoginForm />
      </section>
    </main>
  );
};

export default AuthenView;
