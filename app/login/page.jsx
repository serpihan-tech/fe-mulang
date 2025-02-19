import LoginForm from "../component/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden flex items-center justify-center">
      <img 
        src="svg/ellipse_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-10 h-3/4 w-1/2" 
      />
      
      <LoginForm/>

      <img 
        src="svg/ellipse_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2" 
      />

    </div>
  );
}