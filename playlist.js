document.addEventListener("DOMContentLoaded", function() {
  const videoTitles = document.querySelectorAll("#video-titles li");
  const videoPlayerContainer = document.querySelector(".video-player");
  let videoPlayer = document.getElementById("video-player");

  function createVideoPlayer(url, type) {
    let newPlayer;
    if (type === "mp4") {
      newPlayer = document.createElement("video");
      newPlayer.setAttribute("controls", "controls");
      newPlayer.innerHTML = `<source src="${url}" type="video/mp4">Your browser does not support the video tag.`;
    } else {
      newPlayer = document.createElement("iframe");
      newPlayer.setAttribute("src", url);
      newPlayer.setAttribute("frameborder", "0");
      newPlayer.setAttribute("allowfullscreen", "true");
    }
    newPlayer.id = "video-player";
    return newPlayer;
  }

  function setPlayerHeight() {
    const videoWidth = videoPlayerContainer.offsetWidth;
    videoPlayerContainer.style.height = (videoWidth * 9 / 16) + 'px'; // Maintain 16:9 aspect ratio
  }

  videoTitles.forEach(title => {
    title.addEventListener("click", function() {
      videoTitles.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
      const videoUrl = this.getAttribute("data-video-url");
      const videoType = this.getAttribute("data-type");
      const newPlayer = createVideoPlayer(videoUrl, videoType);

      videoPlayerContainer.innerHTML = '';
      videoPlayerContainer.appendChild(newPlayer);
      videoPlayer = newPlayer;
      if (videoType === "mp4") {
        videoPlayer.play();
      }
      setPlayerHeight();
    });

    // Add touch support
    title.addEventListener("touchstart", function() {
      this.click();
    });
  });

  // Set initial player height
  setPlayerHeight();

  // Adjust player height on window resize
  window.addEventListener('resize', setPlayerHeight);
});
