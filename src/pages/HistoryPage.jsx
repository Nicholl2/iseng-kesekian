import { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('riwayatPesanan')) || [];
    setRiwayat(data);
  }, []);

  const hapusRiwayat = () => {
    if (confirm('Yakin mau hapus semua riwayat?')) {
      localStorage.removeItem('riwayatPesanan');
      setRiwayat([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-blue-600">📜 Riwayat Pesanan</h1>
        {riwayat.length > 0 && (
          <button
            onClick={hapusRiwayat}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {riwayat.length === 0 ? (
        <p className="text-slate-500">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="space-y-4">
          {riwayat.map((r, idx) => (
            <div key={idx} className="border p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-slate-500 mb-2">{r.waktu}</p>
              <ul className="mb-2 list-disc list-inside text-slate-700">
                {r.pesanan.map((p, i) => (
                  <li key={i}>
                    {p.nama} x{p.qty} — Rp {(p.harga * p.qty).toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Total: Rp {r.total.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
