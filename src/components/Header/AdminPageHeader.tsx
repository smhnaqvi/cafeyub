import Link from "next/link";
import { ArrowRightIcon } from "../Icons";

type AdminPageHeaderProps = {
  title: string;
  backLink?: string;
};
const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  backLink,
}) => {
  return (
    <div className="border-b-2 py-4 mb-4">
      <div className="container mx-auto flex gap-8 ">
        {backLink && (
          <Link href={backLink}>
            <ArrowRightIcon />
          </Link>
        )}
        <p className="text-2xl">{title}</p>
      </div>
    </div>
  );
};

export default AdminPageHeader;
