import InputEmail from "../component/InputEmail";

export default function InputEmailPage() {
  return (
    <div className="relative  min-h-screen overflow-hidden flex items-center justify-center">
      <img 
        src="svg/ellipse_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-10 h-3/4 w-1/2" 
      />
      
      <InputEmail/>

      <img 
        src="svg/ellipse_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2" 
      />

    </div>
  );
}