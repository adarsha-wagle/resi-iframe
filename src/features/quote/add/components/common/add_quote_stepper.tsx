const steps = [
  { title: "Step 1", description: "Your Info" },
  { title: "Step 2", description: "Job Info" },
  { title: "Step 3", description: "Job Submitted to marketplace for bidding" },
];

import { Stepper } from "@/components/ui/stepper";

function AddQuoteStepper({ activeStep }: { activeStep: number }) {
  return (
    <div>
      <Stepper steps={steps} currentStep={activeStep} onStepChange={() => {}} />
    </div>
  );
}

export default AddQuoteStepper;
