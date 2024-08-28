import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar = ({ src }: AvatarProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        width={30}
        height={30}
      />
    );
  }
  return <FaUserCircle size={24} />;
};
