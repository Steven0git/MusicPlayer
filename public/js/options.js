class Options extends MusicPlayer {
  constructor() {
    // Call the constructor of the parent class using super()
    super();

    // Get the "volume" element and store it as a property of the class
    this.volume = this.getElement("volume");

    // Get the "audio" element and store it as a property of the class
    this.audio = this.getElement('audio');
  }
  
  // Method to set up the option start behavior
  OptionStart() {
    // Attach an event listener to the "volume" element
    // When the "change" event occurs, the arrow function is executed
    this.Listener(this.volume, "change", (e) => {
      // Inside the arrow function, "this" refers to the class instance
      // Set the audio volume based on the value of the "volume" element
      this.audio.volume = e.target.value / 1000;
    });
  }
  
  // Method to attach an event listener to an element
  Listener(elm, type, cb) {
    // Add the event listener to the provided element
    elm.addEventListener(type, cb);
  }
}

// Create an instance of the Options class
const Opt = new Options();

// Call the OptionStart method to set up the behavior
Opt.OptionStart();