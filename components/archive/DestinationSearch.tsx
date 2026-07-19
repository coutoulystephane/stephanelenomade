"use client";

import { useEffect, useRef, useState } from "react";
import { searchDestinations } from "@/lib/archive";

type Destination = {
  geonameId: number;
  name: string;
};

type DestinationSearchProps = {
  countryId: number | null;
  value: number | null;
  onChange: (destinationId: number | null) => void;
};

export default function DestinationSearch({
  countryId,
  value,
  onChange,
}: DestinationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery("");
    setResults([]);
    setOpen(false);
  }, [countryId]);

  useEffect(() => {
    if (!countryId) return;

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);

      const data = await searchDestinations(
        countryId,
        query
      );

      setResults(data);
      setLoading(false);
      setOpen(true);

    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

  }, [query, countryId]);