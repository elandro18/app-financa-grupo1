"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white rounded-md p-4">
      <nav>
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li
                key={item.href}
                className="border-b border-gray-200 last:border-b-0"
              >
                <Link
                  href={item.href}
                  className={`block text-center py-3 text-sm cursor-pointer ${
                    active
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
