import { useMemo } from "react";

import logoMain from "@/assets/logo/logo.png";

type TLogoVariant = "orange" | "white";

type TLogoProps = {
  className?: React.ComponentProps<"img">["className"];
  variant?: TLogoVariant;
};

const checkVariant = (variant: TLogoVariant) => {
  if (variant === "orange") {
    return logoMain;
  }
  return logoMain;
};

function Logo({ className, variant = "orange" }: TLogoProps) {
  const logoSrc = useMemo(() => checkVariant(variant), [variant]);

  return <img src={logoSrc} alt="Vibezz logo" className={className} />;
}

export default Logo;
