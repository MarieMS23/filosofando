export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl">
        <h2 className="text-4xl font-bold text-purple-800 mb-6">Acerca de Filosofando</h2>
        <div className="text-gray-700 text-lg space-y-4">
          <p>
            <strong>Filosofando</strong> es un juego de preguntas y reflexión diseñado para familias, 
            adolescentes, jóvenes, docentes y facilitadores.
          </p>
          <p>
            Explora preguntas sobre ciencia, filosofía e imaginación. Responde, debate y piensa 
            de manera creativa con las cartas especiales que te desafían a cambiar de perspectiva.
          </p>
          <p className="text-sm text-gray-500 mt-6">Versión 1.0 - MVP - Enero 2025</p>
        </div>
        <button
          onClick={onBack}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 rounded-2xl"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
