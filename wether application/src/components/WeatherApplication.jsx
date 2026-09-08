import { useCallback, useEffect, useMemo, useState } from "react";
import { TimeTodo } from "./DateTime.jsx";

const API_KEY = "43809f87aa336f958304e710c0957549";
const DEFAULT_LOCATION = {
  lat: 26.9124,
  lon: 75.7873,
};

const featureCards = [
  {
    title: "Fast City Search",
    text: "Jump between cities quickly with a clean input flow tuned for touch devices.",
    icon: "search",
  },
  {
    title: "Readable Forecasts",
    text: "Temperature, pressure, wind, and humidity stay visible without crowding the screen.",
    icon: "layers",
  },
  {
    title: "Mobile First Rhythm",
    text: "Rounded panels, large tap targets, and compact spacing keep the interface calm on phones.",
    icon: "mobile",
  },
];

const reviewCards = [
  {
    quote: "Feels more like a polished app preview than a basic weather widget.",
    author: "Riya, Jaipur",
  },
  {
    quote: "The city briefing layout makes the important forecast details easy to scan.",
    author: "Aman, Delhi",
  },
];

function getWeatherUrl(city) {
  if (city) {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city,
    )}&appid=${API_KEY}&units=metric`;
  }

  return `https://api.openweathermap.org/data/2.5/forecast?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}&appid=${API_KEY}&units=metric`;
}

function normalizeWeather(data) {
  const first = data.list?.[0];

  if (!first) {
    throw new Error("Weather data was not available for that city.");
  }

  const dayKey = new Date(first.dt * 1000).toDateString();
  const dayItems = data.list.filter(
    (item) => new Date(item.dt * 1000).toDateString() === dayKey,
  );

  const min = Math.min(...dayItems.map((item) => item.main.temp_min));
  const max = Math.max(...dayItems.map((item) => item.main.temp_max));
  const description = first.weather?.[0]?.description ?? "Clear conditions";
  const iconCode = first.weather?.[0]?.icon;

  return {
    city: data.city?.name ?? "Unknown city",
    timestamp: first.dt,
    description,
    iconCode,
    iconUrl: iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : "",
    temperature: Math.round(first.main.temp),
    feelsLike: Math.round(first.main.feels_like),
    min: Math.round(min),
    max: Math.round(max),
    humidity: first.main.humidity,
    windSpeed: first.wind.speed,
    pressure: first.main.pressure,
  };
}

