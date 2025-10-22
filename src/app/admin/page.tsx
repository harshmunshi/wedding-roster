import { db } from "@/db";
import { roster as rosterSchema } from "@/db/schema";
import { asc } from "drizzle-orm";

async function getRoster() {
  try {
    const allRoster = await db.query.roster.findMany({
      orderBy: [asc(rosterSchema.arrivalDateTime)],
    });
    return allRoster;
  } catch (error) {
    console.error("Failed to fetch roster:", error);
    // You might want to return a specific error object or re-throw
    // to be caught by a higher-level error boundary.
    // For now, returning null to indicate failure.
    return null;
  }
}

interface Roster {
  id: number;
  name: string;
  arrivalDateTime: Date;
  departureDateTime: Date;
  arrivalCity: string;
  createdAt: Date;
}

export default async function AdminPage() {
  const roster: Roster[] | null = await getRoster();

  // Handle case where the database query fails
  if (roster === null) {
    return (
      <div className="min-h-screen bg-amber-50 p-4">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-8 font-tiro text-5xl font-bold text-rose-900">
            Admin Roster
          </h1>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 font-poppins text-2xl font-bold text-red-600">
              Error
            </h2>
            <p className="text-gray-600">
              Could not fetch roster data. Please check the server logs for more
              information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center font-tiro text-5xl font-bold text-rose-900">
          Admin Roster
        </h1>
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
          {roster.length === 0 ? (
            <div className="p-8 text-center">
              <h2 className="font-poppins text-xl font-semibold text-gray-700">
                No Roster Entries Found
              </h2>
              <p className="mt-2 text-gray-500">
                The database is currently empty. Once guests submit their
                information, it will appear here.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-poppins text-xs font-medium uppercase tracking-wider text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-poppins text-xs font-medium uppercase tracking-wider text-white"
                  >
                    Arrival Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-poppins text-xs font-medium uppercase tracking-wider text-white"
                  >
                    Departure Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-poppins text-xs font-medium uppercase tracking-wider text-white"
                  >
                    Arrival Location (City)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {roster.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.arrivalDateTime.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.departureDateTime.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.arrivalCity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
