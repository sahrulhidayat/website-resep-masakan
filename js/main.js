function setVideoSize() {
  const vidWidth = 1920;
  const vidHeight = 1080;
  let windowWidth = window.innerWidth;
  let newVidWidth = windowWidth;
  let newVidHeight = (windowWidth * vidHeight) / vidWidth;
  let marginLeft = 0;
  let marginTop = 0;

  if (newVidHeight < 500) {
    newVidHeight = 500;
    newVidWidth = (newVidHeight * vidWidth) / vidHeight;
  }

  if (newVidWidth > windowWidth) {
    marginLeft = -((newVidWidth - windowWidth) / 2);
  }

  if (newVidHeight > 720) {
    marginTop = -((newVidHeight - $("#tm-video-container").height()) / 2);
  }

  const tmVideo = $("#tm-video");

  tmVideo.css("width", newVidWidth);
  tmVideo.css("height", newVidHeight);
  tmVideo.css("margin-left", marginLeft);
  tmVideo.css("margin-top", marginTop);
}

$(document).ready(function () {
  /************** Video background *********/

  setVideoSize();

  // Set video background size based on window size
  let timeout;
  window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(setVideoSize, 100);
  };
});

/************** List video *********/
fetch("res/res.json")
  .then((response) => response.json())
  .then((data) => {
    const itemList = document.getElementById("item-list");

    data.forEach((item) => {
      const listItem = document.createElement("div");
      const queryString = new URLSearchParams({ id: item.id }).toString();

      listItem.classList.add(
        "col-lg-4",
        "col-md-6",
        "col-sm-12",
        "tm-catalog-item"
      );
      listItem.innerHTML = `
        <div class="position-relative tm-thumbnail-container">
            <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="Thumbnail Video" class="img-fluid tm-catalog-item-img">    
            <a href="video-page.html?${queryString}" class="position-absolute tm-img-overlay">
                <i class="fas fa-play tm-overlay-icon"></i>
            </a>
        </div>    
        <div class="p-4 tm-bg-gray tm-catalog-item-description">
            <h3 class="tm-text-primary mb-3 tm-catalog-item-title">${item.title}</h3>
            <p class="tm-catalog-item-text">${item.description}</p>
        </div>
      `;

      itemList.appendChild(listItem);

      const videoInfo = {
        title: item.title,
        description: item.description,
        link: item.link,
      };

      sessionStorage.setItem("videoInfo", JSON.stringify(videoInfo));
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
