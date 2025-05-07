
import { QrCode, Tag } from "lucide-react";

interface EntryMethodIconProps {
  method: string;
}

const EntryMethodIcon = ({ method }: EntryMethodIconProps) => {
  switch (method) {
    case "QR":
      return <QrCode className="h-4 w-4 text-green-500" />;
    case "Tag":
      return <Tag className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

export default EntryMethodIcon;
