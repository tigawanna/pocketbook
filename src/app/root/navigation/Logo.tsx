import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    width?: number;
    height?: number;
}

export function Logo({height=150,width=150}: LogoProps) {
  return (
    <Link href="/" className="w-fit z-50 flex items-center justify-center hover:brightness-150">
    
      <Image 
      src="/pocketbook.svg"
      alt="logo"
      className="" 
      width={width} 
      height={height}
      />
    </Link>
  );
}
