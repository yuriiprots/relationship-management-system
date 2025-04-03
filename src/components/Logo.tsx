import { FC } from "react";

const Logo: FC = () => {
  const logoSrc = import.meta.env.BASE_URL + "/assets/logo_dark.png";

  return (
    <div className="flex justify-center">
      <img src={logoSrc} alt="Logo" />
    </div>
  );
};
export default Logo;
