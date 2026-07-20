"use client";

import { useRef, useState } from "react";

import {
  saveTravel,
  uploadTripPhoto,
  saveTripPhoto,
} from "@/lib/archive";

import ContinentSelect from "./ContinentSelect";
import CountrySelect from "./CountrySelect";
import DestinationSelect from "./DestinationSelect";

export default function AddDestinationForm() {
  const [selectedContinent, setSelectedContinent] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  const [visitMonth, setVisitMonth] = useState("January");
  const [visitYear, setVisitYear] = useState(new Date().getFullYear());
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

  async function handleSave() {
  if (!selectedDestination) {
    alert("Please select a destination.");
    return;
  }

  try {
    setSaving(true);

    const trip = await saveTravel({
      destinationId: selectedDestination,
      visitMonth,
      visitYear,
      notes,
    });

    for (const photo of photos) {
      const uploaded = await uploadTripPhoto(photo);

      await saveTripPhoto({
        tripId: trip.id,
        fileName: uploaded.fileName,
        imageUrl: uploaded.imageUrl,
      });
    }

    alert("Visit saved successfully!");

    // Reset the form
    setSelectedContinent(null);
    setSelectedCountry(null);
    setSelectedDestination(null);

    setVisitMonth("January");
    setVisitYear(new Date().getFullYear());

    setNotes("");
    setPhotos([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } catch (error) {
    console.error(error);
    alert("Unable to save visit.");
  } finally {
    setSaving(false);
  }
}

return (
  <div className="mx-auto max-w-3xl px-8 py-12">
      <h1 className="text-5xl font-bold">
        Travel Archive
      </h1>

      <p className="mt-3 text-white/60">
        Record a visit to an existing destination.
      </p>

      <div className="mt-12 space-y-8">

        <ContinentSelect
          value={selectedContinent}
          onChange={(id) => {
            setSelectedContinent(id);
            setSelectedCountry(null);
            setSelectedDestination(null);
          }}
        />

        <CountrySelect
          continentId={selectedContinent}
          value={selectedCountry}
          onChange={(id) => {
            setSelectedCountry(id);
            setSelectedDestination(null);
          }}
        />

        <DestinationSelect
          countryId={selectedCountry}
          value={selectedDestination}
          onChange={setSelectedDestination}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            📅 Month
          </label>

          <select
            value={visitMonth}
            onChange={(e) => setVisitMonth(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
          >
            <option className="bg-[#08121f]">January</option>
            <option className="bg-[#08121f]">February</option>
            <option className="bg-[#08121f]">March</option>
            <option className="bg-[#08121f]">April</option>
            <option className="bg-[#08121f]">May</option>
            <option className="bg-[#08121f]">June</option>
            <option className="bg-[#08121f]">July</option>
            <option className="bg-[#08121f]">August</option>
            <option className="bg-[#08121f]">September</option>
            <option className="bg-[#08121f]">October</option>
            <option className="bg-[#08121f]">November</option>
            <option className="bg-[#08121f]">December</option>
          </select>
        </div>
                <div>
          <label className="mb-2 block text-sm font-medium">
            📅 Year
          </label>

          <select
            value={visitYear}
            onChange={(e) => setVisitYear(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
          >
            {Array.from({ length: 60 }, (_, i) => {
              const year = new Date().getFullYear() - i;

              return (
                <option
                  key={year}
                  value={year}
                  className="bg-[#08121f]"
                >
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            📝 Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Stayed near the old town. Visited local markets and famous landmarks..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            📷 Photos
          </label>

        <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;
              setPhotos(Array.from(e.target.files));
            }}
            className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />

          {photos.length > 0 && (
            <p className="mt-2 text-sm text-white/60">
              {photos.length} photo{photos.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

      </div>

      <div className="mt-12 flex justify-end">

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Visit"}
        </button>
      </div>
    </div>
  );
}