"use client";

import Image from "next/image";

export default function PostImage({
  cover,
  title,
}: {
  cover?: string;
  title: string;
}) {
  return cover ? (
    <div className="relative w-full h-48 mb-4">
      <Image
        src={`/storage/${cover}`}
        alt={title}
        fill
        className="object-cover rounded"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/600x400";
        }}
      />
    </div>
  ) : (
    <div className="relative w-full h-48 mb-4">
      <Image
        unoptimized
        src="https://placehold.co/600x400"
        alt="Placeholder"
        fill
        className="object-cover rounded"
      />
    </div>
  );
}
