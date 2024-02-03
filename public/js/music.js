class MusicPlayer {
  constructor() {
    // Initialize elements and data storage
    this.fileInput = this.getElement("files");
    this.audioContainer = this.getElement("codeAudio");
    this.linkList = this.getElement("list");
    this.fileNames = [];
    this.fileData = {}; // Store file data using unique IDs
  }

  getElement(id) {
    // Helper function to get elements by ID
    return document.getElementById(id);
  }

  start() {
    // Start listening for file selection
    this.setupFileSelectionListener();
  }

  setupFileSelectionListener() {
    // Listen for file selection changes
    this.fileInput.addEventListener("change", (event) => {
      const selectedFiles = event.target.files;
      this.handleSelectedFiles(selectedFiles);
    });
  }

  handleSelectedFiles(selectedFiles) {
    // Process selected files
    for (const file of selectedFiles) {
      if (!this.fileNames.includes(file.name)) {
        this.fileNames.push(file.name);
        this.createLinkElement(file);
      }
    }
  }

  createLinkElement(file) {
    // Create a link element for each file
    const link = document.createElement("a");
    const uniqueId = this.generateUniqueId(file.name.length, Date.now());

    link.setAttribute("class", "collection-item");
    link.setAttribute("href", "#main");
    link.setAttribute("data-id", uniqueId);
    link.addEventListener("click", () => this.playAudio(link)); // Use event listener
    link.innerText = this.cleanChunks(file.name);

    this.fileData[uniqueId] = file; // Store file data using unique ID
    this.linkList.appendChild(link);
  }

  generateUniqueId(keyLength, date) {
    // Generate a unique ID
    const randomPart = Math.floor(Math.random() * 10000);
    const uniqueId = `s${randomPart}a${keyLength}b${date}d`;
    return uniqueId;
  }

  playAudio(linkElement) {
    // Play the audio associated with the clicked link
    const fileId = linkElement.getAttribute("data-id");
    const audioBlob = this.fileData[fileId];
    const audioSource = URL.createObjectURL(audioBlob);

    this.createAudioElement(audioSource, audioBlob.name);
  }
  cleanChunks(text){
    return text.replace(/_/g," ").slice(0,-4);
  }

  createAudioElement(src, name) {
    // Create and display the audio element
    this.audioContainer.innerHTML = ""; // Clear existing audio elements
    const audioElement = document.createElement("audio");

    audioElement.setAttribute("controls", "true");
    audioElement.setAttribute("id", "audio");
    audioElement.setAttribute("src", src);
    this.audioContainer.appendChild(audioElement);
    audioElement.addEventListener("play", (e) => {
      
      M.toast({html: this.cleanChunks(name)});
      this.VolumeChange(audioElement);
    });
  }

  VolumeChange(audioElement) {
    const volumeRange = this.getElement("volume");
    volumeRange.addEventListener("change", (vol) => {
      audioElement.playbackRate = vol.target.value;
    });
  }
}

// Create an instance of the MusicPlayer class and start it
const player = new MusicPlayer();
player.start();