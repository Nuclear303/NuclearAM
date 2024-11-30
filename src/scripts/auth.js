var token;
fetch(`https://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=${import.meta.env.VITE_API_KEY}&format=json`)
.then(response=>{
    return response.json();
})
.then(json=>{
    token = json.token;
});

