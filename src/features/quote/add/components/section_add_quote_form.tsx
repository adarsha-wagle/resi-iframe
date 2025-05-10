import FirstQuestion from "./common/first_question";
import { QuoteProvider, useQuoteContext } from "./common/quote_provider";
import GutterCleaningQuesOne from "./gutter/gutter_cleaning_ques_one";

function SectionAddQuoteForm() {
  const { activeForm } = useQuoteContext();
  return (
    <QuoteProvider>
      <div className="bg-red-100 bg_dense_trees h-screen flex items-center justify-center">
        {activeForm === "firstPage" && <FirstQuestion />}
        {activeForm === "gutterQuesOne" && <GutterCleaningQuesOne />}
      </div>
    </QuoteProvider>
  );
}

export default SectionAddQuoteForm;
