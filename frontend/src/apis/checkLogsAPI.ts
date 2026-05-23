
export async function getRecentLogs(){
    const resp:Response = await fetch("/api/check-logs/recent");
    if(!resp.ok){
        throw new Error("Failed to fetch recent logs");
    }
    return resp.json();
}