const API_BASE_URL = "https://api.homologation.cliqdrive.com.br";

// Função de login
const login = async (email: string, password: string) => {
    // Passa URL e as configurações da requisição para o fetch
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    // Verifica se houve erro
    if (!response.ok) {
        const errorData = await response.json(); // Pega o erro
        throw errorData; // "Lança" erro
    }

    return response.json(); // Retorna o json
};

// Função para buscar o perfil
const getProfile = async (acessToken: string) => {
    // Passa URL e as configurações da requisição para o fetch
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acessToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json(); // Pega o erro
        throw errorData; // "Lança" erro
    }

    return response.json(); // Retorna o json
};

// Função para salvar tokens
const saveTokens = (tokens: { access: string; refresh: string }) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
};

// Função para pegar tokens
const getTokens = () => ({
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
});

// Função para remover tokens
const removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export { login, getProfile, saveTokens, getTokens, removeTokens };