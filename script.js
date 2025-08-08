//You can edit ALL of the code here
let allEpisodes = []
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const header = document.createElement("div");
  header.id = "episode-count";
  header.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(header);

  const episodeListElem = document.createElement("div");
  episodeListElem.id = "episode-list";
  rootElem.appendChild(episodeListElem);

  const template = document.getElementById("episode-template");

  episodeList.forEach((episode) => {
    const episodeCard = template.content.cloneNode(true);

    episodeCard.querySelector(".episode-title").textContent = episode.name;
    episodeCard.querySelector(".episode-code").textContent = `S${String(
      episode.season
    ).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;
    episodeCard.querySelector(".episode-summary").innerHTML = episode.summary;
    episodeCard.querySelector(".episode-img").src = episode.image.medium;
    episodeListElem.appendChild(episodeCard);
  });
}

function render(){
  const filteredEpisodes = allEpisodes.filter(function (episode){
    return episode.name.toLowerCase().includes(input.value.toLowerCase());
  })
  makePageForEpisodes(filteredEpisodes);
}

const input = document.querySelector("input")
   input.addEventListener("keyup", function(){
    render()
  })

window.onload = setup;
