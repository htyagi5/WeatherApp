import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [jagah, setJagah] = useState("india");
  const [temp, setTemp] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [locltime, setLocltime] = useState("");
  const [update, setUpdate] = useState("");
  const [humid, setHumid] = useState("");
  const [feel, setFeel] = useState("");
  const [wind, setWind] = useState("");
  const [imag, setImag] = useState("");
  const [text, setText] = useState("");
 const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${jagah}&aqi=yes`)
      .then(response => response.json())
      .then((e) => {
        setTemp(e.current.temp_c);
        setCountry(e.location.country);
        setRegion(e.location.region);
        setLocltime(e.location.localtime);
        setUpdate(e.current.last_updated);
        setHumid(e.current.humidity);
        setWind(e.current.wind_kph);
        setFeel(e.current.feelslike_c);
        setImag(e.current.condition.icon);
        setText(e.current.condition.text);
      });
  }, [jagah]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  const fields = [
    { label: "🌡️ Temperature", value: `${temp}°C` },
    { label: "🤍 Feels Like", value: `${feel}°C` },
    { label: "💧 Humidity", value: `${humid}%` },
    { label: "💨 Wind", value: `${wind} kph` },
    { label: "🕒 Local Time", value: locltime },
    { label: "📍 Location", value: `${region}, ${country}` },
    { label: "📝 Condition", value: text },
    { label: "⏱️ Last Updated", value: update },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#dfe9f3] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-700 mb-2">.....Weather Dashboard....</h1>
          <img src={`https:${imag}`} alt="weather icon" className="mx-auto w-24 h-24 rounded-full shadow-lg" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map((field, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 text-gray-800 hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-lg font-semibold mb-2">{field.label}</h2>
              <p className="text-2xl font-bold">{field.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter location..."
            onChange={(e) => setJagah(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <button
            onClick={() => setJagah(jagah)}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;