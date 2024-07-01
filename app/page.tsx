export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="my-4">Battery Site Estimator</h1>
      <div className="flex flex-row my-3 p-3 border">
        <div className="basis-1/2 border">Megapack options</div>
        <div className="basis-1/2">
          <div className="border">Summary</div>
          <div className="border">Layout</div>
        </div>
      </div>
    </main>
  );
}
