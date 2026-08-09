"use client";

import { useState } from "react";
import { uploadTripPhoto, saveTripPhoto } from "@/lib/archive";

const TRIP_ID = 17;

export default function AdminPhotosPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (files.length === 0) {
      setMessage("Please select at least one photo.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      for (const file of files) {
        const uploaded = await uploadTripPhoto(file);

        await saveTripPhoto({
          tripId: TRIP_ID,
          fileName: uploaded.fileName,
          imageUrl: uploaded.imageUrl,
        });
      }

      setMessage(
        `${files.length} photo${files.length === 1 ? "" : "s"} added to Cannes successfully.`
      );

      setFiles([]);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while uploading the photos.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.4em] text-yellow-400">
          Photo Manager
        </p>

        <h1 className="mt-4 font-serif text-5xl font-light">
          Add Photos to Cannes
        </h1>

        <p className="mt-4 text-white/50">
          Trip ID: {TRIP_ID}
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              if (!event.target.files) return;
              setFiles(Array.from(event.target.files));
            }}
            className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />

          {files.length > 0 && (
            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                Selected Photos
              </p>

              <ul className="mt-3 space-y-2 text-white/70">
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="mt-8 rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Photos to Cannes"}
          </button>

          {message && (
            <p className="mt-6 text-white/70">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}