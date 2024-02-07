type IconProps = React.HTMLAttributes<SVGElement>;
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export const Icons = {
  google: (props: IconProps) => <FcGoogle {...props} />,
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  eye: (props: IconProps) => <FaRegEye {...props} />,
  eyeOff: (props: IconProps) => <FaRegEyeSlash {...props} />,
};
