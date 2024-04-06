import LeadMagnetEmailCapturePreview from "@/app/(dashboard)/lead-magnet-editor/[[...leadMagnetId]]/components/LeadMagnetEmailCapturePreview";
import React, { Dispatch, SetStateAction } from "react";

interface LeadMagnetEmailCaptureModalProps {
  emailCapturePrompt: string;
  leadMagnetId: string;
  setHasCapturedUserInfo: Dispatch<SetStateAction<boolean>>;
  setShowEmailCaptureModal: Dispatch<SetStateAction<boolean>>;
}

function LeadMagnetEmailCaptureModal({
  emailCapturePrompt,
  leadMagnetId,
  setHasCapturedUserInfo,
  setShowEmailCaptureModal,
}: LeadMagnetEmailCaptureModalProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center bg-black/30">
        <div className="transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl sm:w-full sm:max-w-lg sm:p-6">
          <button
            className="absolute right-2 top-2 text-2xl"
            onClick={() => setShowEmailCaptureModal(false)}
          >
            &times;
          </button>
          <LeadMagnetEmailCapturePreview
            emailCapturePrompt={emailCapturePrompt}
            leadMagnetId={leadMagnetId}
            setHasCapturedUserInfo={setHasCapturedUserInfo}
            setShowEmailCaptureModal={setShowEmailCaptureModal}
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetEmailCaptureModal;
