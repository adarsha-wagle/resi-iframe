import { type TActiveForm } from "./add_quote_types.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { useQuoteContext } from "./quote_provider.tsx";

type TAddQuotePreviousButtonProps = {
  to: TActiveForm;
};

function AddQuotePreviousButton({ to }: TAddQuotePreviousButtonProps) {
  const { setActiveForm } = useQuoteContext();

  const handleBackClick = () => {
    setActiveForm(to);
  };

  return (
    <Button
      className="responsive__fontsize16 font-bold"
      onClick={handleBackClick}
    >
      <ArrowLeft /> back
    </Button>
  );
}

export default AddQuotePreviousButton;
