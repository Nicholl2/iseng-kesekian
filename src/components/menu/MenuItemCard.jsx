export default function MenuItemCard({ item, hideAction = false, onPesan = null }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Gambar di atas */}
      {item.imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.nama}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Konten teks */}
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          Makanan
        </span>

        <h3 className="font-semibold text-lg mb-1">{item.nama}</h3>
        <p className="text-gray-600 text-sm mb-3">Rp {item.harga.toLocaleString()}</p>

        {/* tampilkan include kalau ada */}
        {item.includes && (
          <ul className="text-xs text-gray-500 list-none pl-0 mb-4 space-y-1">
            {item.includes.map((i, idx) => (
              <li key={idx} className="flex justify-between items-start">
                <span className="text-left">• {i.nama || i}</span>
                {i.harga && (
                  <span className="text-right ml-2 flex-shrink-0">Rp {typeof i.harga === 'number' ? i.harga.toLocaleString() : i.harga}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        {!hideAction && (
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm py-2 rounded-lg transition">
            Tambah
          </button>
        )}

        {/* If page provides an onPesan handler, render a blue Pesan CTA inside the card */}
        {onPesan && (
          <div className="mt-3">
            <button
              onClick={onPesan}
              aria-label={`Pesan ${item.nama}`}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              Pesan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
