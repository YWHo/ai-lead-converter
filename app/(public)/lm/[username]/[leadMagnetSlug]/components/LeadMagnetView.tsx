import { LeadMagnet, Profile } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import React from "react";

interface LeadMagnetViewProps {
  leadMagnet: LeadMagnet;
  profile: Profile;
}

function LeadMagnetView({ leadMagnet, profile }: LeadMagnetViewProps) {
  const sanitizedBody = DOMPurify.sanitize(leadMagnet.publishedBody);

  return (
    <div className="mb-10 flex flex-1 max-h-[85vh] flex-col overflow-y-scroll rounded-lg bg-white p-4 shadow-lg md:mb-0 md:p-8">
      {profile.profileImageUrl && (
        <Image
          className="mx-auto mb-3 drop-shadow-lg"
          alt="profile picture"
          src={profile.profileImageUrl}
          height={275}
          width={275}
        />
      )}
      <h1 className="text-center text-2xl font-semibold text-gray-800">
        {profile.title}
      </h1>
      <h2 className="text-center text-gray-500">{profile.description}</h2>
      <hr className="my-6" />
      <h1 className="mb-4 text-xl font-semibold text-gra-700 md:text-2xl">
        {leadMagnet.publishedTitle}
      </h1>
      {leadMagnet.publishedSubtitle && (
        <h2 className="mb-6 text-gray-500 md:text-2xl">
          {leadMagnet.publishedSubtitle}
        </h2>
      )}
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{ __html: sanitizedBody }}
      />
    </div>
  );
}

export default LeadMagnetView;
