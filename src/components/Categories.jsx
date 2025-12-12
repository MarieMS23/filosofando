export default function Categories({ onSelectCategory, onBack }) {
  const categories = [
    { id: 'ciencia', name: 'Ciencia / Conocimiento', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'filosofia', name: 'Filosofía / Vida', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'imaginacion', name: 'Imaginación / Futuro', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'aleatorio', name: 'Aleatorio', color: 'bg-yellow-500 hover:bg-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-purple-800 mb-8">Elige una categoría</h2>
      <div className="space-y-4 w-full max-w-md">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full ${cat.color} text-white text-xl py-5 px-6 rounded-2xl shadow-lg transition`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-8 bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-xl"
      >
        Volver
      </button>
    </div>
  );
}
