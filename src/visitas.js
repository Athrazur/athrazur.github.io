import { createClient } from 'https://esm.sh/@supabase/supabase-js'
const supabaseUrl = "https://aohfldbsfdmwomakwqof.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvaGZsZGJzZmRtd29tYWt3cW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjgzMTgsImV4cCI6MjA2OTkwNDMxOH0.lmfVw4tlTU8O4Noa6HY3cc6XuDSmOje0bUK8VirgKeg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const currentSiteName = window.location.hostname;

async function getWebsiteId() {
    try {
        // Consulta la tabla 'websites' por el nombre del sitio.
        const { data, error } = await supabase
        .from('websites')
        .select('id') // Solo necesitamos el 'id'
        .eq('direccion', currentSiteName)
        .single(); // Esperamos un único resultado

        if (error) {
            console.error('Error al buscar el website_id:', error);
            return null;
        }

        return data.id; // Retorna el 'id' del sitio web.
    }
    catch (error) {
        console.error('Error critico:', error);
        return null;
    }
}

async function incrementarVisitas(id_website) {
    console.log("id_website:", id_website); // Muestra el ID del sitio web en la consola.
    console.log("tipo dato:", typeof id_website); // Verifica el tipo de dato del ID del sitio web.
    try {
        // Llama a la funcion SQL con el website_id como parametro.
        const { data, error } = await supabase.rpc('increment_visit', {
            website_id_param: id_website // Pasa el ID del sitio web como parámetro.
        });
        
        if (error) {
            throw error;
        }
        console.log('Visitas incrementadas:', data);
    }
    catch(error){
        console.error('Error:', error);
    }
}

// Uso de la función:
getWebsiteId().then(websiteId => {
  if (websiteId) {
    console.log('Website ID:', websiteId);
    // Usa el 'websiteId' para incrementar el contador
    incrementarVisitas(websiteId);
  } else {
    console.error('No se encontró el website_id para:', currentSiteName);
  }
});