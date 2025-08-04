//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const header = document.createElement("div");
  header.id = "episode-count";
  header.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(header);
}

window.onload = setup;
