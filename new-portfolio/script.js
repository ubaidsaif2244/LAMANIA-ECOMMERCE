
  function toggleMenu() {
    document.querySelector(".navlinks").classList.toggle("active");
  }


const roles = ["Designer", "Developer", "Problem Solver"];
let index = 0;

setInterval(() => {
  index = (index + 1) % roles.length;
  document.getElementById("role-text").textContent = roles[index];
}, 2000);



const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(r => obs.observe(r));

  const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 80; 
    const increment = target / speed;

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 40);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

// --------- 1) Tilt effect (lightweight, no libs) ----------
  (function(){
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card=>{
      let rect, w, h, cx, cy, rafId=null;
      const strength = 14; // tilt strength (degrees)
      function onMove(e){
        rect = card.getBoundingClientRect();
        w = rect.width; h = rect.height;
        cx = rect.left + w/2; cy = rect.top + h/2;
        const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
        const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
        const dx = (clientX - cx) / (w/2);
        const dy = (clientY - cy) / (h/2);
        const rotY = dx * strength; // rotateY
        const rotX = -dy * strength; // rotateX

        // use rAF for smooth transforms
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(()=>{
          card.style.transform = `perspective(900px) translateZ(0) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
          // subtle parallax on icon
          const icon = card.querySelector('.card-icon');
          if(icon) icon.style.transform = `translateZ(20px) translateX(${dx*6}px) translateY(${dy*6}px) scale(1.02)`;
        });
      }
      function onLeave(){
        cancelAnimationFrame(rafId);
        card.style.transform = '';
        const icon = card.querySelector('.card-icon');
        if(icon) icon.style.transform = '';
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('touchmove', onMove, {passive:true});
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('touchend', onLeave);
      card.addEventListener('blur', onLeave);
    });
  })();

  // --------- 2) IntersectionObserver: reveal cards on scroll ----------
  (function(){
    const opts = { threshold: 0.12 };
    const observer = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // animate once
        }
      });
    }, opts);
    document.querySelectorAll('.service-card').forEach(c=> observer.observe(c));
  })();

  // Scroll reveal
(function(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.portfolio-item').forEach(el=>observer.observe(el));
})();

// Filter
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item=>{
      item.style.display = (filter==="all" || item.dataset.cat===filter) ? "block":"none";
    });
  });
});

// Modal
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("modalCaption");
document.querySelectorAll('.portfolio-item').forEach(item=>{
  item.addEventListener('click', ()=>{
    modal.style.display="block";
    modalImg.src=item.querySelector("img").src;
    caption.textContent=item.querySelector("h3").textContent;
  });
});
document.querySelector(".close").onclick=()=> modal.style.display="none";
window.onclick=(e)=>{ if(e.target==modal) modal.style.display="none"; }


 // make sure script runs after DOM loaded
    document.addEventListener('DOMContentLoaded', function() {
      const goTopBtn = document.getElementById('goTopBtn');
      if (!goTopBtn) return; // safety

      // Show/hide on scroll (use addEventListener so we don't override other scripts)
      const onScroll = () => {
        if (window.scrollY > 200) {
          goTopBtn.classList.add('show');
        } else {
          goTopBtn.classList.remove('show');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      // Smooth scroll to top on click
      goTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Optional: call once to set initial state
      onScroll();
    });

    // contact form




    const animatedItems = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedItems.forEach(item => {
  observer.observe(item);
});


// go to top button


let goTopBtn = document.getElementById("goTopBtn");

  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      goTopBtn.style.display = "block";
    } else {
      goTopBtn.style.display = "none";
    }
  };

  // Smooth scroll to top
  goTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  