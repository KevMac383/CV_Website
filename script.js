// If hero image fails to load, remove the frame and make the grid solo
function handleHeroImgError(){
  var frame = document.getElementById('heroFrame');
  var grid = document.getElementById('heroGrid');
  if(frame){ frame.remove(); }
  if(grid){ grid.classList.add('hero-grid--solo'); }
}

(function(){
  var img = document.getElementById('heroImg');
  if(img){
    img.addEventListener('error', handleHeroImgError);
    img.src = img.getAttribute('data-src');
  }
})();

function toggleMenu(){
  document.getElementById('mobileNav').classList.toggle('open');
}

// Boot-sequence line in hero, respects reduced motion
(function(){
  var el = document.getElementById('bootLine');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var full = 'session --init  →  identity verified: kevin.mccarthy';
  if(prefersReduced){
    el.textContent = full;
    return;
  }
  var i = 0;
  function type(){
    if(i <= full.length){
      el.innerHTML = full.slice(0, i) + '<span class="caret"></span>';
      i++;
      setTimeout(type, 24);
    }
  }
  type();
})();

// Cursor glow, respects touch devices and reduced motion
(function(){
  var glow = document.getElementById('cursorGlow');
  if(!glow) return;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if(prefersReduced || !isFinePointer){ return; }

  var raf = null;
  var targetX = 0, targetY = 0;

  window.addEventListener('mousemove', function(e){
    targetX = e.clientX;
    targetY = e.clientY;
    if(!glow.classList.contains('active')){ glow.classList.add('active'); }
    if(raf === null){
      raf = requestAnimationFrame(function update(){
        glow.style.transform = 'translate(' + targetX + 'px, ' + targetY + 'px)';
        raf = null;
      });
    }
  });

  document.addEventListener('mouseleave', function(){
    glow.classList.remove('active');
  });
})();

// Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
});