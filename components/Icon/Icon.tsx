// import { SVGProps } from "react";

// type IconProps = SVGProps<SVGSVGElement> & {
//   name?: string;
//   useSprite?: boolean;
//   className?: string;
// };
// export default function Icon({
//   name,
//   useSprite = true,
//   className,
//   ...rest
// }: IconProps) {
//   if (useSprite && name) {
//     return (
//       <svg className={className} {...rest}>
//         <use href={`/icons.svg#${name}`} />
//       </svg>
//     );
//   }
//   return null;
// }
