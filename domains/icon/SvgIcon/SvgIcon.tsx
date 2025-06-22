import classNames from "classnames";
import { type ComponentProps } from "react";

type SvgIconProps = {
  path: string;
} & ComponentProps<"svg">;

export const SvgIcon = (props: SvgIconProps) => {
  const { className, path, ...rest } = props;

  return (
    <svg
      className={classNames("svg-icon", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d={path} />
    </svg>
  );
};
