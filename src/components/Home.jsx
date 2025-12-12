export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-bold text-purple-800 mb-12">Filosofando</h1>
      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => onNavigate('solo')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-2xl py-6 px-8 rounded-2xl shadow-lg transition"
        >
          Modo Solitario
        </button>
        <button
          onClick={() => onNavigate('competitive')}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-2xl py-6 px-8 rounded-2xl shadow-lg transition"
        >
          Modo Multijugador
        </button>
        <button
          onClick={() => onNavigate('travel')}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-2xl py-6 px-8 rounded-2xl shadow-lg transition"
        >
          Modo Viaje
        </button>
        <button
          onClick={() => onNavigate('about')}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white text-2xl py-6 px-8 rounded-2xl shadow-lg transition"
        >
          Acerca de
        </button>
      </div>
    </div>
  );
}
