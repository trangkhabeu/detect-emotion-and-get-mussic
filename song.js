const clientId = "039237d24f2b45ac8ded79b8eb756408"; // Thay bằng Client ID của bạn
const clientSecret = "a434c82df4d44e79ac1dfd2265026fa4"; // Thay bằng Client Secret của bạn

async function getAccessToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
}

async function searchTracks(token, emotion) {
  const query = emotion + " music";
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await result.json();
  if (data.tracks.items.length > 0) {
    const track = data.tracks.items[0];
    redirectToSpotify(track.uri);
  } else {
    console.error("No tracks found for emotion:", emotion);
  }
}

function redirectToSpotify(trackUri) {
  const trackUrl = `https://open.spotify.com/embed/track/${
    trackUri.split(":")[2]
  }`;
  document.getElementById("spotifyPlayer").src = trackUrl;
}

// Export các hàm để sử dụng trong file script.js
export { getAccessToken, searchTracks };
