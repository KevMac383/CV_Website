function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

function adjustProjectElements() {
    const projectImages = document.querySelectorAll('.project-img');
    const projectCardContainers = document.querySelectorAll('.project-card-container');
    const detailsContainers = document.querySelectorAll('.details-container.project-container'); // Adjust selector if needed
  
    if (window.innerWidth < 700) {
      // Adjust project-img width
      projectImages.forEach(img => {
        img.style.width = '0%';
      });
  
      // Adjust project-card-container width
      projectCardContainers.forEach((cardContainer, index) => {
        if (detailsContainers[index]) {
          cardContainer.style.width = '100%';
          cardContainer.style.maxWidth = '100%';
        }
      });
    } else {
      // Reset project-img width
      projectImages.forEach(img => {
        img.style.width = '';
      });
  
      // Reset project-card-container width
      projectCardContainers.forEach(cardContainer => {
        cardContainer.style.width = '';
        cardContainer.style.maxWidth = '';
      });
    }
  }
  
  // Call the function on initial load
  adjustProjectElements();
  
  // Call the function whenever the window is resized
  window.addEventListener('resize', adjustProjectElements);