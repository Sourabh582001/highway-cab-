export default function BookCarPage({ params }: { params: { carId: string } }) {
  const { carId } = params;
  return (
    <main className="min-h-screen bg-white dark:bg-navy-blue">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-navy-blue dark:text-white">Booking Confirmation</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          You selected car: <span className="font-semibold">{carId}</span>.
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          This is a placeholder page. We can integrate payment and trip details here.
        </p>
        <a href="/" className="inline-block mt-6 bg-golden-yellow text-black px-6 py-3 rounded-md font-semibold">Go Home</a>
      </div>
    </main>
  );
}