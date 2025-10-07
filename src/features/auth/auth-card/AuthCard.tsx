import { ReactNode } from "react";
import Image from "next/image";

import { ImageRegistry } from "@/constants";

interface IAuthCardProps {
  title: string;
  copyright?: string;
  children: ReactNode;
}

export const AuthCard: React.FC<IAuthCardProps> = ({
  title,
  children,
}) => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center px-4 md:px-10 xl:px-[6vw] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={ImageRegistry.authBackground}
          alt="auth-background"
          fill
          priority
          className="object-cover w-full h-full"
        />
        {/* Optional overlay for dimming effect */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Logo Above Card */}
      <div className="h-30 w-44 mb-6">
        <Image
          src={ImageRegistry.websiteLogo}
          alt="website-logo"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Auth Card */}
      <div className="bg-white box-shadow flex flex-col p-6 rounded-2xl w-full sm:w-[60%] md:w-[50vw] lg:w-[36vw] xl:w-[26rem]">
        <h1 className="text-[1.3rem] font-semibold mb-6 text-center">
          {title}
        </h1>

        {/* Children (form fields) */}
        <div className="w-full space-y-4">{children}</div>
      </div>
    </section>
  );
};
