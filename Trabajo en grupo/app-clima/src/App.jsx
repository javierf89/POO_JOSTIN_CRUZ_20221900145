import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

// URL base de la API del clima, se usa Vite para obtener la clave de la API del entorno
const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  // Estado para la ciudad ingresada por el usuario
  const [city, setCity] = useState("");
  // Estado para manejar errores
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  // Estado para manejar la carga
  const [loading, setLoading] = useState(false);
  // Estado para los datos del clima
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe por defecto
    setError({ error: false, message: "" }); // Reinicia el estado de error
    setLoading(true); // Activa el estado de carga

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" }; // Lanza un error si el campo ciudad está vacío

      const res = await fetch(API_WEATHER + city); // Realiza una solicitud a la API del clima con la ciudad proporcionada
      const data = await res.json(); // Convierte la respuesta en formato JSON

      if (data.error) { // Si la respuesta contiene un error, lanza una excepción
        throw { message: data.error.message };
      }

      setWeather({ // Actualiza el estado con los datos del clima
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      setError({ error: true, message: error.message }); // Actualiza el estado de error si ocurre un error
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        App del Clima
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {weather.city && ( // Si se han recibido datos de clima, muestra la información
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
          >
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="h3"
          >
            {weather.temperature} °C
          </Typography>
          <Typography
            variant="h6"
            component="h4"
          >
            {weather.conditionText}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
