"use client";

import { useState } from "react";
import { uploadTripPhoto, saveTripPhoto } from "@/lib/archive";

type Trip = {
  id: number;
  name: string;
  visitMonth: string;
  visitYear: number;
  photoCount: number;
};

type Props = {
  trips: Trip[];
};

export default function UploadPhotos({ trips }: Props) {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(
    trips[0]?.id ?? null
  );

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedTrip = trips.find(
    (trip) => trip.id === selectedTripId
  );

  async function handleUpload() {
    if (!selectedTripId) {
      setMessage("Please select a destination.");
      return;
    }

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
          tripId: selectedTripId,
          fileName: uploaded.fileName,
          imageUrl: uploaded.imageUrl,
        });
      }

      setMessage(
        `${files.length} photo${
          files.length === 1 ? "" : "s"
        } added to ${selectedTrip?.name ?? "the destination"} successfully.`
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
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <p className="text-xs uppercase tracking-[0.4em] text-yellow-500">
        Photo Manager
      </p>

      <h1 className="mt-4 font-serif text-5xl font-light">
        Add Destination Photos
      </h1>

      <p className="mt-4 max-w-2xl text-white/50">
        Select an existing destination from your Travel Archive and add
        photos to it.
      </p>

      {trips.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/60">
            No saved travel destinations are available yet.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-8">

          <div>
            <label className="mb-3 block text-sm font-medium">
              Destination
            </label>

            <select
              value={selectedTripId ?? ""}
              onChange={(event) => {
                setSelectedTripId(Number(event.target.value));
                setFiles([]);
                setMessage("");
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
            >
              {trips.map((trip) => (
                <option
                  key={trip.id}
                  value={trip.id}
                  className="bg-[#08121f]"
                >
                  {trip.name} — {trip.visitMonth} {trip.visitYear} —{" "}
                  {trip.photoCount}{" "}
                  {trip.photoCount === 1 ? "photo" : "photos"}
                </option>
              ))}
            </select>
          </div>

          {selectedTrip && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Selected Destination
              </p>

              <p className="mt-2 font-serif text-2xl">
                {selectedTrip.name}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {selectedTrip.visitMonth} {selectedTrip.visitYear}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {selectedTrip.photoCount}{" "}
                {selectedTrip.photoCount === 1 ? "photo" : "photos"} already
                saved
              </p>
            </div>
          )}

          <div>
            <label className="mb-3 block text-sm font-medium">
              Add Photos
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                if (!event.target.files) return;

                setFiles(Array.from(event.target.files));
                setMessage("");
              }}
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />

            {files.length > 0 && (
              <div className="mt-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                  Selected Photos
                </p>

                <ul className="mt-3 space-y-2 text-white/70">
                  {files.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={
                uploading ||
                files.length === 0 ||
                !selectedTripId
              }
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Add Photos"}
            </button>
          </div>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-white/70">{message}</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
