// src/api/client.ts

const API_BASE_URL = 'https://development-internship-api.geopostenergy.com/WorldCup';

// Certifique-se de que este é o seu usuário exato do GitHub/GitLab
const GIT_USER = 'RamonSantos'; 

export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    'git-user': GIT_USER,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      // Se der erro (400, 500), tenta ler a mensagem do servidor
      const errorText = await response.text();
      throw new Error(`Erro na API: ${response.status} - ${errorText || response.statusText}`);
    }

    // Lê a resposta bruta como texto primeiro
    const text = await response.text();

    // Se a resposta estiver vazia (ex: status 204), retorna um objeto vazio
    if (!text) {
      return {} as T;
    }

    // Tenta fazer o parse para JSON. Se a API retornou texto simples 
    // (como "O resultado..."), o catch captura o erro e retorna o texto puro.
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      // Retorna o texto bruto (ex: mensagem de sucesso) sem quebrar o React
      return text as unknown as T;
    }

  } catch (error) {
    console.error(`Falha na requisição para ${endpoint}:`, error);
    throw error;
  }
};