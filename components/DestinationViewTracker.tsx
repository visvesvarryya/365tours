"use client";

import { useEffect } from "react";
import { gtagEvent } from "@/lib/analytics";

/**
 * Fires a `view_item` event carrying the same `item_id` used in the dynamic
 * remarketing feed (see app/api/feeds/dynamic-remarketing), so Google Ads can
 * later personalize a remarketing ad with the exact destination this visitor
 * looked at — and link it straight back to this page, not the homepage.
 */
export default function DestinationViewTracker({
  id,
  name,
  category,
}: {
  id: string;
  name: string;
  category: string;
}) {
  useEffect(() => {
    gtagEvent("view_item", {
      items: [{ item_id: id, item_name: name, item_category: category }],
    });
  }, [id, name, category]);

  return null;
}
