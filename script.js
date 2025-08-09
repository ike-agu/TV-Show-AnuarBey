//You can edit ALL of the code here
let allEpisodes = []; // store all episodes globally so that other functions can access it.
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

  //create div to hold all episode cards
  const episodeListElem = document.createElement("div");
  episodeListElem.id = "episode-list";
  rootElem.appendChild(episodeListElem);

  //clone and fill episode details from template
  const template = document.getElementById("episode-template");

  episodeList.forEach((episode) => {
    const episodeCard = template.content.cloneNode(true);

    const codeAndSeason = `S${String(episode.season).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;

    episodeCard.querySelector(".episode-card").id = codeAndSeason;
    episodeCard.querySelector(".episode-title").textContent = episode.name;
    episodeCard.querySelector(".episode-code").textContent = codeAndSeason;
    episodeCard.querySelector(".episode-summary").innerHTML = episode.summary;
    episodeCard.querySelector(".episode-img").src = episode.image.medium;
    episodeListElem.appendChild(episodeCard);
  });

  //query the selector select
  const selectEpisodeList = document.querySelector("select");
  selectEpisodeList.innerHTML = "";

  // default first option on select drop-down list
  const defaultOption = document.createElement("option");
  defaultOption.value = "allEpisodes"; //
  defaultOption.text = "--- Show all episodes ---";
  selectEpisodeList.appendChild(defaultOption);

  //Create episode option and set its value
  for (let i = 0; i < allEpisodes.length; i++) {
    const episodeCodeAndSeason = `S${String(allEpisodes[i].season).padStart(2,"0")}E${String(allEpisodes[i].number).padStart(2, "0")}`;
    const option = document.createElement("option");
    option.setAttribute("value", episodeCodeAndSeason);
    option.text = `${episodeCodeAndSeason} - ${allEpisodes[i].name}`;
    selectEpisodeList.appendChild(option);
  }
  
  //this handles episode selection
  selectEpisodeList.addEventListener("change", function () {
    const allEpisodeCode = this.value;
    const cards = document.querySelectorAll(".episode-card");

    //This is to remove any existing highlight from the card
    cards.forEach((card) => card.classList.remove("selected-episode"));

    if (allEpisodeCode === "allEpisodes") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls the page smoothly to the top
    } else {
      const card = document.getElementById(allEpisodeCode);
      if (card) {
        card.scrollIntoView({ behavior: "smooth" });
        card.classList.add("selected-episode");
      }
    }
  });
}

//filters episodes based on user search and re-render the page.
function render() {
  const filteredEpisodes = allEpisodes.filter(function (episode) {
    return episode.name.toLowerCase().includes(input.value.toLowerCase());
  });
  makePageForEpisodes(filteredEpisodes);
}

//Get input field and listen to user type
const input = document.querySelector("input");
input.addEventListener("keyup", function () {
  render();
});

window.onload = setup;