function FeatureIcon({ icon }) {
  if (icon === "layers") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="m5 12 7 4 7-4" />
        <path d="m5 16 7 4 7-4" />
      </svg>
    );
  }

  if (icon === "mobile") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10 5.5h4" />
        <path d="M11.25 18.5h1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export default function WeatherApplication() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");

  function formatTemperature(value) {
    if (unit === "F") {
      return `${Math.round((value * 9) / 5 + 32)} F`;
    }

    return `${value} C`;
  }

  const weatherCards = useMemo(() => {
    if (!weather) {
      return [];
    }

    return [
      {
        label: "Feels Like",
        value: formatTemperature(weather.feelsLike),
        marker: "FL",
        detail: "Comfort level outside",
      },
      {
        label: "Humidity",
        value: `${weather.humidity}%`,
        marker: "HU",
        detail: "Moisture in the air",
      },
      {
        label: "Wind Speed",
        value: `${weather.windSpeed} m/s`,
        marker: "WS",
        detail: "Surface wind right now",
      },
      {
        label: "Pressure",
        value: `${weather.pressure} hPa`,
        marker: "PR",
        detail: "Atmospheric balance",
      },
    ];
  }, [weather, unit]);

  const atmosphereLabel = useMemo(() => {
    if (!weather) {
      return "";
    }

    if (weather.temperature >= 32) {
      return "Bright heat moving through the city.";
    }

    if (weather.temperature >= 24) {
      return "Warm air with an easy daytime feel.";
    }

    if (weather.temperature >= 16) {
      return "Balanced weather with steady conditions.";
    }

    if (weather.temperature >= 8) {
      return "Cool layers recommended for the day.";
    }

    return "Cold air settling in across the city.";
  }, [weather]);

  const loadWeather = useCallback(async (city = "") => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(getWeatherUrl(city));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather data.");
      }

      setWeather(normalizeWeather(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const city = query.trim();

    if (!city) {
      return;
    }

    loadWeather(city);
    setQuery("");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadWeather();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadWeather]);

  return (
    <main className="weather-page">
      <section className="weather-shell" aria-label="Weather application">
        <div className="weather-grid">
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">Atmosphere Console</p>
              <h1>Weather, reframed like a warm mobile app launch.</h1>
              <p className="hero-text">
                Search any city and get a friendlier forecast with editorial
                typography, live weather signals, and a phone-shaped preview.
              </p>
            </div>

            <form className="search-form" onSubmit={handleSubmit}>
              <label className="search-field">
                <span className="search-mark">City Search</span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try Jaipur, London, Tokyo..."
                  aria-label="City name"
                  inputMode="search"
                  enterKeyHint="search"
                  autoComplete="off"
                />
              </label>
              <button type="submit">Get Forecast</button>
            </form>

            <div className="hero-meta">
              <article>
                <span>Community Rating</span>
                <strong>4.8 / 5</strong>
                <small>Clean forecast snapshots and mobile-ready reading.</small>
              </article>
              <article>
                <span>Live Clock</span>
                <TimeTodo />
              </article>
            </div>
          </section>

          <section className="forecast-stage">
            {error ? <p className="status error">{error}</p> : null}
            {loading ? <p className="status">Loading weather...</p> : null}

            {weather ? (
              <>
                <div className="forecast-panel">
                  <div className="forecast-copy">
                    <div className="forecast-head">
                      <div>
                        <p className="forecast-label">Current Forecast</p>
                        <h2>{weather.city}</h2>
                      </div>
                      <button
                        type="button"
                        className="unit-toggle"
                        onClick={() =>
                          setUnit((currentUnit) => (currentUnit === "C" ? "F" : "C"))
                        }
                        aria-label={`Switch temperature unit to ${
                          unit === "C" ? "Fahrenheit" : "Celsius"
                        }`}
                      >
                        {unit === "C" ? "Celsius | Fahrenheit" : "Fahrenheit | Celsius"}
                      </button>
                    </div>

                    <p className="forecast-text">{weather.description}</p>
                    <p className="atmosphere-note">{atmosphereLabel}</p>
                    <p className="temperature">{formatTemperature(weather.temperature)}</p>

                    <div className="minmax">
                      <span>Low {formatTemperature(weather.min)}</span>
                      <span>High {formatTemperature(weather.max)}</span>
                    </div>

                    <div className="summary-strip">
                      <article>
                        <span>Updated</span>
                        <strong>
                          {new Date(weather.timestamp * 1000).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </strong>
                      </article>
                      <article>
                        <span>Conditions</span>
                        <strong>{weather.description}</strong>
                      </article>
                    </div>
                  </div>

                  <div className="forecast-visual">
                    <div className="device-frame">
                      <div className="device-notch" aria-hidden="true" />
                      <div className="device-screen">
                        <p className="device-city">{weather.city}</p>
                        <div className="weather-icon">
                          {weather.iconCode?.startsWith("01") ? (
                            <span
                              className={
                                weather.iconCode.endsWith("n")
                                  ? "weather-symbol moon"
                                  : "weather-symbol sun"
                              }
                              aria-label={weather.description}
                            />
                          ) : weather.iconUrl ? (
                            <img src={weather.iconUrl} alt={weather.description} />
                          ) : (
                            <span>WX</span>
                          )}
                        </div>
                        <strong className="device-temp">
                          {formatTemperature(weather.temperature)}
                        </strong>
                        <p className="device-note">{weather.description}</p>
                      </div>
                    </div>
                    <p className="visual-caption">Three-hour forecast snapshot</p>
                  </div>
                </div>

                <div className="weather-info">
                  {weatherCards.map((card) => (
                    <article className="weather-card" key={card.label}>
                      <span className="card-marker">{card.marker}</span>
                      <p>{card.label}</p>
                      <strong>{card.value}</strong>
                      <small>{card.detail}</small>
                    </article>
                  ))}
                </div>

                <div className="feature-section" aria-label="App features">
                  {featureCards.map((card) => (
                    <article className="feature-card" key={card.title}>
                      <span className="feature-icon">
                        <FeatureIcon icon={card.icon} />
                      </span>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>

                <div className="review-strip" aria-label="Community feedback">
                  {reviewCards.map((review) => (
                    <article className="review-card" key={review.author}>
                      <span className="review-rating">4.8 stars</span>
                      <p>"{review.quote}"</p>
                      <strong>{review.author}</strong>
                    </article>
                  ))}
                </div>

                <div className="cta-banner">
                  <div>
                    <span className="cta-kicker">Live Forecast</span>
                    <h3>Built like a weather app showcase, focused entirely on live city conditions.</h3>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}
