const API_URL ="http://localhost:8080/api/check-logs"

export async function getRecentLogs(){
    const resp:Response = await fetch(`${API_URL}/recent`);
    if(!resp.ok){
        throw new Error("Failed to fetch recent logs");
    }
    return resp.json();
}