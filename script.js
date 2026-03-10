// Image modal functionality
function createImageModal() {
  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'imageModal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0,0.9);
    backdrop-filter: blur(5px);
  `;
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;
    max-width: 800px;
    height: auto;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  
  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
  `;
  closeBtn.onclick = closeModal;
  
  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.style.cssText = `
    text-align: center;
    margin-top: 20px;
  `;
  
  // Create caption element
  const caption = document.createElement('div');
  caption.id = 'imageCaption';
  caption.style.cssText = `
    text-align: center;
    margin-top: 15px;
    font-size: 16px;
    color: #333;
    font-style: italic;
    min-height: 40px;
  `;
  
  // Create resizable image
  const modalImage = document.createElement('img');
  modalImage.id = 'modalImage';
  modalImage.style.cssText = `
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    transition: transform 0.3s ease;
    image-rendering: crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    object-fit: contain;
    background: #f8f9fa;
  `;
  
  // Create resize controls
  const resizeControls = document.createElement('div');
  resizeControls.innerHTML = `
    <div style="margin-top: 20px; text-align: center;">
      <label>Size: <span id="sizeDisplay">100%</span></label><br><br>
      <input type="range" id="imageSlider" min="10" max="200" value="100" style="width: 80%; margin: 10px 0;">
      <div style="margin-top: 10px;">
        <button onclick="resizeImage(50)" style="margin: 0 5px; padding: 5px 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">50%</button>
        <button onclick="resizeImage(75)" style="margin: 0 5px; padding: 5px 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">75%</button>
        <button onclick="resizeImage(100)" style="margin: 0 5px; padding: 5px 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">100%</button>
        <button onclick="resizeImage(150)" style="margin: 0 5px; padding: 5px 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">150%</button>
        <button onclick="resizeImage(200)" style="margin: 0 5px; padding: 5px 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">200%</button>
      </div>
    </div>
  `;
  
  // Assemble modal
  imageContainer.appendChild(modalImage);
  imageContainer.appendChild(caption);
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(imageContainer);
  modalContent.appendChild(resizeControls);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Add event listener for slider
  const slider = document.getElementById('imageSlider');
  slider.addEventListener('input', function() {
    resizeImage(this.value);
  });
}

function openModal(imageSrc, imageCaption = '') {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const sizeDisplay = document.getElementById('sizeDisplay');
  const slider = document.getElementById('imageSlider');
  const caption = document.getElementById('imageCaption');
  
  modalImg.src = imageSrc;
  modal.style.display = 'block';
  sizeDisplay.textContent = '100%';
  slider.value = '100';
  
  // Set caption if provided
  if (imageCaption) {
    caption.textContent = imageCaption;
    caption.style.display = 'block';
  } else {
    caption.style.display = 'none';
  }
  
  // Add keyboard event listener
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function resizeImage(scale) {
  const modalImg = document.getElementById('modalImage');
  const sizeDisplay = document.getElementById('sizeDisplay');
  const slider = document.getElementById('imageSlider');
  
  if (modalImg) {
    modalImg.style.transform = `scale(${scale / 100})`;
    sizeDisplay.textContent = `${scale}%`;
    slider.value = scale;
  }
}

// Add click handlers to all figures and teaser
document.addEventListener('DOMContentLoaded', function() {
  // Create modal on page load
  createImageModal();
  
  // Add click handlers to images
  const images = document.querySelectorAll('.figure, .teaser');
  images.forEach(img => {
    img.addEventListener('click', function() {
      let caption = '';
      
      // Determine caption based on image class or source
      if (img.classList.contains('teaser')) {
        caption = 'SLAP: Slapband-based Autonomous Perching Drone with Failure Recovery for Vertical Tree Trunks';
      } else if (img.src.includes('system_overview')) {
        caption = 'Figure 3: CAD rendering of the SLAP gripper mechanism showing bistable tape springs, microspines, and trigger system';
      } else if (img.src.includes('hardware')) {
        caption = 'Complete SLAP drone system with active gripper, sensing components, and safety features mounted on Uvify IFO-S platform';
      } else if (img.src.includes('results')) {
        caption = 'Flight experiment results showing successful perching (75% success rate) and failure recovery (100% recovery rate) performance metrics';
      }
      
      openModal(this.src, caption);
    });
  });
  
  // Close modal when clicking outside
  document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
      closeModal();
    }
  });
});
