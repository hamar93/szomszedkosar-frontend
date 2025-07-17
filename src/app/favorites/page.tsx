export default function FavoritesPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kedvenc termékeid</h1>

      <p className="text-gray-600 mb-6">
        Itt találod azokat a termékeket, amelyeket elmentettél későbbre.
      </p>

      <div className="text-sm text-gray-400">
        Nincs még elmentett terméked. Böngéssz a közelben, és nyomd meg a ⭐ ikont a mentéshez!
      </div>
    </main>
  );
}
