export default async function handler(req, res) {
  const { messages = [] } = req.body || {};
  const last = messages[messages.length - 1]?.content?.toLowerCase() || '';

  let answer = "Soy un demo corriendo en EasyPanel ✅. En el próximo paso conectamos PostgreSQL y pagos.";
  if (last.includes('precio') || last.includes('stock')) {
    answer = "Por ahora no tengo base de datos conectada. Después agregamos PostgreSQL y te muestro precios/stock reales.";
  } else if (last.includes('hola') || last.includes('buenas')) {
    answer = "¡Hola! ¿Buscás un producto? Podés preguntar por precio o stock.";
  }

  res.status(200).json({ answer });
}
