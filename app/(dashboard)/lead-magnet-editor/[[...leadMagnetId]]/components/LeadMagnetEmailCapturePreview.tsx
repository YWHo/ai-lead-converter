import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface LeadMagnetEmailCapturePreviewProps {
  leadMagnetId: string;
  emailCapturePrompt: string;
}

function LeadMagnetEmailCapturePreview({
  emailCapturePrompt,
  leadMagnetId,
}: LeadMagnetEmailCapturePreviewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCreatingLead, setIsCreatingLead] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingLead(true);
    axios
      .post("/api/lead", { name, email, leadMagnetId })
      .then((data) => {
        // TODO: close the modal
        // TODO: Capture the successful lead event
        toast.success("You have successfully signed up!");
      })
      .catch((err: Error | AxiosError) => {
        console.log("handleSubmit err:\n", err);
        toast.error("Something went wrong. Please try again");
      })
      .finally(() => {
        setIsCreatingLead(false);
      });
  };

  return (
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="mb-6 text-xl font-normal leading-6 text-gray-900">
        {emailCapturePrompt}
      </h3>
      <div className="mt-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-4"
          />
          <button
            type="submit"
            disabled={email.indexOf("@") === -1 || name === ""}
            className={`mt-4 rounded-lg border-2 border-purple-500 bg-white px-6 py-3`}
          >
            {"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadMagnetEmailCapturePreview;
