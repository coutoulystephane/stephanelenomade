"use client";

import { useEffect, useState } from "react";
import {
  getTrip,
  setCoverPhoto,
  uploadTripPhoto,
  saveTripPhoto,
} from "@/lib/archive";

type Trip = {
  id: number;
  name: string;
  visitMonth: string;
  visitYear: number;
  photoCount: number;
};

type Photo = {
  id: number;
  image_url: string;
  is_cover: boolean;
};

type Props = {
  trips: Trip[];
};

export default function UploadPhotos({ trips }: Props) {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(
    trips[0]?.id ?? null
  );

  const [files, setFiles] = useState<File[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [settingCover, setSettingCover] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const selectedTrip = trips.find(
    (trip) => trip.id === selectedTripId
  );

  async function loadPhotos(tripId: number) {
    try {
      const trip = await getTrip(tripId);

      setPhotos(
        (trip?.photos ?? []).map((photo: any) => ({
          id: photo.id,
          image_url: photo.image_url,
          is_cover: photo.is_cover,
        }))
      );
    } catch (error) {
      console.error("Error loading photos:", error);
      setPhotos([]);
    }
  }

  useEffect(() => {
    if (!selectedTripId) {
      setPhotos([]);
      return;
    }

    loadPhotos(selectedTripId);
  }, [selectedTripId]);

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
        } added to ${
          selectedTrip?.name ?? "the destination"
        } successfully.`
      );

      setFiles([]);

      await loadPhotos(selectedTripId);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while uploading the photos.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSetCover(photoId: number) {
    if (!selectedTripId) return;

    setSettingCover(photoId);
    setMessage("");

    try {
      await setCoverPhoto(selectedTripId, photoId);

      await loadPhotos(selectedTripId);

      setMessage("Cover photo updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to change the cover photo.");
    } finally {
      setSettingCover(null);
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
        Select an existing travel trip, add photos, and choose the cover photo
        for that specific trip.
      </p>

      {trips.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/60">
            No saved travel destinations are available yet.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-10">

          {/* TRIP SELECTOR */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Travel Trip
            </label>

            <select
              value={selectedTripId ?? ""}
              onChange={(event) => {
                const id = Number(event.target.value);

                setSelectedTripId(id);
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

          {/* SELECTED TRIP */}
          {selectedTrip && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Selected Trip
              </p>

              <p className="mt-2 font-serif text-2xl">
                {selectedTrip.name}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {selectedTrip.visitMonth} {selectedTrip.visitYear}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {photos.length}{" "}
                {photos.length === 1 ? "photo" : "photos"} saved
              </p>
            </div>
          )}

          {/* EXISTING PHOTOS */}
          {photos.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Existing Photos
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Select a photo to make it the cover for this trip.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative aspect-[16/10] w-full bg-black">
                      <img
                        src={photo.image_url}
                        alt="Travel photo"
                        className="h-full w-full object-cover"
                      />

                      {photo.is_cover && (
                        <div className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black">
                          ★ COVER
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {photo.is_cover ? (
                        <div className="rounded-xl bg-amber-400/10 px-4 py-3 text-center text-sm font-medium text-amber-300">
                          Current Cover Photo
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={settingCover === photo.id}
                          onClick={() => handleSetCover(photo.id)}
                          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {settingCover === photo.id
                            ? "Setting Cover..."
                            : "Set as Cover"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADD PHOTOS */}
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

          {/* UPLOAD */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Photos"}
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/70">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}