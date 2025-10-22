async function getRoster() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/roster`, {
    cache: "no-store",
  });
  return res.json();
}

interface Roster {
  id: number;
  name: string;
  arrivalDateTime: string;
  departureDateTime: string;
  arrivalCity: string;
  createdAt: string;
}

export default async function AdminPage() {
  const roster: Roster[] = await getRoster();

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center font-tiro text-5xl font-bold text-rose-900">
          Admin Roster
        </h1>
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
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
                    {new Date(item.arrivalDateTime).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(item.departureDateTime).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.arrivalCity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
