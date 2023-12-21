import { StyledLink } from "rakkasjs";
import { useRakkasBreadCrumbs } from "./useBreadCrumbs";

interface BreadCrumbsProps {}

export default function BreadCrumbs({}: BreadCrumbsProps) {
  const { breadcrumb_routes } = useRakkasBreadCrumbs();
  return (
    <div className="flex z-50 px-2 py- ">
      {breadcrumb_routes.map(({ name, path }, idx) => {
        return (
          <StyledLink
            key={name}
            href={path}
            className="text-sm text-white hover:text-[#fac091]"
            activeClass="text-[#effa91]"
          >
            {name} {idx < breadcrumb_routes.length - 1 && ">"}
          </StyledLink>
        );
      })}
    </div>
  );
}
