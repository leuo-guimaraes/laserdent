// Configuração centralizada do Supabase para a clínica LASERdent
// Utiliza o mesmo projeto Supabase do sistema interno

const supabaseUrl = 'https://argtdhuzibzopbabqldb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZ3RkaHV6aWJ6b3BiYWJxbGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjEyNjgsImV4cCI6MjA5MzU5NzI2OH0.GGYouMZdKlWXNWkwk63EE3a4fYcCeHvtz6Y9mZfPrS8';

let supabaseClient = null;

if (typeof supabase !== 'undefined' && supabaseUrl && supabaseKey) {
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
} else {
    console.warn("Supabase SDK não carregado ou credenciais do Supabase ausentes no arquivo 'supabase-config.js'.");
}
